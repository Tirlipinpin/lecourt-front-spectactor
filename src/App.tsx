import React, { Component, Dispatch } from 'react';
import { Route, Redirect } from 'react-router';
import { connect } from 'react-redux';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Profile from './components/Profile';

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

    render() {
        const { match, login, history } = this.props;

        if (!login.logged)
            return (
                <Redirect to="/login" />
            );

        return (
            <div className="app-wrapper">
                <Navbar match={match} history={history} />
                <div className="app-container">
                    <Route exact path={match.url} component={Homepage} />
                    <Route path={`${match.path}/profile`} component={Profile} />
                </div>
            </div>
        );
    }
}

export default connect(({ login }: any) => ({
    login,
}))(App);
