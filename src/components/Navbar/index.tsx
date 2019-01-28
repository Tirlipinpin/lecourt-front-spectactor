import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

interface NavbarProps {
    match: any,
};

export default class Navbar extends Component<NavbarProps, {}> {
    render() {
        const { url } = this.props.match;

        return (
            <Layout>
                <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
                    <div className="logo" />
                    <Menu
                        theme="dark"
                        mode="horizontal"
                        defaultSelectedKeys={['1']}
                        style={{ lineHeight: '64px' }}
                    >
                        <Menu.Item key="1"><Link to={`${url}`}>Homepage</Link></Menu.Item>
                        <Menu.Item key="2"><Link to={`${url}/profile`}>Profile</Link></Menu.Item>
                    </Menu>
                </Header>
            </Layout>
        );
    }
};
