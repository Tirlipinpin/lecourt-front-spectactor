import React, { Component, Dispatch } from 'react';
import {
    Layout,
    Menu,
    Input,
    Icon,
} from 'antd';
import { Link } from 'react-router-dom';
import { RouteComponentProps } from 'react-router'
import { connect } from 'react-redux';
import {Trans, WithTranslation, withTranslation} from 'react-i18next';

import logo from '../../../assets/Logo.png';
import './index.css';
import { NavbarStore } from '../../../reducers/navbar';
import ClearIcon from './ClearIcon';
import { Genre } from '../interfaces';
import { fetchNavbarGenres } from './actions';
import { getActiveKey, onChangeSearchTerm, redirectToGenre, onSearchTerm, logout } from './services';

const { Header } = Layout;
const { SubMenu, Item, ItemGroup } = Menu;

interface NavbarProps extends RouteComponentProps, WithTranslation {
    dispatch: Dispatch<any>
    navbar: NavbarStore
    t?: any
}

export class Navbar extends Component<NavbarProps, {}> {
    componentDidMount(): void {
        const { dispatch } = this.props;

        setTimeout(() => dispatch(fetchNavbarGenres()), 0);
    }

    render() {
        const { match, history, navbar, t } = this.props;
        const { searchTerm } = navbar;
        const { url } = this.props.match;

        return (
            <Header className="navbar-container">
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                    className="menu-items-container navbar-menu"
                    selectedKeys={getActiveKey()}
                >
                    <Item className="navbar-logo">
                        <img src={logo} className="logo" onClick={() => history.push(url)} />
                    </Item>
                    <Item key="homepage"><Link to={url}><Trans i18nKey="HOMEPAGE_BUTTON" /></Link></Item>
                    <Item key="profile"><Link to={`${url}/profile`}>Profile</Link></Item>
                    <Item key="searchbar" className="navbar-searchbar">
                        <Input.Search
                            value={searchTerm}
                            onChange={onChangeSearchTerm}
                            placeholder={t('SEARCH_BAR_PLACEHOLDER')}
                            suffix={<ClearIcon termLength={searchTerm.length} onChangeSearchTerm={onChangeSearchTerm} />}
                            onPressEnter={onSearchTerm}
                            onSearch={onSearchTerm}
                        />
                    </Item>
                    <Item key="logout" className="logout-button" onClick={logout}><Trans i18nKey="LOGOUT" /></Item>
                    <SubMenu
                        title={
                            <span className="">
                                <Icon type="down" />
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
                </Menu>
            </Header>
        );
    }
}

export default connect(({ navbar }: any) =>({
    navbar,
}))(withTranslation()(Navbar));
