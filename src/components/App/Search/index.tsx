import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';
import axios from 'axios';
import { History, Location } from 'history';
import { match } from 'react-router';

import MoviesCarousel from '../shared/MoviesCarousel';
import './index.css';

import { NavbarStore } from '../../../reducers/navbar';
import { Movie } from '../interfaces';

export interface SearchProps {
    match: match,
    history: History,
    location: Location,
    dispatch: Dispatch<any>,
    navbar: NavbarStore,
};

export interface SearchState {
    movies: Movie[],
};

export class Search extends Component<SearchProps, SearchState> {
    state: Readonly<SearchState> = {
        movies: [],
    }

    async componentDidMount() {
        const { searchTerm } = this.props.navbar;

        const res = await axios.get('movies/search', {
            params: {
                limit: 20,
                page: 1,
                words: searchTerm,
            }
        });

        if (res && res.status === 200)
            this.setState({ movies: res.data });
    }

    render() {
        const { navbar, history } = this.props;
        const { searchTerm } = navbar;
        const { movies } = this.state;

        return (
            <Layout className="page-container search-page-container">
                <h1>You searched for { searchTerm }</h1>
                <MoviesCarousel movies={movies} history={history} />
            </Layout>
        );
    }
}

export default connect(({ navbar }: any) =>({
    navbar,
}))(Search);
