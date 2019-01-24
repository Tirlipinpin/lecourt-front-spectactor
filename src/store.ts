import { applyMiddleware, compose, createStore } from 'redux';
import { createBrowserHistory } from 'history';

import rootReducer from './reducers/rootReducer';
import { routerMiddleware } from 'connected-react-router';

export const history = createBrowserHistory();

export default function configureStore() {
    return createStore(
        rootReducer(history),
        compose(
            applyMiddleware(
                routerMiddleware(history),
            ),
        ),
    );
}
