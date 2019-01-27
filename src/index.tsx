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
import Register from './components/Register';

axios.defaults.baseURL = 'http://sso.stg.lecourt.tv/';

ReactDOM.render(
    <Provider store={ configureStore() }>
        <ConnectedRouter history={ history}>
            <Switch>
                <Route exact path="/" render={ () => <Homepage /> } />
                <Route path="/login" render={ () => <Login /> } />
                <Route path="/register" render={ () => <Register /> } />
            </Switch>
        </ConnectedRouter>
    </Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
