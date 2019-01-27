import { applyMiddleware, createStore } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers/rootReducer';

import sagas from './sagas';

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

setTimeout(() => sagaMiddleware.run(sagas), 0);
