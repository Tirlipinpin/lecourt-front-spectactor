import React, { Component, Dispatch, ReactFragment } from 'react';
import { connect } from 'react-redux';
import { Layout, Icon, PageHeader, Typography } from 'antd';
import { History, Location } from 'history';

import { FETCH_SEARCH_MOVIES } from '../../../reducers/search/constantes';

import { SearchStore } from '../../../reducers/search';
import MoviesCarousel from '../shared/MoviesCarousel';
import './index.css';


export interface SearchProps {
    match: any,
    history: History,
    location: Location,
    dispatch: Dispatch<any>,
    search: SearchStore,
};

export class Search extends Component<SearchProps, {}> {
    async componentDidMount() {
        const { dispatch, match } = this.props;
        const { term } = match.params;

        dispatch({
            type: FETCH_SEARCH_MOVIES,
            payload: {
                term,
            },
        });
    }

    renderPageHeader = (Header: JSX.Element, Child: JSX.Element | null) => (
        <Layout className="page-container search-page-container">
            <PageHeader className="search-page-header" title={`You searched for ${this.props.match.params.term}`}>
                {Header}
            </PageHeader>
            <div className="search-page-content">
                {Child}
            </div>
        </Layout>
    );

    render() {
        const { history, search } = this.props;

        if (search.loading) {
            return this.renderPageHeader(
                <React.Fragment>
                    <Icon type="loading" />
                </React.Fragment>,
                null,
            );
        }

        if (!search.loading && search.movies.length < 1) {
            return this.renderPageHeader(
                <React.Fragment>
                    <Typography.Paragraph>
                        No content found
                    </Typography.Paragraph>
                </React.Fragment>,
                null,
            );
        }

        return this.renderPageHeader(
            <React.Fragment>
                <Typography.Paragraph>
                    Results: {search.movies.length}
                </Typography.Paragraph>
            </React.Fragment>,
            <MoviesCarousel movies={search.movies} history={history} />
        );
    }
}

export default connect(({ search }: any) =>({
    search,
}))(Search);
