import React, { FunctionComponent, memo, useState, FormEvent, useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Form, Input } from 'antd';
import { useTranslation } from 'react-i18next';
import { IProfileStore, IProfile } from 'reducers/profile';
import UserFormLoading from './components/UserFormLoading';
import { updateUserProfile } from './actions';
import styles from './index.module.scss';

const { Item } = Form;

export interface IUserFormProps {}

export interface IUserFormState {
    displayName?: string
    email?: string
    firstName?: string
    lastName?: string
}

export const UserForm: FunctionComponent<IUserFormProps> = () => {
    const profileStore: IProfileStore = useSelector((state: any) => state.profile);
    const [form, updateForm] = useState<IUserFormState>({
        displayName: '',
        email: '',
        firstName: '',
        lastName: '',
    });

    useEffect(() => {
        const { email, profile } = profileStore;

        updateForm({
          displayName: profile?.displayName,
          email,
          firstName: profile?.firstName,
          lastName: profile?.lastName,
        });
    }, [profileStore]);

    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { loading, updatingUser } = profileStore;

    const onFinish = () => {
      dispatch(updateUserProfile({
          ...profileStore,
          profile: {
              ...profileStore.profile,
              ...form,
          } as IProfile,
      }));
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
        <Form className={styles.formContainer} onFinish={onFinish} layout="vertical">
            {loading ? <UserFormLoading /> : renderForm()}
        </Form>
    );
};

export default memo(UserForm);
