import { put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import { FETCH_MOVIE_DETAILS, FETCH_MOVIE_DETAILS_SUCCEEDED, FETCH_MOVIE_DETAILS_FAILED } from '../reducers/watch/constants';

function* fetchMovieDetails(action: AnyAction): IterableIterator<Object | void> {
    try {
        const { id } = action.payload;

        const res = yield axios.get(`movies/${id}`, {
        });

        if (!res)
            throw new Error('Unable to fetch movie details');

        const { data } = res;

        yield put({
            type: FETCH_MOVIE_DETAILS_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_MOVIE_DETAILS_FAILED,
        });
        yield notification['error']({
            message: 'An error occured',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeLatest(FETCH_MOVIE_DETAILS, fetchMovieDetails);
}

export default saga;
