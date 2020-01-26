import React, { Component, Dispatch, lazy } from 'react';
import {
    Switch,
    Route,
    Redirect,
    RouteComponentProps,
} from 'react-router';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import { Trans } from 'react-i18next';
import Cookies from 'js-cookie';
import axiosInterceptor from '../../services/axiosInterceptor';
import { ILoginStore } from '../../reducers/login';
import { getManagementUrl } from '../../services/requestUrl';
import styles from './index.module.scss';
import './index.scss';
import Navbar from './Navbar';
import MobileNavbar from './Navbar/Mobile';
import NotFound from '../NotFound';
import { lazyRenderer } from 'services/renderer/lazyRenderer';
import { fetchUserInitApp, logout } from './actions';
import { IUserStore } from 'reducers/rootReducer';
import Loader from 'designSystem/Loader';

const Homepage = lazy(() => import('./Homepage'));
const Profile = lazy(() => import('./Profile'));
const Search = lazy(() => import('./Search'));
const Watch = lazy(() => import('./Watch'));
const BrowseGenres = lazy(() => import('./BrowseGenres'));
const Genres = lazy(() => import('./Genres'));

interface AppProps extends RouteComponentProps {
    dispatch: Dispatch<any>
    login: ILoginStore
    user: IUserStore
}

export class App extends Component<AppProps, {}>{
    componentDidMount() {
        const { dispatch, login } = this.props;
        const { token } = login;

        axiosInterceptor(() => {
            dispatch(logout());
            Cookies.remove('user_authorization', {
              domain: process.env.REACT_APP_DOMAIN_URL,
            });
            window.location.href = process.env.REACT_APP_FRONT_URL!;
        });
        
        if (!token) return;

        axios.defaults.baseURL = getManagementUrl();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        dispatch(fetchUserInitApp());
    };

    render() {
        const { match, login, location, user: { isReady } } = this.props;

        if (!login.token) {
            return (
                <Redirect to="/authentication/login" />
            );
        }

        if (!isReady) {
            return(
                <div className={styles.appLoading}>
                    <Loader className={styles.loader} size="3vw" />
                </div>
            );
        }

        return (
            <div className={styles.appWrapper}>
                <Layout>
                    <MediaQuery minWidth={600}>
                        <Navbar { ...this.props } />
                    </MediaQuery>
                    <MediaQuery maxWidth={600}>
                        <MobileNavbar { ...this.props } />
                    </MediaQuery>
                    <div className={styles.appContainer}>
                        <Layout.Content className={styles.appContent}>
                            <Switch location={location}>
                                <Route exact path={match.url} render={(props) => lazyRenderer(Homepage, props, styles.loader)} />
                                <Route path={`${match.path}/profile`} render={(props) => lazyRenderer(Profile, props, styles.loader)}/>
                                <Route path={`${match.path}/watch/:id`} render={(props) => lazyRenderer(Watch, props, styles.loader)}/>
                                <Route path={`${match.path}/search/:term`} render={(props) => lazyRenderer(Search, props, styles.loader)}/>
                                <Route path={`${match.path}/genres/:genreId`} render={(props) => lazyRenderer(Genres, props, styles.loader)}/>
                                <Route path={`${match.path}/browse_genres`} render={(props) => lazyRenderer(BrowseGenres, props, styles.loader)}/>
                                <Route render={() => <NotFound title="Page not found !" />}/>
                            </Switch>
                        </Layout.Content>
                    </div>
                    <Layout.Footer className={styles.appFooter}>
                            <Trans i18nKey="FOOTER" />
                        </Layout.Footer>
                </Layout>
            </div>
        );
    }
}

export default connect(({ login, user }: any) => ({
    login,
    user,
}))(App);
