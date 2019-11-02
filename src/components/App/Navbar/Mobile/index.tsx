import React, { Component, Dispatch } from 'react';
import { Layout, Menu, Drawer, Icon, Input } from 'antd';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Trans, WithTranslation, withTranslation } from 'react-i18next';

import { fetchNavbarGenres } from '../actions';
import {
    onChangeSearchTerm,
    logout,
    redirectToGenre,
    onSearchTerm,
    getActiveKey
} from '../services';
import logo from '../../../../assets/Logo.png';
import { NavbarStore } from '../../../../reducers/navbar';
import ClearIcon from '../ClearIcon';
import { Genre } from '../../interfaces';
import styles from './index.module.scss';

const { Header } = Layout;
const { SubMenu, Item, ItemGroup } = Menu;

interface MobileNavbarProps extends WithTranslation, RouteComponentProps {
    dispatch: Dispatch<any>
    navbar: NavbarStore
    t?: any
}

interface MobileNavbarState {
    menuOpen: boolean
}

export class MobileNavbar extends Component<MobileNavbarProps, MobileNavbarState> {
    state = {
        menuOpen: false,
    };

    componentDidMount() {
        const { dispatch } = this.props;

        setTimeout(() => dispatch(fetchNavbarGenres()), 0);
    }

    toggleMenu = () => {
        this.setState({ menuOpen: !this.state.menuOpen });
    };

    render() {
        const { history, match, navbar, t } = this.props;
        const { url } = this.props.match;
        const { menuOpen } = this.state;

        const { searchTerm } = navbar;

        return (
            <div>
                <Drawer
                    title='Lecourt'
                    placement='left'
                    closable
                    visible={menuOpen}
                    onClose={this.toggleMenu}
                    headerStyle={{ backgroundColor: '#292929' }}
                    bodyStyle={{ backgroundColor: '#292929' }}
                    drawerStyle={{ backgroundColor: '#292929' }}
                >
                    <Menu
                        className={styles.mobileNavbarMenu}
                    >
                        <Menu.Item key="homepage"><Link to={url}><Trans i18nKey="HOMEPAGE_BUTTON" /></Link></Menu.Item>
                        <Menu.Item key="profile"><Link to={`${url}/profile`}>Profile</Link></Menu.Item>
                        <Menu.Item key="searchbar">
                            <Input.Search
                                value={searchTerm}
                                onChange={onChangeSearchTerm}
                                placeholder={t('SEARCH_BAR_PLACEHOLDER')}
                                suffix={<ClearIcon termLength={searchTerm.length} onChangeSearchTerm={onChangeSearchTerm} />}
                                onPressEnter={onSearchTerm}
                                onSearch={onSearchTerm}
                            />
                        </Menu.Item>
                        <SubMenu
                            title={
                                <span>
                                    {t('GENRES')}
                                </span>
                            }
                        >
                            <ItemGroup title="Most used genres">
                                {navbar.genres.map((genre: Genre) => (
                                    <Item key={`genres:${genre.id}`} onClick={() => redirectToGenre(genre.id)}>
                                        {genre.name}
                                    </Item>
                                )
                                )}
                                <Item key="browse_genres">
                                    <Link to={`${match.url}/browse_genres`}>See more...</Link>
                                </Item>
                            </ItemGroup>
                        </SubMenu>
                        <Menu.Item className={styles.logoutButton} key="logout" onClick={logout}><Trans i18nKey="LOGOUT" /></Menu.Item>
                    </Menu>
                </Drawer>
                <Header
                    className={styles.navbarContainer}
                    style={{
                        padding: 0,
                    }}
                >
                    <Menu
                        theme="light"
                        mode="horizontal"
                        className={styles.topNavbarContainer}
                        style={{ lineHeight: '64px' }}
                        selectedKeys={getActiveKey()}
                    >
                        <Menu.Item className={styles.topMobileNavbarLogo}><img src={logo} className={styles.navbarLogo} onClick={() => history.push(url)} /></Menu.Item>
                        <Menu.Item className={styles.topMobileNavbarButton} onClick={this.toggleMenu}><Icon type="menu-unfold" /></Menu.Item>
                    </Menu>
                </Header>
            </div>
        );
    }
};

export default connect(({ navbar }: any) => ({
    navbar,
}))(withTranslation()(MobileNavbar));
