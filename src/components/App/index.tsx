import React, { Component, Dispatch, Suspense, lazy } from 'react';
import { Switch, Route, Redirect } from 'react-router';
import { connect } from 'react-redux';
import { Icon, Layout } from 'antd';
import axios from 'axios';
import MediaQuery from 'react-responsive';
import posed, { PoseGroup } from 'react-pose';

import Navbar from './Navbar';
import MobileNavbar from './Navbar/Mobile';
const Homepage = lazy(() => import('./Homepage'));
const Profile = lazy(() => import('./Profile'));
const Search = lazy(() => import('./Search'));

const RoutesContainer = posed.div({
    enter: {
        opacity: 1,
        transition: {
            delay: 300,
            beforeChildren: true,
        }
    },
    flip: {
        transition: {
            ease: 'backInOut',
        }
    },
    exit: {
        opacity: 0,
    },
});

import axiosInterceptor from '../../services/axiosInterceptor';
import { LoginStore } from '../../reducers/login';

import './index.css';

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
            <Child { ...this.props } />
        </Suspense>
    )

    render() {
        const { match, login } = this.props;

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
                            <PoseGroup>
                                <RoutesContainer key={match.url}>
                                    <Switch>
                                        <Route exact path={match.url} render={() => this.lazyRender(Homepage)} />
                                        <Route path={`${match.path}/profile`} render={() => this.lazyRender(Profile)}/>
                                        <Route path={`${match.path}/search`} render={() => <Suspense fallback={<Icon type="loading" />}><Search {...this.props} /></Suspense>} />
                                    </Switch>
                                </RoutesContainer>
                            </PoseGroup>
                        </Layout.Content>
                        <Layout.Footer style={{
                            textAlign: 'center',
                            background: '#001529',
                            color: 'rgba(255, 255, 255, 0.65)'
                        }}>
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
