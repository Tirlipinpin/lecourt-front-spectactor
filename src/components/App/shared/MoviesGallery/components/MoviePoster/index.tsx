import React from 'react';
import posed from 'react-pose';
import { Card } from 'antd';
import { useTranslation } from 'react-i18next';

import { Movie } from '../../../../interfaces';


export interface MoviePosterProps {
    goToWatch: (id: number) => void,
    movie: Movie,
}

const Image = posed.img({
    hoverable: true,
    init: { filter: 'grayscale(80%) blur(2px)' },
    hover: { filter: 'grayscale(0%) blur(0px)' }
});

export default (props: MoviePosterProps) => {
    const { goToWatch, movie } = props;
    const t = useTranslation().t;

    return (
        <Card
            className="movie-poster-container"
            cover={
                <Image
                    onClick={() => goToWatch(movie.id)}
                    src="https://m.media-amazon.com/images/M/MV5BNmYxZDQ2YTUtOTJlNy00NDgzLWE0ODctYTllNWIxNDU4YmY4XkEyXkFqcGdeQXVyNzU1NzE3NTg@._V1_CR0,45,480,270_AL_UX477_CR0,0,477,268_AL_.jpg"
                    className="movie-poster"
                />
            }
        >
            <Card.Meta
                title={movie.title}
                description={
                    <div>
                        {`${t('DURATION')}: ${movie.duration}`}<br />
                        {
                            movie.result_quality && `${t('RESULT_QUALITY')}: ${movie.result_quality}%`
                        }
                    </div>
                }
            />
        </Card>
    );
}
