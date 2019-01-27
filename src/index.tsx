import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch } from 'react-router';
import { ConnectedRouter } from 'connected-react-router'
import { Provider } from 'react-redux';
import axios from 'axios';

import * as serviceWorker from './serviceWorker';
import configureStore, { history } from './store';
import './index.css';
import Homepage from './components/Homepage';
import Login from './components/Login';

axios.defaults.baseURL = 'http://51.75.133.45:8080/';

ReactDOM.render(
    <Provider store={ configureStore() }>
        <ConnectedRouter history={ history}>
            <Switch>
                <Route exact path="/" render={ () => <Homepage /> } />
                <Route path="/login" render={ () => <Login /> } />
            </Switch>
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
