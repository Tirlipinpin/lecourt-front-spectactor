import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import { History } from 'history';
import posed, { PoseGroup } from 'react-pose';

import { Movie } from '../../interfaces';
import MoviePoster from './components/MoviePoster';

import './index.css';


export interface MoviesGalleryProps {
    movies: Movie[]
    history: History
};

const MoviePosterContainer = posed.div({
    enter: {
        x: 0,
        opacity: 1,
    },
    exit: {
        x: 50,
        opacity: 0,
    },
})

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
                <PoseGroup>
                    {
                        movies.map((movie: Movie, index) => (
                            <MoviePosterContainer
                                initialPose='exit'
                                pose='enter'
                                key={index}
                                className='movie-poster-container'
                            >
                                <MoviePoster
                                    goToWatch={this.goToWatch}
                                    movie={movie}
                                />
                            </MoviePosterContainer>
                        ))
                    }
                </PoseGroup>
            </div>
        );
    }
}
