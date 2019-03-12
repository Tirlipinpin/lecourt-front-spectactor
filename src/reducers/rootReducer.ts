import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { History } from 'history';

import navbar from './navbar';
import homepage from './homepage';
import login from './login';
import register from './register';
import search from './search';
import watch from './watch';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: [
        'login',
    ]
}

export default (history: History) => persistReducer(persistConfig, combineReducers({
    router: connectRouter(history),
    navbar,
    homepage,
    login,
    register,
    search,
    watch,
}));
