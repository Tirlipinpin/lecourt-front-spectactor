import React, { FunctionComponent } from 'react';
import styles from './index.module.scss';

export interface IUserFormLoadingProps {}

export const UserFormLoading: FunctionComponent<IUserFormLoadingProps> = () => {
    return (
        <div className={styles.loadingFormContainer}>
            <div className={styles.fieldContainer}>
                <div className={styles.fieldLabel} />
                <div className={styles.randomField} />
            </div>
            <div className={styles.fieldContainer}>
                <div className={styles.fieldLabel} />
                <div className={styles.randomField} />
            </div>
            <div className={styles.fullNameContainer}>
                <div className={styles.fieldContainer}>
                    <div className={styles.fieldLabel} />
                    <div className={styles.nameField} />
                </div>
                <div className={styles.fieldContainer}>
                    <div className={styles.fieldLabel} />
                    <div className={styles.nameField} />
                </div>
            </div>
            <div className={styles.submitButton} />
        </div>
    );
};

export default UserFormLoading;
