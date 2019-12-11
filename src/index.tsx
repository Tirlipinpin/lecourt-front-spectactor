import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import Cookies from 'js-cookie';
import { lazyRenderer } from 'services/renderer/lazyRenderer';
import { restoreToken } from 'actions';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import './i18n';
import styles from './index.module.scss';
import './index.scss';

const LoginFromExternal = lazy(() => import('./components/LoginFromExternal'));
const App = lazy(() => import('./components/App'));
const NotFound = lazy(() => import('./components/NotFound'));
const Authentication = lazy(() => import('./components/Authentication'));

localStorage.setItem('i18nextLng', 'fr');

const { store } = configureStore();

const user_authorization = Cookies.get('user_authorization');

if (user_authorization)
    store.dispatch(restoreToken(user_authorization));

ReactDOM.render(
    <Provider store={ store }>
        <ConnectedRouter history={history}>
            <div className={styles.appContainer}>
                <Switch>
                    <Redirect to="/app" from="/" exact />
                    <Route path="/app" render={props => lazyRenderer(App, props, styles.loader)} />
                    <Route path="/authentication" render={props => lazyRenderer(Authentication, props, styles.loader)} />
                    <Route path="/loginFromExternal" render={props => lazyRenderer(LoginFromExternal, props, styles.loader)} />
                    <Route render={props => lazyRenderer(NotFound, { ...props, title: 'Page not found !' })} />
                </Switch>
            </div>
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));    


// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
