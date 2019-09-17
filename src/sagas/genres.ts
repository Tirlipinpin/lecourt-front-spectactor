import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import {
    FETCH_NAVBAR_GENRES,
    FETCH_NAVBAR_GENRES_FAILED,
    FETCH_NAVBAR_GENRES_SUCCEEDED,
} from '../reducers/navbar/constants';
import {
    FETCH_GENRES,
    FETCH_GENRES_FAILED,
    FETCH_GENRES_SUCCEEDED,
} from '../reducers/browseGenres/constants';


function* fetchNavbarGenres(action: AnyAction): IterableIterator<Object | void> {
    try {
        const res = yield axios.get('genres', {
            params: {
                limit: 4,
            }
        });

        if (!res)
            throw new Error('Unable to fetch genres');

        const { data } = res;

        yield put({
            type: FETCH_NAVBAR_GENRES_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_NAVBAR_GENRES_FAILED,
        });
        yield notification['error']({
            message: 'An error occurred',
            description: e.message,
        });
    }
}

function* fetchAllGenres(action: AnyAction): IterableIterator<Object | void> {
    try {
        const res = yield axios.get('genres');

        if (!res)
            throw new Error('Unable to fetch genres');

        const { data } = res;

        yield put({
            type: FETCH_GENRES_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_GENRES_FAILED,
        });
        yield notification['error']({
            message: 'An error occurred',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(FETCH_NAVBAR_GENRES, fetchNavbarGenres);
    yield takeEvery(FETCH_GENRES, fetchAllGenres);
}

export default saga;
