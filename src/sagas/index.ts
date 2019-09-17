import { fork, all } from 'redux-saga/effects';

import login from './login';
import register from './register';
import movies from './movies';
import searchMovies from './searchMovies';
import watch from './watch';
import genres from './genres';

export default function* sagas() {
    yield all([
        fork(login),
        fork(register),
        fork(movies),
        fork(searchMovies),
        fork(watch),
        fork(genres),
    ]);
};
