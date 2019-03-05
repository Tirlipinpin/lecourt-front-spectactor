import React, { Component, lazy, Suspense } from 'react';
import { connect } from 'react-redux';
import { Layout, Carousel, Col, Row } from 'antd';
import posed from 'react-pose';
import ReactPlayer from 'react-player';
import axios from 'axios';

const Casting = lazy(() => import('./components/Casting'));

import './index.css';

import { Movie } from '../interfaces';
import NotFound from '../../NotFound';
import MoviesCarousel from '../shared/MoviesCarousel';


export interface WatchProps {
    location: any,
    history: any,
    match: any,
};

export interface WatchState {
    movie: Movie,
    notFound: boolean,
    recommandations: Movie[],
};

const Img = posed.img({
    hoverable: true,
    init: { filter: 'grayscale(80%) blur(2px)', scale: 1 },
    hover: { filter: 'grayscale(0%) blur(0px)', scale: 1.1 }
});

export class Watch extends Component<WatchProps, WatchState> {
    state: Readonly<WatchState> = {
        movie: {} as Movie,
        notFound: false,
        recommandations: [],
    }

    async componentDidMount() {
        const { match } = this.props;
        const { id } = match.params;

        const res = await axios.get(`movies/${id}`);
        if (!res)
            this.setState({ notFound: true });
        else
            this.setState({ movie: res.data });

        const recommandationsRes = await axios.get('movies', {
            params: {
                limit: 20,
            },
        });

        this.setState({ recommandations: recommandationsRes.data });
    }

    render() {
        const { movie, notFound, recommandations } = this.state;
        const { history } = this.props;

        if (notFound)
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

export default connect()(Watch);
