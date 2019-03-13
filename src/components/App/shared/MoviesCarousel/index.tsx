import React, { PureComponent } from 'react';
import { Carousel, Icon, Tooltip } from 'antd';
import CarouselArrow from './components/CarouselArrow';
import { History } from 'history';

import MoviePoster from './components/MoviePoster';
import { Movie } from '../../interfaces';

import './index.css';


export interface MoviesCarouselProps {
    movies: Movie[],
    history: History,
};

export default class MoviesCarousel extends PureComponent<MoviesCarouselProps, {}> {
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
        const { history } = this.props;

        history.push(`/app/watch/${id}`);
    }

    render() {
        const { movies } = this.props;

        if (movies.length < 1)
            return <Icon type="loading" />

        return (
            <Carousel
                className="movie-posters-carousel"
                speed={300}
                slidesToShow={5}
                slidesToScroll={5}
                arrows
                responsive={this.carouselResponsiveSettings}
                prevArrow={React.createElement(({ onClick }: any) => <CarouselArrow onClick={onClick} className="arrow-slider-left" direction="left" />)}
                nextArrow={React.createElement(({ onClick }: any) => <CarouselArrow onClick={onClick} className="arrow-slider-right" direction="right" />)}
            >
                {
                    movies.map((movie: Movie) => (
                        <div
                            key={movie.id}
                            onClick={() => this.goToWatch(movie.id)}
                        >
                            <MoviePoster movie={movie} />
                        </div>
                    ))
                }
            </Carousel>
        );
    }
}
