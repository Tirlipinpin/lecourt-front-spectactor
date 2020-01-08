import React, { PureComponent } from 'react';
import { History } from 'history';
import { Movie } from 'components/App/interfaces';
import MoviePoster from './components/MoviePoster';
import MoviePosterLoading from './components/MoviePosterLoading';
import styles from './index.module.scss';

export interface MoviesGalleryProps {
    history: History
    loading?: boolean
    movies: Movie[]
};

export default class MoviesGallery extends PureComponent<MoviesGalleryProps, {}> {
    goToWatch = (id: number) => {
        const { history } = this.props;

        history.push(`/app/watch/${id}`);
    }

    render() {
        const { loading, movies } = this.props;

        if (movies.length < 1 && loading)
            return (
                <div className={styles.movieLoadingGalleryContainer}>
                    {[1, 2, 3, 4, 5].map((value: number) => <MoviePosterLoading />)}
                </div>
            );
        else if (movies.length < 1)
            return (
                <div className={styles.moviesGalleryContainer}>
                    Aucun court-métrage trouvé !
                </div>
            );

        return (
            <div className={styles.moviesGalleryContainer}>
                {
                    movies.map((movie: Movie) => (
                        <div
                            className={styles.moviePosterContainer}
                            key={movie.id}
                        >
                            <MoviePoster
                                goToWatch={this.goToWatch}
                                movie={movie}
                            />
                        </div>
                    ))
                }
            </div>
        );
    }
}
