import React, { Component } from 'react';
import { connect, ReactReduxContext } from 'react-redux';
import { Carousel, Layout, Icon } from 'antd';

import './index.css';

export class Homepage extends Component<{}, {}> {
    render() {
        return (
            <Layout className="homepage-page-container">
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
                        className="carousel"
                        speed={300}
                        lazyLoad
                        draggable
                        slidesToShow={5}
                        slidesToScroll={3}
                        arrows
                        prevArrow={<Icon type="arrow-left" style={{ cursor: 'pointer' }} />}
                        nextArrow={<Icon type="arrow-right" style={{ cursor: 'pointer' }} />}
                    >
                        <div className="movie-poster" style={{ backgroundImage: 'url(http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg)', backgroundSize: 'cover' }} />
                        <img className="movie-poster" src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                        <img className="movie-poster" src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                        <img className="movie-poster" src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                        <img className="movie-poster" src="http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg" />
                        <img className="movie-poster" src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                        <img className="movie-poster" src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                        <img className="movie-poster" src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                        <img className="movie-poster" src="http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg" />
                        <img className="movie-poster" src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                        <img className="movie-poster" src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                        <img className="movie-poster" src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                    </Carousel>
                </Layout>
            </Layout>
        );
    }
};

export default connect()(Homepage);
