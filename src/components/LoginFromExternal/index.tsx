import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';

export interface ILoginFromExternal extends RouteComponentProps {}

export class LoginFromExternal extends Component<ILoginFromExternal> {
  componentDidMount() {
    const { history } = this.props;

    history.push('/app');
  }

  render() {
    return (
      <div>Logging you</div>
    );
  }
}

export default LoginFromExternal;
