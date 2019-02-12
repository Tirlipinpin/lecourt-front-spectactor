import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Layout } from 'antd';

import './index.css';

export interface WatchProps {
    location: any,
    history: any,
    match: any,
}

export class Watch extends Component<WatchProps, {}> {
    render() {
        const { match } = this.props;

        return (
            <Layout className="watch-page-container">
                Watch the short { match.params.id } !
            </Layout>
        );
    }
}

export default connect()(Watch);
