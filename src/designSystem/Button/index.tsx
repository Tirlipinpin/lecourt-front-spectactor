import React, { FunctionComponent, MouseEvent, Children } from 'react';

import styles from './index.module.scss';

export interface IButtonProps {
    disabled?: boolean
    onClick?: (e: MouseEvent) => void
}

export const Button: FunctionComponent<IButtonProps> = ({ children, disabled, onClick }) => (
    <button
        disabled={disabled}
        onClick={onClick}
        className={styles.button}
    >
        {children}
    </button>
);

export default Button;
