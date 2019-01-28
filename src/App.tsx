import React from 'react';
import { Route } from 'react-router';

import Navbar from './components/Navbar';
import Homepage from './components/Homepage';

import './App.css';

const App = ({ match }: any) => (
    <div className="app-wrapper">
        <Navbar match={match} />
        <div className="app-container">
            <Route path={`${match.path}/homepage`} component={Homepage} />
            <Route exact path={match.path} component={Homepage} />
        </div>
    </div>
);

export default App;
