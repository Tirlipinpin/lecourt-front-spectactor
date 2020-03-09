import React, { Component, Dispatch, Fragment, FormEvent, SyntheticEvent } from 'react';
import { connect } from 'react-redux';
import {
    Button, Form, Input, Tooltip, Typography,
} from 'antd';
import {
    InfoCircleOutlined, LockOutlined, MailOutlined, UserOutlined,
} from '@ant-design/icons';
import { Trans } from 'react-i18next';

import { RegisterStore } from '../../../reducers/register';
import styles from '../index.module.scss';

const { Item } = Form;

export interface RegisterState {
    displayName: string
    email: string
    password: string
    passwordConfirm: string
}

export interface RegisterProps {
    dispatch: Dispatch<any>
    register: RegisterStore
}

export class Register extends Component<RegisterProps, RegisterState> {
    state = {
        displayName: '',
        email: '',
        password: '',
        passwordConfirm: '',
    };

    registerUser = (): void => {
        const { displayName, email, password, passwordConfirm } = this.state;
        const { dispatch } = this.props;

        dispatch({
            type: 'REGISTER_USER',
            payload: {
                displayName,
                email,
                password,
                passwordConfirm,
            }
        });
    };

    handleDisplayName = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;
        this.setState({
            displayName: target.value,
        });
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

    handlePasswordConfirm = (e: SyntheticEvent): void => {
        const target = e.target as HTMLInputElement;

        this.setState({
            passwordConfirm: target.value,
        });
    };

    render() {
        const { displayName, email, password, passwordConfirm } = this.state;
    
        return (
            <Fragment>
                <Typography.Title level={3} className={styles.authFormTitle}>
                    <Trans i18nKey="REGISTER" />
                </Typography.Title>
                <Form className={styles.authFormContainer} onFinish={this.registerUser} layout="vertical">
                    <Item
                        className={styles.authFormItem}
                        label="Display name"
                        colon={false}
                    >
                        <Input
                            allowClear
                            required
                            prefix={<UserOutlined />}
                            value={displayName}
                            onChange={this.handleDisplayName}
                            suffix={
                                <Tooltip title="Display name">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Item
                        className={styles.authFormItem}
                        label="Email"
                        colon={false}
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
                        className={styles.authFormItem}
                        label="Password"
                        colon={false}
                    >
                        <Input
                            allowClear
                            required
                            prefix={<LockOutlined />}
                            value={password}
                            onChange={this.handlePassword}
                            type='password'
                            suffix={
                                <Tooltip title="Password">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Item
                        className={styles.authFormItem}
                        label="Password (confirmation)"
                        colon={false}
                    >
                        <Input
                            allowClear
                            required
                            prefix={<LockOutlined />}
                            value={passwordConfirm}
                            onChange={this.handlePasswordConfirm}
                            type='password'
                            suffix={
                                <Tooltip title="Password (confirmation), the same as the previous password">
                                    <InfoCircleOutlined />
                                </Tooltip>
                            }
                        />
                    </Item>
                    <Tooltip
                        title="Les inscriptions ne sont pas ouvertes !"
                    >
                        <Button
                            block
                            className={styles.authFormButton}
                            disabled={true}
                            htmlType="submit"
                            type="primary"
                        >
                            <Trans i18nKey="REGISTER" />
                        </Button>
                    </Tooltip>
                </Form>
            </Fragment>
        );
    }
}

export default connect(({ register }: any) => ({
    register,
}))(Register);
