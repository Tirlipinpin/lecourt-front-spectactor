import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Homepage extends Component<{}, {}> {
    render() {
        return (
            <div>This is the Homepage</div>
        );
    }
};

export default connect()(Homepage);
