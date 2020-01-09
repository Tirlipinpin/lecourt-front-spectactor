import React, { FunctionComponent, memo, useState, FormEvent } from 'react';
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
    }: IProfileStore = useSelector((state: any) => ({
        displayName: state.profile.displayName,
        email: state.profile.email,
        loading: state.profile.loading,
        firstName: state.profile.firstName,
        lastName: state.profile.lastName,
    }), shallowEqual);
    
    const [form, updateForm] = useState({
      email,
      displayName,
      firstName,
      lastName,
    });

    const { t } = useTranslation();
    const dispatch = useDispatch();

    const onSubmit = (e: FormEvent) => {
      e.preventDefault();
      dispatch(updateUserProfile(form));
    }

    const updateField = (event: any) => {
        const { target } = event;
        const { value } = target as HTMLInputElement;
        const fieldName = target.getAttribute('form-field');

        updateForm({
            ...form,
            [fieldName]: value,
        });
    };

    if (loading)
        return <UserFormLoading />;

    return (
        <Form className={styles.formContainer} onSubmit={onSubmit}>
            <Item label={t('EMAIL_ADDRESS')}>
                <Input onChange={updateField} value={form.email} form-field='email' />
            </Item>
            <Item label={t('DISPLAY_NAME')}>
                <Input onChange={updateField} value={form.displayName} form-field='displayName' />
            </Item>
          <div className={styles.fullNameContainer}>
                <Item
                    className={styles.nameField}
                    label={t('FIRST_NAME')}
                >
                    <Input onChange={updateField} form-field='firstName' />
                </Item>
                <Item
                    className={styles.nameField}
                    label={t('LAST_NAME')}
                >
                    <Input onChange={updateField} form-field='lastName' />
                </Item>
          </div>
          <Button className={styles.submitButton} htmlType="submit" type="primary">{t('SUBMIT')}</Button>
        </Form>
    );
};

export default memo(UserForm);
