import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Icon, Typography } from 'antd';
import { RouteComponentProps } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';

import { SearchStore } from '../../../reducers/search';
import MoviesGallery from '../shared/MoviesGallery';
import './index.css';
import { RenderPageStructures } from '../services';
import { fetchSearchMovies } from './actions';

export type SearchPropsParams = {
    term: string
}

export interface SearchProps extends WithTranslation, RouteComponentProps<SearchPropsParams> {
    dispatch: Dispatch<any>
    search: SearchStore
    t?: any
}

export class Search extends Component<SearchProps, {}> {
    async componentDidMount() {
        const { dispatch, match } = this.props;
        const { term } = match.params;

        dispatch(fetchSearchMovies(term));
    }

    render() {
        const { history, search } = this.props;

        if (search.loading) {
            return <RenderPageStructures
                Header={(
                    <React.Fragment>
                        <Icon type="loading" />
                    </React.Fragment>
                )}
                title={`${this.props.t('YOU_SEARCHED_FOR')} ${this.props.match.params.term}`}
                pageContainerClass="search-page-container"
                pageHeaderClass="search-page-header"
                pageContentClass="search-page-content"
            />;
        }

        if (!search.loading && search.movies.length < 1) {
            return <RenderPageStructures
                Header={(
                    <React.Fragment>
                        <Typography.Paragraph>
                            No content found
                        </Typography.Paragraph>
                    </React.Fragment>
                )}
                title={`${this.props.t('YOU_SEARCHED_FOR')} ${this.props.match.params.term}`}
                pageContainerClass="search-page-container"
                pageHeaderClass="search-page-header"
                pageContentClass="search-page-content"
            />;
        }

        return <RenderPageStructures
            Header={(
                <React.Fragment>
                    <Typography.Paragraph>
                        Results: {search.movies.length}
                    </Typography.Paragraph>
                </React.Fragment>
            )}
            Child={(
                <MoviesGallery movies={search.movies} history={history} />
            )}
            title={`${this.props.t('YOU_SEARCHED_FOR')} ${this.props.match.params.term}`}
            pageContainerClass="search-page-container"
            pageHeaderClass="search-page-header"
            pageContentClass="search-page-content"
        />;
    }
}

export default connect(({ search }: any) =>({
    search,
}))(withTranslation()(Search));
