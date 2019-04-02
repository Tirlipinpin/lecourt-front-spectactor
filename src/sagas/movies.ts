import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import {
    FETCH_MOVIES_SUCCEEDED,
    FETCH_LATEST_MOVIES_SUCCEEDED,
    FETCH_MOVIES_FAILED,
    FETCH_MOVIES,
} from '../reducers/homepage/constantes';


function* fetchMovies(action: AnyAction): IterableIterator<Object | void> {
    try {
        const { latest } = action.payload;

        const res = yield axios.get(`movies${latest ? '/latest' : ''}`, {
            params: {
                limit: 8,
            }
        });

        if (!res)
            throw new Error('Unable to fetch movies');

        const { data } = res;

        yield put({
            type: latest ? FETCH_MOVIES_SUCCEEDED : FETCH_LATEST_MOVIES_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_MOVIES_FAILED,
        });
        yield notification['error']({
            message: 'An error occured',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(FETCH_MOVIES, fetchMovies);
}

export default saga;
