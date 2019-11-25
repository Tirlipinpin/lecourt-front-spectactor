import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import Cookies from 'js-cookie';
import qs from 'query-string';
import Loader from 'components/shared/Loader';

export interface ILoginFromExternal extends RouteComponentProps {}

export class LoginFromExternal extends Component<ILoginFromExternal> {
  componentDidMount() {
    const { history, location: { search } } = this.props;
    const { expires_in, token } = qs.parse(search);

    if (expires_in && token && typeof token === 'string') {
        Cookies.set('user_authorization', token, {
            expires: +expires_in,
        });
    } else if (token && typeof token === 'string') {
        Cookies.set('user_authorization', token);
    }

    history.push('/app');
  }

  render() {
    return (
      <Loader />
    );
  }
}

export default LoginFromExternal;
