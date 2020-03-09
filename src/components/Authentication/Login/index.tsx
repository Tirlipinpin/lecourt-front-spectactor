import React, {
    Component, Dispatch, Fragment, SyntheticEvent,
} from 'react';
import { connect } from 'react-redux';
import {
    Button, Checkbox, Form, Input, Tooltip, Typography,
} from 'antd';
import {
    InfoCircleOutlined, LockOutlined, MailOutlined,
} from '@ant-design/icons';
import { Trans } from 'react-i18next';

import { CheckboxChangeEvent } from 'antd/lib/checkbox';
import styles from '../index.module.scss';

const { Item } = Form;

export interface LoginProps {
    dispatch: Dispatch<any>
    loading: boolean
}

export interface LoginState {
    email: string
    password: string
    rememberMe: boolean
}

export class Login extends Component<LoginProps, LoginState> {
    state = {
        email: '',
        password: '',
        rememberMe: false,
    };

    handleEmail = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            email: target.value,
        });
    };

    handlePassword = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            password: target.value,
        });
    };

    handleRememberMe = (e: CheckboxChangeEvent) => {
        const { target: { checked } } = e;

        this.setState({
            rememberMe: checked,
        });
    };

    fetchToken = (): void => {
        const { dispatch } = this.props;
        const { email, password, rememberMe } = this.state;

        dispatch({
            type: 'FETCH_TOKEN',
            payload: {
                email,
                password,
                rememberMe,
            },
        });
    };

    render() {
        const { email, password } = this.state;
        const { loading } = this.props;

        return (
            <Fragment>
                <Typography.Title level={3} className={styles.authFormTitle}>
                    <Trans i18nKey='LOGIN' />
                </Typography.Title>
                <Form className={styles.authFormContainer} onFinish={this.fetchToken} layout="vertical">
                    <Item
                        label="Email"
                        colon={false}
                        className={styles.authFormItem}
                    >
                        <Input
                            allowClear
                            required
                            prefix={<MailOutlined />}
                            value={email}
                            onChange={this.handleEmail}
                            suffix={
                                <Tooltip title="Email address">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Item
                        label="Password"
                        colon={false}
                        className={styles.authFormItem}
                    >
                        <Input
                            allowClear
                            required
                            prefix={<LockOutlined />}
                            value={password}
                            onChange={this.handlePassword}
                            type="password"
                            suffix={
                                <Tooltip title="Password">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Checkbox
                        className={styles.authFormCheckbox}
                        onChange={this.handleRememberMe}
                    >Remember me</Checkbox>
                    <Button
                        block={true}
                        className={`${styles.authFormButton} ${loading ? styles.authFormButtonLoading : ''}`}
                        htmlType="submit"
                        loading={loading}
                        type="primary"
                    >
                        <Trans i18nKey="LOGIN" />
                    </Button>
                </Form>
            </Fragment>
        );
    }
};

export default connect()(Login);
