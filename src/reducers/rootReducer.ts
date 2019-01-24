import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

import homepage from './homepage';

export default (history: any) => combineReducers({
    router: connectRouter(history),
    homepage,
});
