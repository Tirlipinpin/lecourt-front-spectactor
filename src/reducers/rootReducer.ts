import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import navbar from './navbar';
import homepage from './homepage';
import login from './login';
import register from './register';
import search from './search';
import watch from './watch';
import browseGenres from './browseGenres';
import genres from './genres';

export default (history: History) => combineReducers({
    router: connectRouter(history),
    navbar,
    homepage,
    login,
    register,
    search,
    watch,
    browseGenres,
    genres,
});
