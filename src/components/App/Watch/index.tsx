import React, { Component, lazy, Suspense, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Typography, Dropdown, Menu } from 'antd';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import { Trans } from 'react-i18next';
import Hls from 'hls.js';

import { WatchStore } from '../../../reducers/watch';
import { Movie } from '../interfaces';
import NotFound from '../../NotFound';
import MoviesGallery from '../shared/MoviesGallery';
import { FETCH_MOVIE_DETAILS } from '../../../reducers/watch/constants';
import Loader from '../shared/Loader';
import './index.css';

const Casting = lazy(() => import('./components/Casting'));
const { Title, Paragraph } = Typography;
const { Item } = Menu;

export type WatchPropsParams = {
    id: string
}

export interface WatchProps extends RouteComponentProps<WatchPropsParams> {
    dispatch: Dispatch<any>
    watch: WatchStore
}

export interface WatchState {
    recommandations: Movie[]
    hlsInstance?: Hls
}

export class Watch extends Component<WatchProps, WatchState> {
    PlayerRef = React.createRef<ReactPlayer>();

    state: Readonly<WatchState> = {
        recommandations: [],
    };

    async componentDidMount() {
        const { match, dispatch } = this.props;
        const { id } = match.params;

        dispatch({
            type: FETCH_MOVIE_DETAILS,
            payload: {
                id,
            },
        });

        const recommandationsRes = await axios.get('movies', {
            params: {
                limit: 20,
            },
        });

        if (recommandationsRes && recommandationsRes.data)
            this.setState({ recommandations: recommandationsRes.data });
    }

    onLoadPlayer = () => {
        if (!this.PlayerRef.current) return;

        const hlsInstance: Hls = this.PlayerRef.current.getInternalPlayer('hls') as Hls;
        this.setState({
            hlsInstance,
        });
    };

    setQuality = (level: number) => {
        const { hlsInstance } = this.state;
        if (!hlsInstance) return;

        hlsInstance.currentLevel = level;
    };

    renderQualityMenu = () => {
        const { hlsInstance } = this.state;
        if (!hlsInstance) return;

        return (
            <Menu selectable>
                {hlsInstance.levels.map((level, index) => (
                  <Item
                    key={level.height}
                  >
                      <a
                        onClick={() => this.setQuality(index)}
                      >{ level.height }</a>
                  </Item>
                ))}
            </Menu>
        );
    };

    render() {
        const { recommandations, hlsInstance } = this.state;
        const { history, watch } = this.props;
        const { movie, notFound, loading } = watch;

        if (loading) {
            return (
                <Layout className="page-container watch-page-container">
                    <Loader />
                </Layout>
            );
        }

        if (!loading && notFound)
            return <NotFound title="No short found for this id..." />

        return (
            <Layout className="page-container watch-page-container">
                <div>
                    {movie.id
                      ? (
                          <div
                            style={{
                                width: '100%',
                                height: '70vh',
                                position: 'relative',
                            }}
                          >
                              <ReactPlayer
                                url={`https://storage.googleapis.com/lecourt-movies-dev/${movie.movieFile ? movie.movieFile.node.filename : ''}.m3u8`}
                                controls
                                config={{
                                    file: {
                                        forceHLS: true,
                                    },
                                }}
                                width="100%"
                                height="100%"
                                style={{ backgroundColor: 'black' }}
                                ref={this.PlayerRef}
                                onReady={this.onLoadPlayer}
                              />

                              <div className={!hlsInstance ? 'quality-dropdown-icon-disabled' : 'quality-dropdown-icon'}>
                                  <Dropdown
                                    overlay={this.renderQualityMenu()}
                                    disabled={!hlsInstance}
                                    trigger={['click']}
                                  >
                                      <Icon
                                        type="setting"
                                        theme="filled"
                                      />
                                  </Dropdown>
                              </div>
                          </div>
                      )
                        : <Loader />
                    }
                </div>
                <div className="details-container">
                    <div className="description-container">
                            <Title level={2} className="watch-title">{movie.title}</Title>
                            <Paragraph
                                className="movie-summary"
                                ellipsis={{ rows: 2, expandable: true }}
                            >
                                {movie.summary}
                            </Paragraph>
                    </div>
                    <div className="casting-container">
                        <Title level={2} className="watch-title">Casting</Title>
                        <Suspense fallback="Loading...">
                            { movie.directors && <Casting actors={movie.actors} directors={movie.directors} staff={movie.staff} /> }
                        </Suspense>
                    </div>
                </div>

                <Layout className="recommendations">
                    <Title level={2}><Trans i18nKey="YOUR_RECOMMENDATIONS" /></Title>
                    <MoviesGallery movies={recommandations} history={history} />
                </Layout>

            </Layout>
        );
    }
}

export default connect(({ watch }: any) => ({
    watch,
}))(Watch);
