import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

interface LoginStore {
    logged: boolean,
};

interface AuthenticatedComponentProps {
    login: LoginStore,
    location: any,
    history: any,
    match: any,
};

interface ChildProps {
    location: any,
    history: any,
    match: any,
}

export default (Component: React.ComponentType<ChildProps>) => {
    class AuthenticatedComponent extends React.Component<AuthenticatedComponentProps, {}> {

        componentWillMount() {
            console.log(this.props);
            this.checkAuth();
        }

        checkAuth() {
            const { history } = this.props;

            if (!this.props.login.logged) {
                const location = this.props.location;

                history.push(`/login`);
            }
        }

        render() {
            const { match, history, location } = this.props;

            return this.props.login.logged
            ? <Component match={match} history={history} location={location} />
            : null;
        }
    };

    return connect(({ login }: any) => ({
        login
    }))(AuthenticatedComponent);
}
