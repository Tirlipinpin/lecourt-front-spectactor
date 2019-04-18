import React, { Fragment } from 'react';
import posed from 'react-pose';
import { Card, Typography, Tooltip } from 'antd';
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
    init: { filter: 'grayscale(25%) blur(0.5px)' },
    hover: { filter: 'grayscale(0%) blur(0px)' }
});

const defaultPoster = "https://m.media-amazon.com/images/M/MV5BNmYxZDQ2YTUtOTJlNy00NDgzLWE0ODctYTllNWIxNDU4YmY4XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg"

export default (props: MoviePosterProps) => {
    const { goToWatch, movie } = props;
    const t = useTranslation().t;

    const posterImage = (movie.images || []).find(i => i.type === 'poster')
    const poster = posterImage ? `https://management.stg.lecourt.tv/movies/${movie.id}/images/${posterImage.node.id}` : defaultPoster

    return (
        <Card
            className="movie-poster-card"
            cover={
                <div className="movie-poster-container-image">
                <Tooltip placement="rightTop" title={`Result quality indicator`}><div className={qualityBanner(movie.result_quality || 0)} /></Tooltip>
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
                        <Tooltip placement="rightTop" title="This result might be relevant for you"><div className={qualityBanner(movie.result_quality || 0)} /></Tooltip>
                        {movie.title}
                    </Fragment>
                }
                className="movie-poster-card-meta"
                description={(movie.genres || []).map(g => g.node.name).join(', ')}
            />
        </Card>
    );
}
