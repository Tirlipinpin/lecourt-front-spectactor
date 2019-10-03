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
import { LOGOUT } from '../../../reducers/login/constants';
import {
    FETCH_NAVBAR_GENRES,
    UPDATE_SEARCH_TERM,
} from '../../../reducers/navbar/constants';
import { NavbarStore } from '../../../reducers/navbar';
import ClearIcon from './ClearIcon';
import { Genre } from '../interfaces';

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

        setTimeout(() => dispatch({
            type: FETCH_NAVBAR_GENRES,
        }), 0);
    }

    logout = () => {
        const { dispatch, history } = this.props;

        dispatch({
            type: LOGOUT,
        });

        history.push('/');
    };

    getActiveKeys = (): Array<string> => {
        const { location, navbar } = this.props;
        const currentActive = location.pathname.split('/')[2];

        if (!currentActive) return ['homepage'];
        if (currentActive === 'browse_genres' || currentActive === 'genres') {
            return navbar.genres.map((genre: Genre) => `genres:${genre.id}`);
        }

        return [currentActive];
    };

    onChangeSearchTerm = (e: any): void => {
        const { dispatch } = this.props;

        dispatch({
            type: UPDATE_SEARCH_TERM,
            payload: e.target.value,
        });
    };

    onSearchTerm = () => {
        const { history, navbar, match } = this.props;
        const { searchTerm } = navbar;

        if (searchTerm.length > 0)
            history.push(`${match.url}/search/${searchTerm}`);
    };

    redirectToGenre = (value: string) => {
        const { history } = this.props;

        history.push(`/app/genres/${value}`);
    };

    render() {
        const { match, history, navbar, t } = this.props;
        const { searchTerm } = navbar;
        const { url } = this.props.match;

        console.log(this.getActiveKeys())

        return (
            <Header className="navbar-container">
                <Menu
                    theme="light"
                    mode="horizontal"
                    style={{ lineHeight: '64px' }}
                    className="menu-items-container navbar-menu"
                    selectedKeys={this.getActiveKeys()}
                >
                    <Item className="navbar-logo">
                        <img src={logo} className="logo" onClick={() => history.push(url)} />
                    </Item>
                    <Item key="homepage"><Link to={url}><Trans i18nKey="HOMEPAGE_BUTTON" /></Link></Item>
                    <Item key="profile"><Link to={`${url}/profile`}>Profile</Link></Item>
                    <Item key="searchbar" className="navbar-searchbar">
                        <Input.Search
                            value={searchTerm}
                            onChange={this.onChangeSearchTerm}
                            placeholder={t('SEARCH_BAR_PLACEHOLDER')}
                            suffix={<ClearIcon termLength={searchTerm.length} onChangeSearchTerm={this.onChangeSearchTerm} />}
                            onPressEnter={this.onSearchTerm}
                            onSearch={this.onSearchTerm}
                        />
                    </Item>
                    <Item key="logout" className="logout-button" onClick={this.logout}><Trans i18nKey="LOGOUT" /></Item>
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
                                <Item key={`genres:${genre.id}`} onClick={() => this.redirectToGenre(genre.id)}>
                                    {genre.name}
                                </Item>
                              )
                            )}
                            <Item>
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
