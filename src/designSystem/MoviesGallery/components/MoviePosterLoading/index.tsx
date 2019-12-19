import React, { FunctionComponent } from 'react';
import styles from './index.module.scss';

export interface IMoviePosterLoadingProps {}

export const MoviePosterLoading: FunctionComponent<IMoviePosterLoadingProps> = () => {
    return (
        <div className={styles.moviePosterLoadingContainer}>
            <div className={styles.image} />
            <div className={styles.title} />
            <div className={styles.genres} />
        </div>
    );
};

export default MoviePosterLoading;
