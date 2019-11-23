import React, { Component } from 'react';
import { Switch, Route, Redirect, RouteComponentProps } from 'react-router';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';
import { Avatar } from 'antd';

import { LoginStore } from '../../reducers/login';
import logo from '../../assets/logo_text.png';
import background from '../../assets/bg.jpg';
import styles from './index.module.scss';

export interface AuthenticationProps extends RouteComponentProps {
    login: LoginStore
}

export class Authentication extends Component<AuthenticationProps, {}> {
    render() {
        const { location, match, login } = this.props;
        const { token } = login;

        if (token)
            return <Redirect to="/app" />;

        return (
            <div className={styles.authPageContainer} style={{ backgroundImage: `url(${background})` }}>
                <div className={styles.authContainer}>
                    <div className={`${styles.authElement} ${styles.authForm}`}>
                        <Avatar size={64} icon="user"/>
                        <Switch location={location}>
                            <Route path={`${match.url}/login`} render={() => <Login loading={login.loading} />} />
                            <Route path={`${match.url}/register`} component={Register} />
                        </Switch>
                    </div>
                    <div className={`${styles.authElement} ${styles.authRight}`}>
                        <img alt="LC-logo" className={styles.logo} src={logo} />
                    </div>
                </div>
            </div>
        );
    }
}

export default connect(({ login }: any) => ({
    login,
}))(Authentication);