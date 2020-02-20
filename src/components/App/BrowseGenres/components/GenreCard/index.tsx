import React, { FunctionComponent } from 'react';
import { Card } from 'antd';

import { Genre } from '../../../interfaces';
import styles from './index.module.scss';

const { Meta } = Card;

export interface IGenreCardProps {
    genre: Genre
    historyPush: (route: string) => void
}

export const GenreCard: FunctionComponent<IGenreCardProps> = ({ genre, historyPush }) => {
    const redirectToGenre = () => {
        historyPush(`/app/genres/${genre.id}`);
    };

    return (
        <Card
            key={genre.id}
            className={styles.genreCard}
            hoverable
            onClick={redirectToGenre}
        >
            <Meta
                title={genre.code}
            />
        </Card>
    );
};
