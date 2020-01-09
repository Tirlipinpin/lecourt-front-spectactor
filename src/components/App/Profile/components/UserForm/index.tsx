import React, { FunctionComponent, memo, useState, FormEvent, useEffect, Fragment } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { IProfileStore } from 'reducers/profile';
import UserFormLoading from './components/UserFormLoading';
import { updateUserProfile } from './actions';
import styles from './index.module.scss';

const { Item } = Form;

export interface IUserFormProps {}

export const UserForm: FunctionComponent<IUserFormProps> = () => {
    const {
        displayName,
        email,
        loading,
        firstName,
        lastName,
        updatingUser,
    }: IProfileStore = useSelector((state: any) => ({
          displayName: state.profile.displayName,
          email: state.profile.email,
          loading: state.profile.loading,
          firstName: state.profile.firstName,
          lastName: state.profile.lastName,
          updatingUser: state.profile.updatingUser,
        }), shallowEqual);
    
    const [form, updateForm] = useState({
        displayName,
        email,
        firstName,
        lastName,
    });

    useEffect(() => {
        updateForm({
          displayName,
          email,
          firstName,
          lastName,
        });
    }, [displayName, email, firstName, lastName]);

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      dispatch(updateUserProfile(form));
    };

    const updateField = (event: any) => {
        const { target } = event;
        const { value } = target as HTMLInputElement;
        const fieldName = target.getAttribute('form-field');

        updateForm({
            ...form,
            [fieldName]: value,
        });
    };

    const renderForm = () => (
        <Fragment>
            <Item colon={false} className={styles.formItem} label={t('EMAIL_ADDRESS')}>
                <Input className={styles.inputField} disabled={updatingUser} onChange={updateField} value={form.email} form-field='email' />
            </Item>
            <Item colon={false} className={styles.formItem} label={t('DISPLAY_NAME')}>
                <Input className={styles.inputField} disabled={updatingUser} onChange={updateField} value={form.displayName} form-field='displayName' />
            </Item>
            <Item colon={false} className={styles.formItem} label={t('FIRST_NAME')}>
                <Input className={styles.inputField} disabled={updatingUser} onChange={updateField} value={form.firstName} form-field='firstName' />
            </Item>
            <Item colon={false} className={styles.formItem} label={t('LAST_NAME')}>
                <Input className={styles.inputField} disabled={updatingUser} onChange={updateField} value={form.lastName} form-field='lastName' />
            </Item>
            <Button className={styles.submitButton} htmlType="submit" loading={updatingUser} type="primary">{t('SUBMIT')}</Button>
        </Fragment>
    );

    return (
        <Form className={styles.formContainer} onSubmit={onSubmit}>
            {loading ? <UserFormLoading /> : renderForm()}
        </Form>
    );
};

export default memo(UserForm);
