import React, { FunctionComponent } from 'react';
import styles from './index.module.scss';

export interface IUserFormLoadingProps {}

export const UserFormLoading: FunctionComponent<IUserFormLoadingProps> = () => {
    return (
        <div className={styles.loadingFormContainer}>
            <div className={styles.randomField} />
            <div className={styles.fullNameContainer}>
                <div className={styles.nameField} />
                <div className={styles.nameField} />
            </div>
            <div className={styles.password} />
            <div className={styles.password} />
        </div>
    );
};

export default UserFormLoading;
