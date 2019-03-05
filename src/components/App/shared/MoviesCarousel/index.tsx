import React, { PureComponent } from 'react';
import { Carousel, Icon } from 'antd';
import CarouselArrow from './components/CarouselArrow';
import posed from 'react-pose';
import { History } from 'history';

import './index.css';

import { Movie } from '../../interfaces';

export interface MoviesCarouselProps {
    movies: Movie[],
    history: History,
};

const Img = posed.img({
    hoverable: true,
    init: { filter: 'grayscale(80%) blur(2px)', scale: 1 },
    hover: { filter: 'grayscale(0%) blur(0px)', scale: 1.1 }
});

export default class MoviesCarousel extends PureComponent<MoviesCarouselProps, {}> {
    carouselResponsiveSettings = [
        {
            breakpoint: 1258,
            settings: {
                slidesToShow: 4,
                slidesToScroll: 3,
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
                slidesToScroll: 3,
                infinite: true,
                dots: true
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
                slidesToScroll: 2,
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

    
    pictures: string[] = [
        'http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg',
        'https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg',
        'http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg',
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
            <
                //@ts-ignore
                Carousel
                className="movie-posters-carousel"
                speed={300}
                slidesToShow={5}
                slidesToScroll={3}
                arrows
                responsive={this.carouselResponsiveSettings}
                // @ts-ignore
                prevArrow={<CarouselArrow className="arrow-slider-left" direction="left" />}
                // @ts-ignore
                nextArrow={<CarouselArrow className="arrow-slider-right" direction="right" />}
            >
                {
                    movies.map((movie: Movie) => (
                        <Img
                            src={this.pictures[1]}
                            onClick={() => this.goToWatch(movie.id)}
                            className="movie-poster"
                            key={movie.id}
                        />
                    ))
                }
            </Carousel>
        );
    }
}
