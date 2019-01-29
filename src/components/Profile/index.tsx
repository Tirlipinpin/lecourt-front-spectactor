import React, { Component } from 'react';
import { connect } from 'react-redux';

export class Profile extends Component<{}, {}> {
    render() {
        return (
            <div>Profile page</div>
        );
    }
}

export default connect()(Profile);
