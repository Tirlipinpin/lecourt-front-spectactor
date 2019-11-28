import React, { PureComponent } from 'react';
import { History } from 'history';
import posed, { PoseGroup } from 'react-pose';
import { Movie } from '../../App/interfaces';
import MoviePoster from './components/MoviePoster';
import Loader from '../Loader';
import styles from './index.module.scss';

export interface MoviesGalleryProps {
    history: History
    loading?: boolean
    movies: Movie[]
};

const MoviePosterContainer = posed.div({
    enter: {
        x: 0,
        opacity: 1,
        transition: ({ index }: { index: number }) => ({
            delay: index * 100,
            type: 'spring',
            stiffness: 100,
        }),
    },
    exit: {
        x: 100,
        opacity: 0,
    },
    props: { index: 0 },
});

export default class MoviesGallery extends PureComponent<MoviesGalleryProps, {}> {
    goToWatch = (id: number) => {
        const { history } = this.props;

        history.push(`/app/watch/${id}`);
    }

    render() {
        const { loading, movies } = this.props;

        if (movies.length < 1 && loading)
            return <Loader />;
        else if (movies.length < 1)
            return (
                <div className={styles.moviesGalleryContainer}>
                    Aucun court-métrage trouvé !
                </div>
            );

        return (
            <div className={styles.moviesGalleryContainer}>
                <PoseGroup>
                    {
                        movies.map((movie: Movie, index) => (
                            <MoviePosterContainer
                                className={styles.moviePosterContainer}
                                initialPose='exit'
                                pose='enter'
                                key={index}
                                index={index}
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
