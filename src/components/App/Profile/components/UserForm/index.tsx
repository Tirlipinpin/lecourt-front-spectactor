import React, { FunctionComponent, memo } from 'react';
import { useSelector } from 'react-redux';
import { Form } from 'antd';
import { IProfileStore } from 'reducers/profile';
import UserFormLoading from './components/UserFormLoading';
import styles from './index.module.scss';

export interface IUserFormProps {}

export const UserForm: FunctionComponent<IUserFormProps> = () => {
    const { loading }: IProfileStore = useSelector((state: any) => ({
      loading: state.profile.loading,
    }));

    if (loading)
        return <UserFormLoading />;

    return (
        <Form className={styles.formContainer}>

        </Form>
    );
};

export default memo(UserForm);
