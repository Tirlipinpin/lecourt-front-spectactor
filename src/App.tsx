import React, { Component, Dispatch, Suspense, lazy } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';

import Navbar from './components/Navbar';
const Homepage = lazy(() => import('./components/Homepage'));
const Profile = lazy(() => import('./components/Profile'));

import axiosInterceptor from './services/axiosInterceptor';
import { LoginStore } from './reducers/login';

import './App.css';

interface AppProps {
    match: any,
    history: any,
    login: LoginStore,
    dispatch: Dispatch<any>,
}

export class App extends Component<AppProps, {}>{
    componentDidMount() {
        const { history, dispatch } = this.props;

        axiosInterceptor(() => {
            dispatch({ type: 'LOGOUT' });
            history.push('/login');
        });
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
        const { match, login, history } = this.props;

        if (!login.logged)
            return (
                <Redirect to="/login" />
            );

        return (
            <div className="app-wrapper">
                <Layout>
                    <Navbar match={match} history={history} />
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
