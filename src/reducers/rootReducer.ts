import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';

import browseGenres from './browseGenres';
import genres from './genres';
import homepage from './homepage';
import login from './login';
import navbar from './navbar';
import profile from './profile';
import register from './register';
import search from './search';
import watch from './watch';

export default (history: History) => combineReducers({
    browseGenres,
    genres,
    homepage,
    login,
    navbar,
    profile,
    register,
    router: connectRouter(history),
    search,
    watch,
});
