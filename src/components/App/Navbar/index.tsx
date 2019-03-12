import React, { Component, Dispatch } from 'react';
import { Layout, Menu, Input, Icon } from 'antd';
import { Link, match } from 'react-router-dom';
import { connect } from 'react-redux';
import { History, Location } from 'history';

import logo from './Logo.png';
import './index.css';
import { LOGOUT } from '../../../reducers/login/constantes';
import { UPDATE_SEARCH_TERM } from '../../../reducers/navbar/constantes';
import { NavbarStore } from '../../../reducers/navbar';
import ClearIcon from './ClearIcon';

const { Header } = Layout;

interface NavbarProps {
    match: match,
    history: History,
    location: Location,
    dispatch: Dispatch<any>,
    navbar: NavbarStore,
};

export class Navbar extends Component<NavbarProps, {}> {
    logout = () => {
        const { dispatch, history } = this.props;

        dispatch({
            type: LOGOUT,
        });

        history.push('/login');
    }

    isActive = (): Array<string> => {
        const { location } = this.props;

        return [
            location.pathname.split('/')[2] || 'homepage',
        ];
    }

    onChangeSearchTerm = (e: any) => {
        const { dispatch } = this.props;

        dispatch({
            type: UPDATE_SEARCH_TERM,
            payload: e.target.value,
        });
    }

    onSearchTerm = () => {
        const { history, navbar, match } = this.props;
        const { searchTerm } = navbar;

        if (searchTerm.length > 0)
            history.push(`${match.url}/search/${searchTerm}`);
    }

    render() {
        const { history, navbar } = this.props;
        const { url } = this.props.match;

        const { searchTerm } = navbar;

        return (
            <Header className="navbar-container">
                <img src={logo} className="logo" onClick={() => history.push(url)} />
                <Menu
                    theme="dark"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                    className="menu-items-container navbar-menu"
                    selectedKeys={this.isActive()}
                >
                    <Menu.Item key="homepage"><Link to={url}>Homepage</Link></Menu.Item>
                    <Menu.Item key="profile"><Link to={`${url}/profile`}>Profile</Link></Menu.Item>
                    <Menu.Item key="searchbar">
                        <Input.Search
                            value={searchTerm}
                            onChange={this.onChangeSearchTerm}
                            placeholder="Search a short..."
                            suffix={<ClearIcon termLength={searchTerm.length} onChangeSearchTerm={this.onChangeSearchTerm} />}
                            onPressEnter={this.onSearchTerm}
                            onSearch={this.onSearchTerm}
                        />
                    </Menu.Item>
                    <Menu.Item key="logout" className="logout-button" onClick={this.logout}>Logout</Menu.Item>
                </Menu>
            </Header>
        );
    }
};

export default connect(({ navbar }: any) =>({
    navbar,
}))(Navbar);
