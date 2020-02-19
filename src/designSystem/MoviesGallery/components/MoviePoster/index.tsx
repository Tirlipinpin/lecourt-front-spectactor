import React, { FunctionComponent } from 'react';
import { Tooltip, Icon } from 'antd';
import { useTranslation } from 'react-i18next';
import { HoverableImage } from 'designSystem';
import { Movie } from 'components/App/interfaces';
import styles from './index.module.scss';

export interface MoviePosterProps {
    goToWatch: (id: number) => void
    movie: Movie
}

const defaultPoster = "https://static2.tribute.ca/poster/660x980/piper-105395.jpg";

export const MoviePoster: FunctionComponent<MoviePosterProps> = (props) => {
    const { goToWatch, movie } = props;
    const { t } = useTranslation();

    const posterImage = movie.posters?.find(i => i && i.file && i.file.id);
    const poster = posterImage ? `https://management.stg.lecourt.tv/movies/${movie.id}/images/${posterImage.file.id}` : defaultPoster;

    const goToMovieId = () => goToWatch(movie.id);

    return (
        <div className={styles.moviePosterCard}>
            <HoverableImage
                alt={movie.title}
                coverContent={
                    <button
                        className={styles.watchButton}
                    >
                        <Icon type="search" /> {t('WATCH_SHORT')}
                    </button>
                }
                goTo={goToMovieId}
                src={poster}
            />
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
