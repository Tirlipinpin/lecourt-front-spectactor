import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Typography } from 'antd';
import { RouteComponentProps } from 'react-router';
import { withTranslation, WithTranslation } from 'react-i18next';
import { Loader } from 'designSystem';
import { SearchStore } from '../../../reducers/search';
import { MoviesGallery } from 'designSystem';
import { RenderPageStructures } from '../services';
import { fetchSearchMovies } from './actions';
import styles from './index.module.scss';

export type SearchPropsParams = {
    term: string
}

export interface SearchProps extends WithTranslation, RouteComponentProps<SearchPropsParams> {
    dispatch: Dispatch<any>
    search: SearchStore
    t: any
}

export class Search extends Component<SearchProps, {}> {
    componentDidMount() {
        this.dispatchFetchSearchMovies();
    }

    componentDidUpdate(props: SearchProps) {
        const { params: { term } } = this.props.match;
        const { params: { term: nextTerm } } = props.match;

        if (term !== nextTerm)
            this.dispatchFetchSearchMovies();
    }

    dispatchFetchSearchMovies = () => {
        const { dispatch, match } = this.props;
        const { term } = match.params;

        dispatch(fetchSearchMovies(term));
    }

    render() {
        const { history, search } = this.props;
        const { loading, movies } = search;

        if (loading) {
            return <RenderPageStructures
                Header={(
                    <Loader />
                )}
                title={`${this.props.t('YOU_SEARCHED_FOR')} ${this.props.match.params.term}`}
                Child={(
                  <MoviesGallery movies={[]} history={history} loading={loading} />
                )}
                pageContainerClass="search-page-container"
                pageHeaderClass="search-page-header"
                pageContentClass={styles.searchPageContent}
            />;
        }

        if (!loading && movies.length < 1) {
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
                pageContentClass={styles.searchPageContent}
            />;
        }

        return <RenderPageStructures
            Header={(
                <React.Fragment>
                    <Typography.Paragraph>
                        Results: {movies.length}
                    </Typography.Paragraph>
                </React.Fragment>
            )}
            Child={(
                <MoviesGallery movies={movies} history={history} />
            )}
            title={`${this.props.t('YOU_SEARCHED_FOR')} ${this.props.match.params.term}`}
            pageContainerClass="search-page-container"
            pageHeaderClass="search-page-header"
            pageContentClass={styles.searchPageContent}
        />;
    }
}

export default connect(({ search }: any) =>({
    search,
}))(withTranslation()(Search));
