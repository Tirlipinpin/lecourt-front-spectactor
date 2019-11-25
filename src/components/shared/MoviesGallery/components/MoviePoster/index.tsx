import React, { Fragment } from 'react';
import posed from 'react-pose';
import { Card, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { Movie } from '../../../../App/interfaces';
import styles from './index.module.scss';

export interface MoviePosterProps {
    goToWatch: (id: number) => void
    movie: Movie
}

const qualityBanner = (quality: number): string => {
    return (quality <= 25 ? "movie-poster-quality hide" : styles.moviePosterQuality);
};

const Image = posed.img({
    hoverable: true,
    init: {
        filter: 'grayscale(33%)',
    },
    hover: {
        filter: 'grayscale(0%)',
    }
});

const defaultPoster = "https://www.itsnicethat.com/system/files/042015/5530f2285c3e3c1451002636/images_slice_large/emptyfilmposters-itsnicethat-The-Lion-King.png?1438258632";

export default (props: MoviePosterProps) => {
    const { goToWatch, movie } = props;

    const { t } = useTranslation();

    const posterImage = (movie.images || []).find(i => i && i.node && i.node.id);
    const poster = posterImage ? `https://management.stg.lecourt.tv/movies/${movie.id}/images/${posterImage.node.id}` : defaultPoster;

    return (
        <Card
            className={styles.moviePosterCard}
            hoverable
            cover={
                <div className={styles.moviePosterContainerImage}>
                    <Image
                        onClick={() => goToWatch(movie.id)}
                        src={poster}
                        className={styles.moviePoster}
                    />
                </div>
            }
            bordered={false}
        >
            <Card.Meta
                className={styles.moviePosterCardMeta}
                description={(movie.genres || []).map(g => g.node.name).join(', ')}
                title={
                    <Fragment>
                        <Tooltip
                            placement="rightTop"
                            title={t('RESULT_RELEVANT')}
                        >
                            <div className={qualityBanner(movie.result_quality || 0)} />
                        </Tooltip>
                        {movie.title}
                    </Fragment>
                }
            />
        </Card>
    );
};
