import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Form, Icon, Input, Button } from 'antd';

interface LoginStore {
    loading: boolean,
}

interface LoginProps {
    dispatch: Dispatch<any>,
    login: LoginStore,
};

interface LoginState {
    email: string,
    password: string,
}

export class Login extends Component<LoginProps, LoginState> {
    constructor(props: any) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleEmail = (e: any) => {
        this.setState({
            email: e.target.value,
        });
    }

    handlePassword = (e: any) => {
        this.setState({
            password: e.target.value,
        });
    }

    fetchToken = (e: any) => {
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
            <Form onSubmit={this.fetchToken} className="login-form">
                <Form.Item
                    help="Enter your email"
                >
                    <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Email" value={email} onChange={this.handleEmail} />
                </Form.Item>
                <Form.Item
                    help="Enter your password"
                >
                    <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Password" value={password} type="password" onChange={this.handlePassword} />
                </Form.Item>
                <Form.Item>
                    <Button disabled={login.loading} htmlType="submit">
                        Log in
                    </Button>
                </Form.Item>
            </Form>
        );
    }
};

const mapStateToProp = ({ login }: any) => ({ login });

export default connect(mapStateToProp)(Login);
