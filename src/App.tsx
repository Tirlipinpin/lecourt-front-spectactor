import React, { Component, Dispatch, Suspense, lazy } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';
import axios from 'axios';

import Navbar from './components/Navbar';
const Homepage = lazy(() => import('./components/Homepage'));
const Profile = lazy(() => import('./components/Profile'));

import axiosInterceptor from './services/axiosInterceptor';
import { LoginStore } from './reducers/login';

import './App.css';

interface AppProps {
    match: any,
    history: any,
    location: any,
    login: LoginStore,
    dispatch: Dispatch<any>,
}

export class App extends Component<AppProps, {}>{
    componentDidMount() {
        const { history, dispatch, login } = this.props;
        const { token } = login;

        axiosInterceptor(() => {
            dispatch({ type: 'LOGOUT' });
            history.push('/login');
        });

        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }

    lazyRender = (Child: React.ComponentType) => (
        <Suspense
            fallback={(
                <Icon type="loading" />
            )}
        >
            <Child />
        </Suspense>
    )

    render() {
        const { match, login, history, location } = this.props;

        if (!login.token)
            return (
                <Redirect to="/login" />
            );

        return (
            <div className="app-wrapper">
                <Layout>
                    <Navbar match={match} history={history} location={location} />
                    <div className="app-container">
                        <Layout.Content className="content-container">
                            <Route exact path={match.url} render={() => this.lazyRender(Homepage)} />
                            <Route path={`${match.path}/profile`} render={() => this.lazyRender(Profile)} />
                        </Layout.Content>
                        <Layout.Footer style={{ textAlign: 'center' }}>
                            Lecourt ©2019 Created with <Icon type="heart" /> by the best developpers ever
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
