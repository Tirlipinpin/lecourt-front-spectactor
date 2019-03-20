import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { History } from 'history';

import { Movie } from '../../interfaces';
import MoviePoster from './components/MoviePoster';

import './index.css';


export interface MoviesGalleryProps {
    movies: Movie[],
    history: History,
};

export default class MoviesGallery extends PureComponent<MoviesGalleryProps, {}> {
    goToWatch = (id: number) => {
        const { history } = this.props;

        history.push(`/app/watch/${id}`);
    }

    render() {
        const { movies } = this.props;

        if (movies.length < 1)
            return <Icon type="loading" />

        return (
            <div className="search-results-container">
                {
                    movies.map((movie: Movie, index) => (
                        <MoviePoster
                            key={index}
                            goToWatch={this.goToWatch}
                            movie={movie}
                        />
                    ))
                }
            </div>
        );
    }
}
