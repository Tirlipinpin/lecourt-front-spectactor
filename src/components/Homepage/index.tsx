import React, { Component, Dispatch } from 'react';
import { connect } from 'react-redux';

interface homepageStore {
    page: string,
}

interface HomepageProps {
    homepage: homepageStore,
    dispatch: Dispatch<any>,
};

export class Homepage extends Component<HomepageProps, {}> {
    fetchToken = () => {
        const { dispatch } = this.props;

        dispatch({
            type: 'FETCH_TOKEN',
            payload: {
                email: 'hgaudeaux@hotmail.fr',
                password: 'chapeau',
            },
        });
    }

    render() {
        const { homepage } = this.props;

        return (
            <div>
                This is the { homepage.page }
                <button onClick={ this.fetchToken }>Ici</button>
            </div>
        );
    }
};

function mapDispatchToProps({ homepage }: any) {
    return { homepage };
}

export default connect(mapDispatchToProps)(Homepage);
