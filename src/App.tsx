import React from 'react';
import { Route } from 'react-router';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';
import Profile from './components/Profile';

import './App.css';

const App = ({ match, history }: any) => (
    <div className="app-wrapper">
        <Navbar match={match} history={history} />
        <div className="app-container">
            <Route exact path={match.url} component={Homepage} />
            <Route path={`${match.path}/profile`} component={Profile} />
        </div>
    </div>
);

export default App;
