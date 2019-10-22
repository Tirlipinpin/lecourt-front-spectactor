import { fork, all } from 'redux-saga/effects';

import auth from './auth';
import movies from './movies';
import searchMovies from './searchMovies';
import watch from './watch';
import genres from './genres';

export default function* sagas() {
    yield all([
        fork(auth),
        fork(genres),
        fork(movies),
        fork(searchMovies),
        fork(watch),
    ]);
};
