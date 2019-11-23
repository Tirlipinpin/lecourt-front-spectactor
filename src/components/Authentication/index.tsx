import React, { Component, ReactNode } from 'react';
import {
    Switch,
    Route,
    Redirect,
    RouteComponentProps
} from 'react-router';
import Login from './Login';
import Register from './Register';
import { connect } from 'react-redux';
import { Avatar, Divider, Icon } from 'antd';
import { Link } from 'react-router-dom';
import { Trans } from 'react-i18next';

import { LoginStore } from '../../reducers/login';
import logo from '../../assets/logo_text.png';
import background from '../../assets/bg.jpg';
import styles from './index.module.scss';

export interface AuthenticationProps extends RouteComponentProps {
    login: LoginStore
}

export class Authentication extends Component<AuthenticationProps, {}> {
    renderSwitchLink = (): ReactNode => {
        const { location: { pathname } } = this.props;

        if (pathname.split('/').slice(-1)[0] === 'login') {
            return (
                <div className={styles.switchFormLink}>
                    <Trans i18nKey="AUTH_NO_ACCOUNT" />
                    <Link to="/authentication/register">
                        <Trans i18nKey="AUTH_REGISTER" />
                    </Link>
                </div>
            );
        }

        return (
            <div className={styles.switchFormLink}>
                <Link to="/authentication/login">
                    Looking to <b>login</b> ?
                </Link>
            </div>
        );
    };

    renderAuthFooter = (): ReactNode => (
        <div className={styles.authFormFooter}>
            <a
                className={styles.socialLoginLink}
                href="https://api.stg.lecourt.tv/auth/login/facebook"
            >
                <Icon type="facebook" />
            </a>
            <a
                className={styles.socialLoginLink}
                href="https://api.stg.lecourt.tv/auth/login/google"
            >
                <Icon type="google" />
            </a>
            <Divider
                className={styles.divider}
                type="vertical"
            />
            {this.renderSwitchLink()}
        </div>
    );

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
                        {this.renderAuthFooter()}
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