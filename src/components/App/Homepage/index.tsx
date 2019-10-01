import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Carousel, Layout, Typography } from 'antd';
import { RouteComponentProps } from 'react-router';
import { Trans } from 'react-i18next';

import { FETCH_LATEST_MOVIES } from '../../../reducers/homepage/constants';
import MoviesGallery from '../shared/MoviesGallery';
import './index.css';
import { HomepageStore } from '../../../reducers/homepage';


export interface HomepageProps extends RouteComponentProps {
    dispatch: Dispatch<any>
    homepage: HomepageStore
}


export class Homepage extends Component<HomepageProps, {}> {
    async componentDidMount() {
        const { dispatch } = this.props;

        dispatch({
            type: FETCH_LATEST_MOVIES,
        });

        dispatch({
            type: FETCH_LATEST_MOVIES,
        });
    }

    render() {
        const { history, homepage } = this.props;

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
    }
};

export default connect(({ homepage }: any) => ({
    homepage,
}))(Homepage);
