import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';

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

    fetchToken = () => {
        const { dispatch } = this.props;
        const { email, password } = this.state;

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

        return (
            <div>
                <form>
                    <label>Email</label>
                    <input
                        value={this.state.email}
                        placeholder="Enter your email"
                        onChange={this.handleEmail}
                    />
                    <input
                        value={this.state.password}
                        placeholder="Enter your password"
                        onChange={this.handlePassword}
                    />
                    {
                        login.loading
                        ? 'Loading...'
                        : <button onClick={this.fetchToken}>Login</button>
                    }
                </form>
            </div>
        );
    }
};

const mapStateToProp = ({ login }: any) => ({ login });

export default connect(mapStateToProp)(Login);
