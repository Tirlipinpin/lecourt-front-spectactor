import React, { Component } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';
import { Modal, Avatar } from 'antd';
import { LoginStore } from '../../reducers/login';

import logo from '../../assets/logo_text.png';
import ok from '../../assets/bg.jpg';
import './index.css';

const { warning } = Modal;

export interface AuthenticationProps extends RouteComponentProps {
    login: LoginStore
}

export class Authentication extends Component<AuthenticationProps, {}> {
    componentDidMount() {
        warning({
            title: `Les inscriptions sont fermées pour le moment, nous faisons ce que nous pouvons pour écourter votre attente le plus possible !`,
        });
    }

    render() {
        const { location, match, login } = this.props;
        const { token } = login;

        if (token)
            return <Redirect to="/app" />;

        return (
            <div className="auth-background" style={{ backgroundImage: `url(${ok})` }}>
                <div className="auth-container">
                    <div className="auth-element auth-form">
                        <Avatar size={64} icon="user"/>
                        <Switch location={location}>
                            <Route path={`${match.url}/login`} render={() => <Login loading={login.loading} />} />
                            <Route path={`${match.url}/register`} component={Register} />
                        </Switch>
                    </div>
                    <div className="auth-element auth-right">
                        <img className="logo" src={logo} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ login }: any) => ({
    login,
}))(Authentication);