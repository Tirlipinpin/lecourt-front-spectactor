import React, { Component } from 'react';
import { RouteComponentProps } from 'react-router';
import cookie from 'cookie';
import qs from 'query-string';
import Loader from 'components/shared/Loader';

export interface ILoginFromExternal extends RouteComponentProps {}

export class LoginFromExternal extends Component<ILoginFromExternal> {
  componentDidMount() {
    const { history, location: { search } } = this.props;
    const { expires_in, token } = qs.parse(search);

    let tokenCookie: string = '';

    if (expires_in && token && typeof token === 'string') {
        tokenCookie = cookie.serialize('token', token, {
            expires: new Date(+expires_in),
            secure: true,
        });
    } else if (token && typeof token === 'string') {
        tokenCookie = cookie.serialize('token', token, {
            secure: true,
        });
    }

    document.cookie = `${document.cookie};${tokenCookie}`;
    console.log(document.cookie, tokenCookie);

    history.push('/app');
  }

  render() {
    return (
      <Loader />
    );
  }
}

export default LoginFromExternal;
