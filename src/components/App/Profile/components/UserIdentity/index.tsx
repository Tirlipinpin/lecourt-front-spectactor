import React, { FunctionComponent } from 'react';
import posed from 'react-pose';
import styles from './index.module.scss';

export interface IUserIdentityProps {
    avatarUrl?: string
    displayName?: string
    firstName?: string
    lastName?: string
    loading: boolean
}

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

export const UserIdentity: FunctionComponent<IUserIdentityProps> = ({
    avatarUrl,
    displayName,
    firstName,
    lastName,
    loading,
}) => {
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
                src={avatarUrl}
            />
            <div className={styles.displayName}>
                {displayName || `${firstName} ${lastName}`}
            </div>
        </Container>
    );
};

export default UserIdentity;
