import React, { FunctionComponent } from 'react';
import { Movie } from 'components/App/interfaces';
import { PlayCircleFilled } from '@ant-design/icons';
import moment from 'moment';
import styles from './index.module.scss';

export interface ICoverContentProps {
    movie: Movie
}

export const CoverContent: FunctionComponent<ICoverContentProps> = (props) => {
    const { movie } = props;
    const duration = moment.duration(movie.duration, 'seconds');

    return (
        <div className={styles.coverContent}>
            <div className={styles.durationContainer}>
                {duration.hours() ? `${duration.hours()}h` : ''}
                {duration.minutes() ? `${duration.minutes()}mn` : ''}
                {duration.seconds() ? `${duration.seconds()}s` : ''}
                {movie.duration === 0 ? '1mn' : ''}
            </div>
            <p className={styles.summary}>{movie.summary}</p>
            <div className={styles.playButtonContainer}><PlayCircleFilled className={styles.playButton} /></div>
        </div>
    );
};

export default CoverContent;
