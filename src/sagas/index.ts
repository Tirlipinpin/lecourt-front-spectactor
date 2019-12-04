import { fork, all } from 'redux-saga/effects';

import auth from './auth';
import movies from './movies';
import genres from './genres';
import profile from './profile';
import searchMovies from './searchMovies';
import watch from './watch';

export default function* sagas() {
    yield all([
        fork(auth),
        fork(genres),
        fork(movies),
        fork(profile),
        fork(searchMovies),
        fork(watch),
    ]);
};
