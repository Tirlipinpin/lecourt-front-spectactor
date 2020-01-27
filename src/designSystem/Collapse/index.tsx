import React, { FunctionComponent, useState } from 'react';
import { Icon } from 'antd';
import styles from './index.module.scss';

export interface ICollapseProps {
    title: string
}

export const Collapse: FunctionComponent<ICollapseProps> = (props) => {
    const [isCollapsed, handleIsCollapsed] = useState(true);

    return (
        <div className={styles.collapseContainer}>
            <div
                className={styles.title}
                onClick={() => handleIsCollapsed(!isCollapsed)}
            >
                <Icon
                    className={`${styles.icon} ${isCollapsed ? styles.collapsedIcon : ''}`}
                    type="down"
                />
                {props.title}
            </div>
            <div
                className={`${styles.childrenContainer} ${isCollapsed ? styles.collapsedChildrenContainer : ''}`}
            >{props.children}</div>
        </div>
    );
};

export default Collapse;
