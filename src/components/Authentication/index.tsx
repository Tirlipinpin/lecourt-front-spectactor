import React, { Component } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';
import { Modal } from 'antd';
import { LoginStore } from '../../reducers/login';

import logo from '../../assets/Logo.png';
import './index.css';

const { error } = Modal;

export interface AuthenticationProps extends RouteComponentProps {
    login: LoginStore
}

export class Authentication extends Component<AuthenticationProps, {}> {
    componentDidMount() {
        error({
            title: `Les inscriptions sont fermées pour le moment, nous faisons ce que nous pouvons pour écourter votre attente le plus possible !`,
        });
    }

    render() {
        const { location, match, login } = this.props;
        const { token } = login;

        if (token)
            return <Redirect to="/app" />;

        return (
            <div className="auth-container">
                <div className="left-auth-container" />
                <div className="right-auth-container">
                    <img src={logo} className="logo" alt="Lecourt logo" />
                    <div className="auth-form">
                        <Switch location={location}>
                            <Route path={`${match.url}/login`} render={() => <Login loading={login.loading} />} />
                            <Route path={`${match.url}/register`} component={Register} />
                        </Switch>
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ login }: any) => ({
    login,
}))(Authentication);