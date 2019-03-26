import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import './index.css';

export interface NotFoundProps {
    title: string
};

export default class NotFound extends PureComponent<NotFoundProps, {}> {
    render() {
        const { title } = this.props;

        return (
            <Layout className="notfound-page-container">
                <h1>404</h1>
                <h2>
                    {title}
                </h2>
            </Layout>
        );
    }
}
