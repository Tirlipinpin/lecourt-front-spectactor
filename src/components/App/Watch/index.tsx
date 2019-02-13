import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Collapse, Icon, Popover, Carousel } from 'antd';
import posed from 'react-pose';

import ReactPlayer from 'react-player';

import './index.css';

export interface WatchProps {
    location: any,
    history: any,
    match: any,
}

export interface WatchState {
    infoMenuVisible: boolean,
}

const Img = posed.img({
    hoverable: true,
    init: { filter: 'grayscale(80%) blur(2px)', scale: 1 },
    hover: { filter: 'grayscale(0%) blur(0px)', scale: 1.1 }
});

export class Watch extends Component<WatchProps, WatchState> {
    state = {
        infoMenuVisible: true,
    };

    handleInfoMenu = (value: boolean) => {
        setTimeout(() => this.setState({ infoMenuVisible: value }), 500);
    };

    render() {
        const { infoMenuVisible } = this.state;
        const content = `Dans un monde coloré, tout va pour le mieux : un gros lapin se réveille et sort de sa tanière. Il respire à pleins poumons les essences du printemps et admire les papillons. Seulement, c'est sans compter la méchanceté de trois rongeurs (Frank, Rinky et Gamera) qui tuent un de ces papillons sous les yeux abasourdis du lapin. Celui-ci décide alors de se venger. Après une longue préparation de divers pièges, les trois mammifères vont respectivement se faire faucher par un tronc en balancement, se faire catapulter et finir en cerf-volant. Une claire référence est faite au film Predator au moment où le lapin prépare les pièges pour se venger.`

        return (
            <Layout className="watch-page-container">
                <div>
                    <ReactPlayer
                        url="http://clips.vorwaerts-gmbh.de/big_buck_bunny.mp4"
                        controls
                        width="100%"
                        height="50vh"
                        style={{ backgroundColor: 'black' }}
                        onPlay={() => this.handleInfoMenu(false)}
                        onPause={() => this.handleInfoMenu(true)}
                    />
                    <div className="player-overlay">
                    <Popover
                        placement="leftTop"
                        arrowPointAtCenter
                        autoAdjustOverflow
                        title="Big Buck Bunny"
                        content={content}
                        visible={infoMenuVisible}
                        style={{ cursor: 'auto' }}
                        overlayClassName="player-overlay-info-menu"
                    >
                        <Icon type="info-circle" className="info-menu-button" />
                    </Popover>
                    </div>
                </div>
                <Layout className="description-container">
                    <Collapse>
                        <Collapse.Panel key="staff" header="Staff">
                        </Collapse.Panel>
                    </Collapse>
                </Layout>

                <Layout className="movies-carousel">
                    <h1>Your recommendations</h1>
                    <Carousel
                        className="movie-posters-carousel"
                        speed={300}
                        draggable
                        slidesToShow={7}
                        slidesToScroll={3}
                        arrows
                    >
                        <Img className="movie-poster" src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                        <Img className="movie-poster" src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                        <Img className="movie-poster" src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                        <Img className="movie-poster" src="http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg" />
                        <Img className="movie-poster" src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                        <Img className="movie-poster" src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                        <Img className="movie-poster" src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                        <Img className="movie-poster" src="http://www.champselyseesfilmfestival.com/2018/wp-content/uploads/sites/11/2018/04/caro2.jpg" />
                        <Img className="movie-poster" src="https://wx3.sinaimg.cn/large/0078HDDZly1fryg0w2z2vj31hc0u0jus.jpg" />
                        <Img className="movie-poster" src="http://www.zippyframes.com/images/stories/italy/inanimate_lucia_bulgheroni.jpg" />
                        <Img className="movie-poster" src="https://i.ytimg.com/vi/qeAjs_9XLbk/maxresdefault.jpg" />
                    </Carousel>
                </Layout>

            </Layout>
        );
    }
}

export default connect()(Watch);
