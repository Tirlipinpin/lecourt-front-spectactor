import React, { FunctionComponent, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import UserIdentity from './components/UserIdentity';
import UserForm from './components/UserForm';
import { fetchUserProfile } from './actions';
import styles from './index.module.scss';

export interface IProfileProps {}

export const Profile: FunctionComponent<IProfileProps> = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, [dispatch]);

    const { t } = useTranslation();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                {t('WELCOME_TO_PROFILE')}
            </div>
            <div className={styles.pageContent}>
                <UserIdentity />
                <UserForm />
            </div>
        </div>
    );
};

export default Profile;
