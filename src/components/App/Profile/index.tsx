import React, { FunctionComponent, memo, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { IProfileStore } from 'reducers/profile';
import UserIdentity from './components/UserIdentity';
import { fetchUserProfile } from './actions';
import styles from './index.module.scss';

export interface IProfileProps {}

export const Profile: FunctionComponent<IProfileProps> = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchUserProfile());
    }, []);

    const profile: IProfileStore = useSelector((state: any) => state.profile);

    const { t } = useTranslation();

    return (
        <div className={styles.pageContainer}>
            <div className={styles.pageHeader}>
                {t('WELCOME_TO_PROFILE')}
            </div>
            <div className={styles.pageContent}>
                <UserIdentity
                    avatarUrl={profile.avatarUrl}
                    displayName={profile.displayName}
                    firstName={profile.firstName}
                    lastName={profile.lastName}
                    loading={profile.loading}
                />
            </div>
        </div>
    );
};

export default memo(Profile);
