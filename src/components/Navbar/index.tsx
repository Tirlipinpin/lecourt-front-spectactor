import React, { Component, Dispatch } from 'react';
import { Layout, Menu } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

const { Header } = Layout;
import logo from './Logo.png';
import './index.css';
import { LOGOUT } from '../../reducers/login/constantes';

interface NavbarProps {
    match: any,
    history: any,
    dispatch: Dispatch<any>,
};

export class Navbar extends Component<NavbarProps, {}> {
    logout = () => {
        const { dispatch, history } = this.props;
        const { url } = this.props.match;

        dispatch({
            type: LOGOUT,
        });

        history.push('/login');
    }
    render() {
        const { history } = this.props;
        const { url } = this.props.match;

        return (
            <Header className="navbar-container">
                <img src={logo} className="logo" onClick={() => history.push(url)} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    defaultSelectedKeys={['1']}
                    style={{ lineHeight: '64px' }}
                    className="menu-items-container"
                >
                    <Menu.Item key="1"><Link to={url}>Homepage</Link></Menu.Item>
                    <Menu.Item key="2"><Link to={`${url}/profile`}>Profile</Link></Menu.Item>
                    <Menu.Item key="3" className="logout-button" onClick={this.logout}>Logout</Menu.Item>
                </Menu>
            </Header>
        );
    }
};

export default connect()(Navbar);
