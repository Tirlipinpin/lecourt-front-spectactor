import React, { lazy } from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';

import { lazyRenderer } from 'services/renderer/lazyRenderer';
import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import './i18n';
import './index.scss';

const LoginFromExternal = lazy(() => import('./components/LoginFromExternal'));
const App = lazy(() => import('./components/App'));
const NotFound = lazy(() => import('./components/NotFound'));
const Authentication = lazy(() => import('./components/Authentication'));

localStorage.setItem('i18nextLng', 'fr');

const { store, persistor } = configureStore();

ReactDOM.render(
    <Provider store={ store }>
        <PersistGate
            loading={<div>Loading...</div>}
            persistor={persistor}
        >
            <ConnectedRouter history={history}>
                <Switch>
                    <Redirect to="/app" from="/" exact />
                    <Route path="/app" render={props => lazyRenderer(App, props)} />
                    <Route path="/authentication" render={props => lazyRenderer(Authentication, props)} />
                    <Route path="/loginFromExternal" render={props => lazyRenderer(LoginFromExternal, props)} />
                    <Route render={props => lazyRenderer(NotFound, { ...props, title: 'Page not found !' })} />
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
