import React, { Component } from 'react';
import { connect } from 'react-redux';

interface homepageStore {
    page: string,
}

interface HomepageProps {
    homepage: homepageStore,
};

class Homepage extends Component<HomepageProps, {}> {
    render() {
        const { homepage } = this.props;

        return (
            <div>
                This is the { homepage.page }
            </div>
        );
    }
};

function mapDispatchToProps({ homepage }: any) {
    return { homepage };
}

export default connect(mapDispatchToProps)(Homepage);
