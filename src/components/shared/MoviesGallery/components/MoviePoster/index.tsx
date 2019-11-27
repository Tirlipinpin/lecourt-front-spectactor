import React, { FunctionComponent, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import { useTranslation } from 'react-i18next';
import posed from 'react-pose'
import { Movie } from '../../../../App/interfaces';
import styles from './index.module.scss';

export interface MoviePosterProps {
    goToWatch: (id: number) => void
    movie: Movie
}

const qualityBanner = (quality: number): string => {
    return (quality <= 25 ? "movie-poster-quality hide" : styles.moviePosterQuality);
};

const Div = posed.div({
    open: {
        opacity: 1,
    },
    closed: {
        opacity: 0,
    },
});

const defaultPoster = "https://static2.tribute.ca/poster/660x980/piper-105395.jpg";

export const MoviePoster: FunctionComponent<MoviePosterProps> = (props) => {
    const { goToWatch, movie } = props;
    const [ cardHovered, handleCardHovered ] = useState(false);
    const { t } = useTranslation();

    const showCardHover = () => handleCardHovered(true);
    const hideCardHover = () => handleCardHovered(false);

    const posterImage = (movie.images || []).find(i => i && i.node && i.node.id);
    const poster = posterImage ? `https://management.stg.lecourt.tv/movies/${movie.id}/images/${posterImage.node.id}` : defaultPoster;
    
    return (
        <div
            className={styles.moviePosterCard}
            onMouseEnter={showCardHover}
            onMouseLeave={hideCardHover}
        >
            <div className={styles.coverContainer}>
                <img
                    src={poster}
                    className={styles.cover}
                    alt={movie.title}
                />
                {(
                    <Div
                        className={styles.hover}
                        pose={cardHovered ? 'open' : 'closed'}
                        onClick={() => goToWatch(movie.id)}
                    >
                        <button
                            className={styles.watchButton}
                        >
                            <Icon type="search" /> Watch short movie
                        </button>
                    </Div>
                )}
            </div>
            <div className={styles.footer}>
                <div>
                    <Tooltip
                        placement="rightTop"
                        title={t('RESULT_RELEVANT')}
                    >
                        <div className={qualityBanner(movie.result_quality || 0)} />
                    </Tooltip>
                    <div className={styles.title}>
                        {movie.title}
                    </div>                    
                    <div className={styles.genres}>
                        {(movie.genres || []).map(g => g.node.name).join(', ')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviePoster;
