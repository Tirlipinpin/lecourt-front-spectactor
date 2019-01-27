import React from 'react';
import { Route } from 'react-router';

import Homepage from './components/Homepage';

const App = () => (
    <div className="app-container">
        App
        <Route path="/homepage" component={Homepage} />
    </div>
);

export default App;
