import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel, Layout } from 'antd';
import posed from 'react-pose';
import { History } from 'history';

import CarouselArrow from './components/CarouselArrow';
import './index.css';

export interface HomepageProps {
    history: History,
}

const Img = posed.img({
    hoverable: true,
    init: { filter: 'grayscale(80%) blur(2px)', scale: 1 },
    hover: { filter: 'grayscale(0%) blur(0px)', scale: 1.1 }
});

export class Homepage extends Component<HomepageProps, {}> {
    pictures: string[] = [
        'http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg',
        'https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg',
        'http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg',
        'https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg',
        'http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg',
        'https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg',
        'http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg',
        'https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg',
        'http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg',
        'https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg',
        'http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg',
        'https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg',
    ];

    goToWatch = (id: number) => {
        const { history } = this.props;

        history.push(`/app/watch/${id}`);
    }

    render() {
        return (
            <Layout className="page-container">
                <Carousel
                    autoplay
                    dots
                    className="homepage-carousel"
                    speed={2000}
                    draggable={false}
                >
                    <img src="http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg" />
                    <img src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                    <img src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                    <img src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                </Carousel>
                <Layout className="movies-carousel">
                    <h1>Our selection</h1>
                    <Carousel
                        className="movie-posters-carousel"
                        speed={300}
                        draggable
                        slidesToShow={8}
                        slidesToScroll={3}
                        arrows
                        // @ts-ignore
                        prevArrow={<CarouselArrow className="arrow-slider-left" direction="left" />}
                        // @ts-ignore
                        nextArrow={<CarouselArrow className="arrow-slider-right" direction="right" />}
                    >
                        {
                            this.pictures.map((picture, id) => (
                                <Img
                                    key={id}
                                    className="movie-poster"
                                    src={picture}
                                    onClick={() => this.goToWatch(id)}
                                />
                            ))
                        }
                    </Carousel>
                </Layout>
                <Layout className="movies-carousel">
                    <h1>Our selection</h1>
                    <Carousel
                        className="movie-posters-carousel"
                        speed={300}
                        draggable
                        slidesToShow={8}
                        slidesToScroll={3}
                        arrows
                        // @ts-ignore
                        prevArrow={<CarouselArrow className="arrow-slider" direction="left" />}
                        // @ts-ignore
                        nextArrow={<CarouselArrow className="arrow-slider" direction="right" />}
                    >
                        {
                            this.pictures.map((picture, id) => (
                                <Img
                                    key={id}
                                    className="movie-poster"
                                    src={picture}
                                    onClick={() => this.goToWatch(id)}
                                />
                            ))
                        }
                    </Carousel>
                </Layout>
            </Layout>
        );
    }
};

export default connect()(Homepage);
