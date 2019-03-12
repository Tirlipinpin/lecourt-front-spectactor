import { fork, all } from 'redux-saga/effects';

import login from './login';
import register from './register';
import movies from './movies';

export default function* sagas() {
    yield all([
        fork(login),
        fork(register),
        fork(movies),
    ]);
};
