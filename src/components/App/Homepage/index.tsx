import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Carousel, Layout } from 'antd';

import './index.css';

export class Homepage extends Component<{}, {}> {
    render() {
        return (
            <Layout className="homepage-page-container">
                <Carousel
                    autoplay
                    dots
                    className="homepage-carousel"
                    autoplaySpeed={5000}
                    speed={2000}
                    arrows
                    lazyLoad
                    draggable={false}
                >
                    <img src="http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg" />
                    <img src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                    <img src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                    <img src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                </Carousel>
            </Layout>
        );
    }
};

export default connect()(Homepage);
