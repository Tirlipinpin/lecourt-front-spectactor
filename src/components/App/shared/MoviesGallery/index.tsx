import React, { PureComponent } from 'react';
import { Icon } from 'antd';
import Gallery, { ImageComponentProps } from 'react-photo-gallery';
import { History } from 'history';

import { Movie } from '../../interfaces';

import MoviePoster from './components/MoviePoster';


export interface MoviesGalleryProps {
    movies: Movie[],
    history: History,
};

export default class MoviesGallery extends PureComponent<MoviesGalleryProps, {}> {
    carouselResponsiveSettings = [
        {
            breakpoint: 1258,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 4,
                infinite: true,
                dots: true
            },
        },
        {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true
            },
        },
        {
            breakpoint: 876,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                infinite: true,
                dots: true
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1,
                initialSlide: 2
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 1
            },
        }
    ];

    goToWatch = (id: number) => {
        const { history, movies } = this.props;
        const movie: Movie = movies[id];

        if (!movie) return;

        history.push(`/app/watch/${movie.id}`);
    }

    render() {
        const { movies } = this.props;

        if (movies.length < 1)
            return <Icon type="loading" />

        const photos = this.props.movies.map(movie => ({
            src: 'https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg',
            width: 16,
            height: 9,
        }));
    
        return (
            <Gallery
                photos={photos}
                ImageComponent={(props: ImageComponentProps) =>
                    <MoviePoster
                        {...props}
                        goToWatch={this.goToWatch}
                        movie={movies[props.index]}
                    />}
            />
        );
    }
}
