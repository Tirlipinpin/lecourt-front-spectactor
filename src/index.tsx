import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Redirect } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
// @ts-ignore
import { PersistGate } from 'redux-persist/es/integration/react';

import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import './index.css';
import App from './components/App';
import NotFound from './components/NotFound';
import Authentication from './components/Authentication';
import './i18n';

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
                    <Route path="/app" component={App} />
                    <Route path="/authentication" component={Authentication} />
                    <Route component={() => <NotFound title="Page not found !" />} />
                </Switch>
            </ConnectedRouter>
        </PersistGate>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
