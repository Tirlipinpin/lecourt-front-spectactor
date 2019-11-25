import { applyMiddleware, createStore, Store, AnyAction } from 'redux';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers/rootReducer';

import sagas from './sagas';

export const history = createBrowserHistory();

export interface ConfigureStore {
    store: Store<any, AnyAction>
};

const sagaMiddleware = createSagaMiddleware();
export const store  = createStore(
    rootReducer(history),
    composeWithDevTools(
        applyMiddleware(
            routerMiddleware(history),
            sagaMiddleware,
        ),
    ),
);

const configureStore = (): ConfigureStore => ({
    store,
});

setTimeout(() => sagaMiddleware.run(sagas), 0);

export default configureStore;
