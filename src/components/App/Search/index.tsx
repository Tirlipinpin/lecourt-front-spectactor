import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';
import { NavbarStore } from '../../../reducers/navbar';

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
            <div>
                You searched for { searchTerm }
            </div>
        );
    }
}

export default connect(({ navbar }: any) =>({
    navbar,
}))(Search);
