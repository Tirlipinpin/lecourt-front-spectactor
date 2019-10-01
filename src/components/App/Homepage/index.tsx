import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Layout, Typography, Card } from 'antd';
import { RouteComponentProps } from 'react-router';
import { Trans } from 'react-i18next';

import MoviesGallery from '../shared/MoviesGallery';
import './index.css';
import { fetchLatestMovies } from './actions';

export interface IHomepageProps extends RouteComponentProps {}

export const Homepage = ({ history }: IHomepageProps) => {
    const dispatch = useDispatch();
    const homepage = useSelector((state: any) => state.homepage);

    useEffect(() => {
        dispatch(fetchLatestMovies());
    }, []);

    return (
        <Layout className="page-container">
            <Layout className="movies-carousel">
                <Typography.Title level={2}><Trans i18nKey="OUR_SELECTION" /></Typography.Title>
                <MoviesGallery movies={homepage.latestMovies} history={history} />
            </Layout>
            <Layout className="movies-carousel">
                <Typography.Title level={2}><Trans i18nKey="LATEST_SHORTS" /></Typography.Title>
                <MoviesGallery movies={homepage.latestMovies} history={history} />
            </Layout>
        </Layout>
    );
};

export default Homepage;
