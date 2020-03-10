import React, { FunctionComponent } from 'react';
import { Tooltip } from 'antd';
import { InfoCircleOutlined, PlayCircleFilled } from '@ant-design/icons';
import moment from 'moment';
import { Movie } from 'components/App/interfaces';
import styles from './index.module.scss';

export interface ICoverContentProps {
    movie: Movie
}

export const CoverContent: FunctionComponent<ICoverContentProps> = (props) => {
    const { movie } = props;
    const duration = moment.duration(movie.duration, 'seconds');

    return (
        <div className={styles.coverContent}>
            <div className={styles.topContent}>
                <div className={styles.infoTooltip}>
                    <Tooltip placement="bottomLeft" title={movie.summary} trigger="hover">
                        <InfoCircleOutlined />
                    </Tooltip>
                </div>
                <div className={styles.durationContainer}>
                    {duration.hours() ? `${duration.hours()}h` : ''}
                    {duration.minutes() ? `${duration.minutes()}mn` : ''}
                    {duration.seconds() ? `${duration.seconds()}s` : ''}
                    {movie.duration === 0 ? '1mn' : ''}
                </div>
            </div>
            <div className={styles.playButtonContainer}><PlayCircleFilled className={styles.playButton} /></div>
        </div>
    );
};

export default CoverContent;
