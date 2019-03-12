import React, { Component, Dispatch, FormEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

import { RegisterStore } from '../../reducers/register';

import './index.css';

interface RegisterState {
    displayName: string,
    email: string,
    password: string,
    passwordConfirm: string,
};

interface RegisterProps {
    dispatch: Dispatch<any>,
    register: RegisterStore,
};

export class Register extends Component<RegisterProps, RegisterState> {
    state = {
        displayName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    registerUser = (e: FormEvent<any>): void => {
        const { displayName, email, password, passwordConfirm } = this.state;
        const { dispatch } = this.props;

        e.preventDefault();

        dispatch({
            type: 'REGISTER_USER',
            payload: {
                displayName,
                email,
                password,
                passwordConfirm,
            }
        });
    }

    handleDisplayName = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        this.setState({
            displayName: target.value,
        });
    }

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

    handlePasswordConfirm = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            passwordConfirm: target.value,
        });
    }

    render() {
        const { displayName, email, password, passwordConfirm } = this.state;
        const { register } = this.props;
    
        return (
            <div className="register-form">
                <h1>Register to Lecourt</h1>
                <Form onSubmit={this.registerUser}>
                    <Form.Item
                        help="The name that will be displayed"
                    >
                        <Input prefix={<Icon type="user" />} value={displayName} onChange={this.handleDisplayName} />
                    </Form.Item>
                    <Form.Item
                        help="Enter your email"
                    >
                        <Input prefix={<Icon type="mail" />} value={email} onChange={this.handleEmail} />
                    </Form.Item>
                    <Form.Item
                        help="Enter your password"
                    >
                        <Input prefix={<Icon type="lock" />} value={password} type="password" onChange={this.handlePassword} />
                    </Form.Item>
                    <Form.Item
                        help="Comfirm your password"
                    >
                        <Input prefix={<Icon type="lock" />} value={passwordConfirm} type="password" onChange={this.handlePasswordConfirm} />
                    </Form.Item>
                    <Form.Item>
                        <Button
                            className="register-form-button"
                            htmlType="submit"
                            type="primary"
                            disabled={register.loading}
                        >
                            Register
                        </Button>
                        Or <a href="/login">login now!</a>
                    </Form.Item>
                </Form>
            </div>
        );
    }
}

export default connect(({ register }: any) => ({
    register,
}))(Register);
