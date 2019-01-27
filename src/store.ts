import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers/rootReducer';
import { routerMiddleware } from 'connected-react-router';

import homepage from './sagas/homepage';

export const history = createBrowserHistory();
const sagaMiddleware = createSagaMiddleware();

export default function configureStore() {
    return createStore(
        rootReducer(history),
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware,
            ),
        ),
    );
}

setTimeout(() => sagaMiddleware.run(homepage), 0);
