import React, { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';
import { Genre } from '../../../interfaces';
import styles from './index.module.scss';

export interface IGenreCardProps {
    genre: Genre
    historyPush: (route: string) => void
}

export const GenreCard: FunctionComponent<IGenreCardProps> = ({ genre, historyPush }) => {
    const redirectToGenre = () => {
        historyPush(`/app/genres/${genre.id}`);
    };

    const { t } = useTranslation();

    return (
        <div
            key={genre.id}
            className={styles.genreCard}
            onClick={redirectToGenre}
        >{t(genre.code)}</div>
    );
};
