import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
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

    render() {
        const { history, search } = this.props;
        const { term } = this.props.match.params;

        if (!search.loading && search.movies.length < 1) {
            return (
                <Layout className="page-container search-page-container">
                    <h1 className="no-content">No content found</h1>
                </Layout>
            );
        }

        return (
            <Layout className="page-container search-page-container">
                <h1>You searched for { term }</h1>
                <MoviesCarousel movies={search.movies} history={history} />
            </Layout>
        );
    }
}

export default connect(({ search }: any) =>({
    search,
}))(Search);
