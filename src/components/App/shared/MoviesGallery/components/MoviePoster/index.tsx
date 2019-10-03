import React, { Fragment } from 'react';
import posed from 'react-pose';
import { Card, Tooltip } from 'antd';
import { useTranslation } from 'react-i18next';

import { Movie } from '../../../../interfaces';


export interface MoviePosterProps {
    goToWatch: (id: number) => void
    movie: Movie
}

function qualityBanner(quality: number): string {
    return (quality <= 25 ? "movie-poster-quality hide" : "movie-poster-quality")
}

const Image = posed.img({
    hoverable: true,
    init: { filter: 'grayscale(25%) blur(0.2px)' },
    hover: { filter: 'grayscale(0%) blur(0px)' }
});

const defaultPoster = "https://www.itsnicethat.com/system/files/042015/5530f2285c3e3c1451002636/images_slice_large/emptyfilmposters-itsnicethat-The-Lion-King.png?1438258632";

export default (props: MoviePosterProps) => {
    const { goToWatch, movie } = props;

    const { t } = useTranslation();

    const posterImage = (movie.images || []).find(i => i && i.node && i.node.id);
    const poster = posterImage ? `https://management.stg.lecourt.tv/movies/${movie.id}/images/${posterImage.node.id}` : defaultPoster;

    return (
        <Card
            className="movie-poster-card"
            hoverable
            cover={
                <div className="movie-poster-container-image">
                    <Image
                        onClick={() => goToWatch(movie.id)}
                        src={poster}
                        className="movie-poster"
                    />
                </div>
            }
            bordered={false}
        >
            <Card.Meta
                title={
                    <Fragment>
                        <Tooltip placement="rightTop" title={t('RESULT_RELEVANT')}><div className={qualityBanner(movie.result_quality || 0)} /></Tooltip>
                        {movie.title}
                    </Fragment>
                }
                className="movie-poster-card-meta"
                description={(movie.genres || []).map(g => g.node.name).join(', ')}
            />
        </Card>
    );
}
