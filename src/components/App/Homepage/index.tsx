import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Typography } from 'antd';
import { RouteComponentProps } from 'react-router';
import { useTranslation } from 'react-i18next';

import MoviesGallery from '../../shared/MoviesGallery';
import { fetchLatestMovies } from './actions';
import styles from './index.module.scss';

export interface IHomepageProps extends RouteComponentProps {}

export const Homepage = ({ history }: IHomepageProps) => {
    const dispatch = useDispatch();
    const homepage = useSelector((state: any) => state.homepage);
    const { t } = useTranslation();

    useEffect(() => {
        dispatch(fetchLatestMovies());
    }, []);

  return (
    <div className={styles.pageContainer}>
      <Layout className={styles.moviesCarousel}>
          <Typography.Title
            level={3}
            children={t('OUR_SELECTION')}
            className={styles.sectionTitle}
          />
          <MoviesGallery
            loading={homepage.loadingLatestMovies}
            movies={homepage.latestMovies}
            history={history}
          />
      </Layout>
      <Layout className={styles.moviesCarousel}>
      <Typography.Title
            level={3}
            children={t('LATEST_SHORTS')}
            className={styles.sectionTitle}
          />
          <MoviesGallery loading={homepage.loadingLatestMovies} movies={homepage.latestMovies} history={history} />
      </Layout>
    </div>
  );
};

export default Homepage;
