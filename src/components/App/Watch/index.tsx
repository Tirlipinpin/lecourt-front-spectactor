import React, { Component, lazy, Suspense, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon } from 'antd';
import posed from 'react-pose';
import ReactPlayer from 'react-player';
import axios from 'axios';
import { History, Location } from 'history';

const Casting = lazy(() => import('./components/Casting'));

import { WatchStore } from '../../../reducers/watch';
import { Movie } from '../interfaces';
import NotFound from '../../NotFound';
import MoviesCarousel from '../shared/MoviesCarousel';
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
                    <ReactPlayer
                        url="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
                        controls
                        width="100%"
                        height="70vh"
                        style={{ backgroundColor: 'black' }}
                    />
                </div>
                <div className="details-container">
                    <div className="description-container">
                            <h1 className="watch-title">{movie.title}</h1>
                            <h4 className="movie-summary">{movie.summary}</h4>
                    </div>
                    <div className="casting-container">
                        <h1 className="watch-title">Casting</h1>
                        <Suspense fallback="Loading...">
                            { movie.directors && <Casting actors={movie.actors} directors={movie.directors} staff={movie.staff} /> }
                        </Suspense>
                    </div>
                </div>

                <Layout className="movies-carousel">
                    <h1>Your recommendations</h1>
                    <MoviesCarousel movies={recommandations} history={history} />
                </Layout>

            </Layout>
        );
    }
}

export default connect(({ watch }: any) => ({
    watch,
}))(Watch);
