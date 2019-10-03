import React, { useEffect, Fragment } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Typography, Card } from 'antd';
import { RouteComponentProps } from 'react-router';
import { Trans, useTranslation } from 'react-i18next';

import MoviesGallery from '../shared/MoviesGallery';
import './index.css';
import { fetchLatestMovies } from './actions';
import { RenderPageStructures } from '../services';

export interface IHomepageProps extends RouteComponentProps {}

export const Homepage = ({ history }: IHomepageProps) => {
    const dispatch = useDispatch();
    const homepage = useSelector((state: any) => state.homepage);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchLatestMovies());
    }, []);

    const content = (
      <Fragment>
        <Layout className="movies-carousel">
            <Typography.Title level={2}><Trans i18nKey="OUR_SELECTION" /></Typography.Title>
            <MoviesGallery movies={homepage.latestMovies} history={history} />
        </Layout>
        <Layout className="movies-carousel">
            <Typography.Title level={2}><Trans i18nKey="LATEST_SHORTS" /></Typography.Title>
            <MoviesGallery movies={homepage.latestMovies} history={history} />
        </Layout>
      </Fragment>
  );

  return (
    <RenderPageStructures
      title={t('WELCOME_TO_LECOURT')}
      Header={(
        <React.Fragment>
            <Typography.Paragraph>
                {t('LOOK_AT_OUR_SHORTS')}
            </Typography.Paragraph>
        </React.Fragment>
    )}
    Child={content}
    />
  );   
};

export default Homepage;
