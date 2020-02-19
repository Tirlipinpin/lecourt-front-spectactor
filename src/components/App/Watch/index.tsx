import React, { Component, lazy, Suspense, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Typography, Dropdown, Menu } from 'antd';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { RouteComponentProps } from 'react-router';
import { Trans } from 'react-i18next';
import Hls from 'hls.js';
import { Loader } from 'designSystem';
import { WatchStore } from '../../../reducers/watch';
import { Movie } from '../interfaces';
import NotFound from '../../NotFound';
import { MoviesGallery } from 'designSystem';
import { FETCH_MOVIE_DETAILS } from '../../../reducers/watch/constants';
import styles from './index.module.scss';

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
        const { dispatch } = this.props;

        this.dispatchFetchMovieDetails();

        const recommandationsRes = await axios.get('movies', {
            params: {
                limit: 5,
            },
        });

        if (recommandationsRes && recommandationsRes.data)
            this.setState({ recommandations: recommandationsRes.data });
    }

    componentDidUpdate(props: WatchProps) {
        const { params: { id } } = this.props.match;
        const { params: { id: nextId } } = props.match;

        if (id !== nextId)
            this.dispatchFetchMovieDetails();
    }

    dispatchFetchMovieDetails = () => {
        const { dispatch, match: { params: { id } } } = this.props;

        dispatch({
            type: FETCH_MOVIE_DETAILS,
            payload: {
                id,
            },
        });
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
                      <button
                        onClick={() => this.setQuality(index)}
                      >{ level.height }</button>
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
                <Layout className={`page-container ${styles.watchPageContainer}`}>
                    <Loader />
                </Layout>
            );
        }

        if (!loading && notFound)
            return <NotFound title="No short found for this id..." />;

        return (
            <Layout className={`page-container ${styles.watchPageContainer}`}>
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
                                url={`https://movies.stg.lecourt.tv/${Array.isArray(movie.files) && movie.files.length > 0 ? movie.files[0].file.path : ''}.m3u8`}
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

                              <div className={!hlsInstance ? styles.qualityDropdownIconDisabled : styles.qualityDropdownIcon}>
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
                <div className={styles.detailsContainer}>
                    <div className={styles.descriptionContainer}>
                            <Title level={3} className={styles.watchTitle}>{movie.title}</Title>
                            <Paragraph
                                className={styles.movieSummary}
                                ellipsis={{ rows: 2, expandable: true }}
                            >
                                {movie.summary}
                            </Paragraph>
                    </div>
                    <div className={styles.castingContainer}>
                        <Title level={4}>Casting</Title>
                        <Suspense fallback={<Loader />}>
                            { movie.directors && <Casting actors={movie.actors} directors={movie.directors} staff={movie.staff} /> }
                        </Suspense>
                    </div>
                </div>

                <Layout className={styles.recommendations}>
                    <Title level={4}><Trans i18nKey="YOUR_RECOMMENDATIONS" /></Title>
                    <MoviesGallery movies={recommandations} history={history} loading={loading} />
                </Layout>

            </Layout>
        );
    }
}

export default connect(({ watch }: any) => ({
    watch,
}))(Watch);
