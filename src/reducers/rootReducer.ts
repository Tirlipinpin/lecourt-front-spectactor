import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import homepage from './homepage';
import login from './login';
import register from './register';

export default (history: any) => combineReducers({
    router: connectRouter(history),
    homepage,
    login,
    register,
});
