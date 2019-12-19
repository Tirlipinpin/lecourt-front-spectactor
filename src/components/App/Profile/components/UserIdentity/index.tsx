import React, { FunctionComponent, memo } from 'react';
import { useSelector } from 'react-redux';
import posed from 'react-pose';
import { IProfileStore } from 'reducers/profile';
import defaultAvatar from './assets/avatar.jpg';
import styles from './index.module.scss';

export interface IUserIdentityProps {}

const Container = posed.div({
    enter: {
        opacity: 1,
        x: 0,
    },
    exit: {
        opacity: 0,
        x: 100,
    },
});

export const UserIdentity: FunctionComponent<IUserIdentityProps> = () => {
    const {
      avatarUrl,
      displayName,
      firstName,
      lastName,
      loading,
    }: IProfileStore = useSelector((state: any) => ({
      avatarUrl: state.profile.avatarUrl,
      displayName: state.profile.displayName,
      firstName: state.profile.firstName,
      lastName: state.profile.lastName,
      loading: state.profile.loading,
    }));

    if (loading) {
        return (
            <Container className={styles.loadingContainer}>
                <div className={styles.loadingAvatar} />
                <div className={styles.loadingDisplayName} />
            </Container>
        );
    }

    return (
        <Container className={styles.container}>
            <img
                alt={`${displayName} avatar`}
                className={styles.avatar}
                src={avatarUrl || defaultAvatar}
            />
            <div className={styles.displayName}>
                {displayName || `${firstName} ${lastName}`}
            </div>
        </Container>
    );
};

export default memo(UserIdentity);
