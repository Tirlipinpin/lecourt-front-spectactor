import React, { FunctionComponent, memo } from 'react';
import { useSelector } from 'react-redux';
import posed from 'react-pose';
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
    const profileStore = useSelector((state: any) => state.profile);

    if (profileStore.loading) return (
      <Container className={styles.container}>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingAvatar} />
          <div className={styles.loadingDisplayName} />
        </div>
      </Container>
    );

    const { profile: { avatarUrl, firstName, lastName, displayName } } = profileStore;

    return (
        <Container className={styles.container}>
            <img
                alt={`${displayName} avatar`}
                className={styles.avatar}
                src={avatarUrl || defaultAvatar}
            />
            <div className={styles.name}>
                <div className={styles.fullName}>
                    {firstName} {lastName}
                </div>
                <div className={styles.displayName}>
                    {displayName}
                </div>
            </div>
        </Container>
    );
};

export default memo(UserIdentity);
