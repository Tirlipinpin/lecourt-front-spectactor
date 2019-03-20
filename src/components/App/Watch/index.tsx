import React, { Component, lazy, Suspense, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, Typography } from 'antd';
import posed from 'react-pose';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { History, Location } from 'history';
import { Trans } from 'react-i18next';

const Casting = lazy(() => import('./components/Casting'));
const { Title, Paragraph } = Typography;

import { WatchStore } from '../../../reducers/watch';
import { Movie } from '../interfaces';
import NotFound from '../../NotFound';
import MoviesGallery from '../shared/MoviesGallery';
import { FETCH_MOVIE_DETAILS } from '../../../reducers/watch/constantes';

import './index.css';


const Img = posed.img({
    hoverable: true,
    init: { filter: 'grayscale(80%) blur(2px)', scale: 1 },
    hover: { filter: 'grayscale(0%) blur(0px)', scale: 1.1 }
});

export interface WatchProps {
    match: any,
    history: History,
    location: Location,
    dispatch: Dispatch<any>,
    watch: WatchStore,
};

export interface WatchState {
    recommandations: Movie[],
};

export class Watch extends Component<WatchProps, WatchState> {
    state: Readonly<WatchState> = {
        recommandations: [],
    }

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

    render() {
        const { recommandations } = this.state;
        const { history, watch } = this.props;
        const { movie, notFound, loading } = watch;

        if (loading) {
            return (
                <Layout className="page-container watch-page-container">
                    <Icon type="loading" />
                </Layout>
            );
        }

        if (!loading && notFound)
            return <NotFound title="No short found for this id..." />

        return (
            <Layout className="page-container watch-page-container">
                <div>
                    {this.props.watch.movie.id
                        ? <ReactPlayer
                            url={`https://storage.stg.lecourt.tv/movies/${movie.file.id}`}
                            controls
                            width="100%"
                            height="70vh"
                            style={{ backgroundColor: 'black' }}
                          />
                        : <Icon type="loading" />
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
