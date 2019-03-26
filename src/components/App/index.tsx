import React, { Component, Dispatch, Suspense, lazy } from 'react';
import { Switch, Route, Redirect, RouterProps, match } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import { History, Location } from 'history';
import { Trans } from 'react-i18next';

import Navbar from './Navbar';
import MobileNavbar from './Navbar/Mobile';
const Homepage = lazy(() => import('./Homepage'));
const Profile = lazy(() => import('./Profile'));
const Search = lazy(() => import('./Search'));
const Watch = lazy(() => import('./Watch'));

import axiosInterceptor from '../../services/axiosInterceptor';
import { LoginStore } from '../../reducers/login';

import './index.css';
import NotFound from '../NotFound';


interface AppProps {
    match: match
    history: History
    location: Location
    login: LoginStore
    dispatch: Dispatch<any>
}

export class App extends Component<AppProps, {}>{
    componentDidMount() {
        const { history, dispatch, login } = this.props;
        // const { token } = login;

        axiosInterceptor(() => {
            dispatch({ type: 'LOGOUT' });
            history.push('/login');
        });

        axios.defaults.baseURL = 'https://management.stg.lecourt.tv/';
        axios.defaults.headers.common['Authorization'] = `changeIt`;
        // axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    renderComponent = (Child: any, props: RouterProps) => React.createElement(() => (
        <Suspense fallback={<Icon type="loading" />}>
            <Child {...props} />
        </Suspense>
    ))

    render() {
        const { match, login, location } = this.props;

        if (!login.token)
            return (
                <Redirect to="/login" />
            );

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
                                <Route exact path={match.url} render={(props) => this.renderComponent(Homepage, props)} />
                                <Route path={`${match.path}/profile`} render={(props) => this.renderComponent(Profile, props)}/>
                                <Route path={`${match.path}/watch/:id`} render={(props) => this.renderComponent(Watch, props)}/>
                                <Route path={`${match.path}/search/:term`} render={(props) => this.renderComponent(Search, props)}/>
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
