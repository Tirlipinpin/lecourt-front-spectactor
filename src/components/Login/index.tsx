import React, { Component, Dispatch, SyntheticEvent, FormEvent, Fragment } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button, Tooltip } from 'antd';
import { Redirect } from 'react-router';

import { LoginStore } from '../../reducers/login';

import './index.css';
import logo from '../../assets/Logo.png';

export interface LoginProps {
    dispatch: Dispatch<any>
    login: LoginStore
};

export interface LoginState {
    email: string
    password: string
};

export class Login extends Component<LoginProps, LoginState> {
    state = {
        email: '',
        password: '',
    };

    handleEmail = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            email: target.value,
        });
    }

    handlePassword = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            password: target.value,
        });
    }

    fetchToken = (e: FormEvent<any>): void => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

        e.preventDefault();

        dispatch({
            type: 'FETCH_TOKEN',
            payload: {
                email,
                password,
            },
        });
    }

    render() {
        const { login } = this.props;
        const { email, password } = this.state;

        return (
            <div className="login-wrap">
                <img src={logo} className="logo" />
                <div className="login-form">
                { login.token && <Redirect to="/app" /> }
                    <h1>Sign in</h1>
                    <Form onSubmit={this.fetchToken}>
                        <Input
                            className="login-form-item"
                            prefix={<Icon type="mail" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            allowClear value={email} onChange={this.handleEmail}
                            placeholder="Email"
                            suffix={
                                <Tooltip title="Email address">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        <Input
                            className="login-form-item"
                            prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                            allowClear value={password} type="password" onChange={this.handlePassword}
                            placeholder="Password"
                            suffix={
                                <Tooltip title="Password">
                                    <Icon type="info-circle" style={{ color: 'rgba(0,0,0,.45)' }} />
                                </Tooltip>
                            }
                        />
                        <Button
                            disabled={login.loading}
                            htmlType="submit"
                            type="primary"
                            shape="round"
                            className="login-form-button"
                            block={true}
                        >
                            Sign in
                        </Button>
                        <a href="/register">Looking to <b>register</b> ?</a>
                    </Form>
                </div>
            </div>
        );
    }
};

const mapStateToProp = ({ login }: any) => ({ login });

export default connect(mapStateToProp)(Login);
