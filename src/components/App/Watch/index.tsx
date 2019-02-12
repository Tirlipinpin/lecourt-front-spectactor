import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Collapse, Icon, Popover } from 'antd';

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

export class Watch extends Component<WatchProps, WatchState> {
    state = {
        infoMenuVisible: true,
    };

    handleInfoMenu = (value: boolean) => {
        this.setState({ infoMenuVisible: value });
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
                        height="50%"
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
                        <Icon type="info-circle" />
                    </Popover>
                    </div>
                </div>
                <Layout className="description-container">
                    <Collapse>
                        <Collapse.Panel key="staff" header="Staff">
                        </Collapse.Panel>
                    </Collapse>
                </Layout>
            </Layout>
        );
    }
}

export default connect()(Watch);
