import { applyMiddleware, createStore, Store, AnyAction } from 'redux';
import { persistStore, Persistor } from 'redux-persist';
import { createBrowserHistory } from 'history';
import createSagaMiddleware from 'redux-saga';
import { composeWithDevTools } from 'redux-devtools-extension';
import { routerMiddleware } from 'connected-react-router';

import rootReducer from './reducers/rootReducer';

import sagas from './sagas';

export const history = createBrowserHistory();

export interface ConfigureStore {
    store: Store<any, AnyAction>,
    persistor: Persistor,
};

const sagaMiddleware = createSagaMiddleware();

const configureStore = (): ConfigureStore => {
    const store = createStore(
        rootReducer(history),
        composeWithDevTools(
            applyMiddleware(
                routerMiddleware(history),
                sagaMiddleware,
            ),
        ),
    );
    return {
        store,
        persistor: persistStore(store),
    };
}

setTimeout(() => sagaMiddleware.run(sagas), 0);

export default configureStore;
