import React, { FunctionComponent, useState } from 'react';
import { Tooltip, Icon } from 'antd';
import { useTranslation } from 'react-i18next';
import posed from 'react-pose';
import { Movie } from '../../../../App/interfaces';
import styles from './index.module.scss';

export interface MoviePosterProps {
    goToWatch: (id: number) => void
    movie: Movie
}

const Cover = posed.div({
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
    const { t } = useTranslation();

    const [ cardHovered, handleCardHovered ] = useState(false);
    const showCardHover = () => handleCardHovered(true);
    const hideCardHover = () => handleCardHovered(false);

    const [ imageLoaded, handleImageLoaded ] = useState(false);
    const setImageLoaded = () => handleImageLoaded(true);

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
                    className={`${styles.cover} ${!imageLoaded ? styles.loading : ''}`}
                    alt={movie.title}
                    onLoad={setImageLoaded}
                />
                {!imageLoaded && <div className={styles.loading} />}
                {(
                    <Cover
                        className={styles.hover}
                        pose={cardHovered ? 'open' : 'closed'}
                        onClick={() => goToWatch(movie.id)}
                    >
                        <button
                            className={styles.watchButton}
                        >
                            <Icon type="search" /> {t('WATCH_SHORT')}
                        </button>
                    </Cover>
                )}
            </div>
            <div className={styles.footer}>
                <div>
                    <Tooltip
                        placement="rightTop"
                        title={movie.result_quality > 25 && t('RESULT_RELEVANT')}
                    >
                        <div className={`${styles.title} ${movie.result_quality > 25 && styles.moviePosterQuality}`}>
                            {movie.title}
                        </div>
                    </Tooltip>
                    <div className={styles.genres}>
                        {(movie.genres || []).map(g => g.node.name).join(', ')}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MoviePoster;
