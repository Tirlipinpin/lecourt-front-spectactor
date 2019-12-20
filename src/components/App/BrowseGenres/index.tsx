import React, { FunctionComponent, memo, useEffect } from 'react';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Genre } from '../interfaces';
import { FETCH_GENRES } from '../../../reducers/browseGenres/constants';
import { RenderPageStructures } from '../services';
import { Loader } from 'designSystem';
import styles from './index.module.scss';
import { GenreCard } from './components/GenreCard';

export interface IBrowseGenresProps extends RouteComponentProps {}

export const BrowseGenres: FunctionComponent<IBrowseGenresProps> = ({ history }) => {
    const { genres, loading } = useSelector((state: any) => ({
        genres: state.browseGenres.genres,
        loading: state.browseGenres.loading,
    }));

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch({ type: FETCH_GENRES });
    }, [dispatch]);

    if (loading)
        return <Loader />;

    const genresCards = genres.map((genre: Genre) => (
        <GenreCard
            genre={genre}
            historyPush={history.push}
        />
    ));

    return (
      <RenderPageStructures
        title={t('BROWSE_OUR_GENRES')}
        Header={(
            <React.Fragment>
                <Typography.Paragraph>
                    {t('WE_HOPE_YOU_FIND_YOUR_PERFECT_MATCH')}
                </Typography.Paragraph>
            </React.Fragment>
        )}
        Child={genresCards}
        pageContentClass={styles.browseGenresPageContent}
      />
    );
};

export default memo(BrowseGenres);
