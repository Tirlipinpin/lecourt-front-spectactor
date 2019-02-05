import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout, Menu, Card, Avatar } from 'antd';
import MediaQuery from 'react-responsive';

import './index.css';

export class Profile extends Component<{}, {}> {
    private cardStyle = {
        marginTop: 86,
        marginLeft: 36,
        marginRight: 36,
    };

    private cardBodyStyle = {
        minHeight: 300,
    };

    render() {
        return (
            <Layout className="profile-page-container">
                <Layout.Content className="profile-page-content">
                    <div className="profile-page-header">
                        <Avatar size={128} icon="user" className="user-profile-picture" />
                    </div>
                    <Card
                        className="card-parameters"
                        title="Profile update"
                        style={this.cardStyle}
                        bodyStyle={this.cardBodyStyle}
                        id="profile-update"
                    ></Card>
                    <Card
                        className="card-parameters"
                        title="Favorites"
                        style={this.cardStyle}
                        bodyStyle={this.cardBodyStyle}
                        id="favorites"
                    ></Card>
                    <Card
                        className="card-parameters"
                        title="Global preferences"
                        style={this.cardStyle}
                        bodyStyle={this.cardBodyStyle}
                        id="global-preferences"
                    ></Card>
                    <Card
                        className="card-parameters"
                        title="Privacy settings"
                        style={this.cardStyle}
                        bodyStyle={this.cardBodyStyle}
                        id="privacy-settings"
                    ></Card>
                </Layout.Content>
                <MediaQuery minDeviceWidth={720}>
                    <Layout.Sider>
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={['1']}
                            defaultOpenKeys={['sub1']}
                            style={{ height: '100%' }}
                        >
                            <Menu.Item key="1"><a href="#profile-update">Profile update</a></Menu.Item>
                            <Menu.Item key="2"><a href="#favorites">Favorites</a></Menu.Item>
                            <Menu.Item key="3"><a href="#global-preferences">Global preferences</a></Menu.Item>
                            <Menu.Item key="4"><a href="#privacy-settings">Privacy settings</a></Menu.Item>
                        </Menu>
                    </Layout.Sider>
                </MediaQuery>
            </Layout>
        );
    }
}

export default connect()(Profile);
