import { Card, Typography } from 'antd';
import React, { Fragment, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Genre } from '../interfaces';
import { FETCH_GENRES } from '../../../reducers/browseGenres/constants';
import './index.css';
import { RenderPageStructures } from '../services';
import { Loader } from '../shared/Loader';

const { Meta } = Card;

export interface IBrowseGenresProps extends RouteComponentProps {}

export default ({ history }: IBrowseGenresProps) => {
    const { genres, loading } = useSelector((state: any) => ({
        genres: state.browseGenres.genres,
        loading: state.browseGenres.loading,
    }));

    const dispatch = useDispatch();
    const { t } = useTranslation();

    useEffect(() => {
        dispatch({ type: FETCH_GENRES })
    }, []);

    if (loading)
        return <Loader />;

    const genresCards = genres.map((genre: Genre) => (
      <Card
        key={genre.id}
        className="genre-card"
        hoverable
        onClick={() => history.push(`/app/genres/${genre.id}`)}
      >
          <Meta
            title={
                <Fragment>
                    {genre.name}
                </Fragment>
            }
            className="genre-card-meta"
          />
      </Card>
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
        pageContentClass="browseGenres-page-content"
      />
    )
};
