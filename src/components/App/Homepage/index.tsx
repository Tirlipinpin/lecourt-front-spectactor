import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel, Layout, Icon } from 'antd';
import { History } from 'history';
import axios from 'axios';

import './index.css';

import { Movie } from '../interfaces';
import MoviesCarousel from '../shared/MoviesCarousel';

export interface HomepageProps {
    history: History,
}

export interface HomepageState {
    movies: Movie[],
    latestMovies: Movie[],
}

export class Homepage extends Component<HomepageProps, HomepageState> {
    state: Readonly<HomepageState> = {
        movies: [],
        latestMovies: [],
    };

    async componentDidMount() {
        const res = await axios.get('movies', {
            params: {
                limit: 20,
            },
        });

        this.setState({ movies: res.data });

        const latestRes = await axios.get('movies/latest', {
            params: {
                limit: 20,
            },
        });

        this.setState({ latestMovies: latestRes.data });

    }

    render() {
        const { movies, latestMovies } = this.state;
        const { history } = this.props;

        return (
            <Layout className="page-container">
                <Carousel
                    autoplay
                    dots
                    className="homepage-carousel"
                    speed={2000}
                    draggable={false}
                >
                    <img src="http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg" />
                    <img src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                    <img src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                    <img src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                </Carousel>
                <Layout className="movies-carousel">
                    <h1>Our selection</h1>
                    <MoviesCarousel movies={movies} history={history} />
                </Layout>
                <Layout className="movies-carousel">
                    <h1>Latest shorts</h1>
                    <MoviesCarousel movies={latestMovies} history={history} />
                </Layout>
            </Layout>
        );
    }
};

export default connect()(Homepage);
