import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { NavbarStore } from '../../../reducers/navbar';
import { Layout } from 'antd';

import './index.css';

interface SearchProps {
    match: any,
    history: any,
    dispatch: Dispatch<any>,
    location: any,
    navbar: NavbarStore,
};

export class Search extends Component<SearchProps, {}> {
    render() {
        const { navbar } = this.props;
        const { searchTerm } = navbar;

        return (
            <Layout className="search-page-container">
                You searched for { searchTerm }
            </Layout>
        );
    }
}

export default connect(({ navbar }: any) =>({
    navbar,
}))(Search);
