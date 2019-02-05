import React, { Component } from 'react';
import { connect } from 'react-redux';
<<<<<<< HEAD
=======
import { Carousel, Layout } from 'antd';

import './index.css';
>>>>>>> fc0c7bf... :alembic: added  a carousel on homepage

export class Homepage extends Component<{}, {}> {
    render() {
        return (
            <div>This is the Homepage</div>
        );
    }
};

export default connect()(Homepage);
