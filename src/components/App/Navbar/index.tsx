import React, { Component, Dispatch, SyntheticEvent } from 'react';
import { Layout, Menu, Input, Icon } from 'antd';
import { Link, match } from 'react-router-dom';
import { connect } from 'react-redux';
import { History, Location } from 'history';
import { Trans, WithTranslation, withTranslation } from 'react-i18next';

import logo from './Logo.png';
import './index.css';
import { LOGOUT } from '../../../reducers/login/constantes';
import { UPDATE_SEARCH_TERM } from '../../../reducers/navbar/constantes';
import { NavbarStore } from '../../../reducers/navbar';
import ClearIcon from './ClearIcon';

const { Header } = Layout;

interface NavbarProps extends WithTranslation {
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

    onChangeSearchTerm = (e: any): void => {
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
        const { history, navbar, t } = this.props;
        const { url } = this.props.match;

        const { searchTerm } = navbar;

        return (
            <Header className="navbar-container">
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                    className="menu-items-container navbar-menu"
                    selectedKeys={this.isActive()}
                >
                    <Menu.Item className="navbar-logo">
                        <img src={logo} className="logo" onClick={() => history.push(url)} />
                    </Menu.Item>
                    <Menu.Item key="homepage"><Link to={url}><Trans i18nKey="HOMEPAGE_BUTTON" /></Link></Menu.Item>
                    <Menu.Item key="profile"><Link to={`${url}/profile`}>Profile</Link></Menu.Item>
                    <Menu.Item key="searchbar" className="navbar-searchbar">
                        <Input.Search
                            value={searchTerm}
                            onChange={this.onChangeSearchTerm}
                            placeholder={t('SEARCH_BAR_PLACEHOLDER')}
                            suffix={<ClearIcon termLength={searchTerm.length} onChangeSearchTerm={this.onChangeSearchTerm} />}
                            onPressEnter={this.onSearchTerm}
                            onSearch={this.onSearchTerm}
                        />
                    </Menu.Item>
                    <Menu.Item key="logout" className="logout-button" onClick={this.logout}><Trans i18nKey="LOGOUT" /></Menu.Item>
                </Menu>
            </Header>
        );
    }
};

export default connect(({ navbar }: any) =>({
    navbar,
}))(withTranslation()(Navbar));
