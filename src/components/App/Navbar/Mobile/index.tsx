import React, { Component, Dispatch } from 'react';
import { Layout, Menu, Drawer, Icon, Input } from 'antd';
import { Link, match } from 'react-router-dom';
import { connect } from 'react-redux';
import { History, Location } from 'history';
import { Trans, WithTranslation, withTranslation } from 'react-i18next';

const { Header } = Layout;
import { LOGOUT } from '../../../../reducers/login/constantes';
import logo from '../Logo.png';
import { UPDATE_SEARCH_TERM } from '../../../../reducers/navbar/constantes';
import { NavbarStore } from '../../../../reducers/navbar';
import ClearIcon from '../ClearIcon';

interface MobileNavbarProps extends WithTranslation {
    match: match,
    history: History,
    location: Location,
    dispatch: Dispatch<any>,
    navbar: NavbarStore,
};

interface MobileNavbarState {
    menuOpen: boolean,
};

export class MobileNavbar extends Component<MobileNavbarProps, MobileNavbarState> {
    state = {
        menuOpen: false,
    };

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

    toggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
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
        const { history, navbar, t } = this.props;
        const { url } = this.props.match;
        const { menuOpen } = this.state;

        const { searchTerm } = navbar;

        return (
            <div>
                <Drawer
                    title='Lecourt'
                    placement='left'
                    closable
                    visible={ menuOpen }
                    onClose={this.toggleMenu}
                >
                    <Menu className="navbar-menu" theme="light">
                        <Menu.Item key="homepage"><Link to={url}><Trans i18nKey="HOMEPAGE_BUTTON" /></Link></Menu.Item>
                        <Menu.Item key="profile"><Link to={`${url}/profile`}>Profile</Link></Menu.Item>
                        <Menu.Item key="logout" onClick={this.logout}><Trans i18nKey="LOGOUT" /></Menu.Item>
                        <Menu.Item key="searchbar">
                            <Input.Search
                                value={searchTerm}
                                onChange={this.onChangeSearchTerm}
                                placeholder={t('SEARCH_BAR_PLACEHOLDER')}
                                suffix={<ClearIcon termLength={searchTerm.length} onChangeSearchTerm={this.onChangeSearchTerm} />}
                                onPressEnter={this.onSearchTerm}
                                onSearch={this.onSearchTerm}
                            />
                        </Menu.Item>
                    </Menu>
                </Drawer>
                <Header
                    className="navbar-container"
                    style={{
                        padding: 0,
                    }}
                >
                    <Menu
                        theme="light"
                        mode="horizontal"
                        style={{ lineHeight: '64px' }}
                        selectedKeys={this.isActive()}
                    >
                        <Menu.Item style={{ marginLeft: 'auto' }}><img src={logo} className="logo" onClick={() => history.push(url)} /></Menu.Item>
                        <Menu.Item onClick={this.toggleMenu} style={{ float: 'right' }}><Icon type="menu-unfold" /></Menu.Item>
                    </Menu>
                </Header>
            </div>
        );
    }
};

export default connect(({ navbar }: any) => ({
    navbar,
}))(withTranslation()(MobileNavbar));
