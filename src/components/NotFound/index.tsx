import React, { PureComponent } from 'react';
import { Layout } from 'antd';

import './index.css';

export default class NotFound extends PureComponent<{}, {}> {
    render() {
        return (
            <Layout className="notfound-page-container">
                <h1>404</h1>
                <h2>Page not found !</h2>
            </Layout>
        );
    }
}
