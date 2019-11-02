import React, { Component, Dispatch, Suspense, lazy } from 'react';
import {
    Switch,
    Route,
    Redirect,
    RouterProps,
    RouteComponentProps,
} from 'react-router';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import { Trans } from 'react-i18next';
import axiosInterceptor from '../../services/axiosInterceptor';
import { LoginStore } from '../../reducers/login';
import { getManagementUrl } from '../../services/requestUrl';
import './index.scss';

import Loader from './shared/Loader';
import Navbar from './Navbar';
import MobileNavbar from './Navbar/Mobile';
import NotFound from '../NotFound';
const Homepage = lazy(() => import('./Homepage'));
const Profile = lazy(() => import('./Profile'));
const Search = lazy(() => import('./Search'));
const Watch = lazy(() => import('./Watch'));
const BrowseGenres = lazy(() => import('./BrowseGenres'));
const Genres = lazy(() => import('./Genres'));

interface AppProps extends RouteComponentProps {
    login: LoginStore
    dispatch: Dispatch<any>
}

export class App extends Component<AppProps, {}>{
    componentDidMount() {
        const { history, dispatch, login } = this.props;
        const { token } = login;

        axiosInterceptor(() => {
            dispatch({ type: 'LOGOUT' });
            history.push('/');
        });

        this.userNotRemembered();

        axios.defaults.baseURL = getManagementUrl();
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    userNotRemembered = () => {
        const { login } = this.props;
        const { token } = login;

        if (!token) return;

        window.addEventListener('beforeunload', ev => {
            ev.preventDefault();
            const { rememberMe } = login;
            if (!rememberMe) {
              localStorage.removeItem('persist:root');
            }
          });
    }

    loadingPage = (): React.ReactElement => (
        <div className="loading-page">
            <Loader size="3vw" />
        </div>
    )

    lazyRender = (Child: any, props?: RouterProps) => React.createElement(() => (
        <Suspense fallback={this.loadingPage()}>
            <Child {...props} />
        </Suspense>
    ))

    render() {
        const { match, login, location } = this.props;

        if (!login.token) {
            return (
                <Redirect to="/authentication/login" />
            );
        }

        return (
            <div className="app-wrapper">
                <Layout>
                    <MediaQuery minWidth={600}>
                        <Navbar { ...this.props } />
                    </MediaQuery>
                    <MediaQuery maxWidth={600}>
                        <MobileNavbar { ...this.props } />
                    </MediaQuery>
                    <div className="app-container">
                        <Layout.Content className="content-container">
                            <Switch location={location}>
                                <Route exact path={match.url} render={(props) => this.lazyRender(Homepage, props)} />
                                <Route path={`${match.path}/profile`} render={(props) => this.lazyRender(Profile, props)}/>
                                <Route path={`${match.path}/watch/:id`} render={(props) => this.lazyRender(Watch, props)}/>
                                <Route path={`${match.path}/search/:term`} render={(props) => this.lazyRender(Search, props)}/>
                                <Route path={`${match.path}/genres/:genreId`} render={(props) => this.lazyRender(Genres, props)}/>
                                <Route path={`${match.path}/browse_genres`} render={(props) => this.lazyRender(BrowseGenres, props)}/>
                                <Route render={() => <NotFound title="Page not found !" />}/>
                            </Switch>
                        </Layout.Content>
                        <Layout.Footer style={{
                            textAlign: 'center',
                        }}>
                            <Trans i18nKey="FOOTER" />
                        </Layout.Footer>
                    </div>
                </Layout>
            </div>
        );
    }
}

export default connect(({ login }: any) => ({
    login,
}))(App);
