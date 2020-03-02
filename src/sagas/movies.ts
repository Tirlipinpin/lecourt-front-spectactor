import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { getI18n } from 'react-i18next';
import { notification } from 'antd';
import {
    FETCH_MOVIES_SUCCEEDED,
    FETCH_LATEST_MOVIES_SUCCEEDED,
    FETCH_MOVIES_FAILED,
    FETCH_MOVIES,
    FETCH_LATEST_MOVIES_FAILED,
    FETCH_LATEST_MOVIES,
} from 'reducers/homepage/constants';

function* fetchMovies(action: AnyAction): IterableIterator<Object | void> {
    const { t } = getI18n();

    try {
        const res = yield axios.get('movies', {
            params: {
                limit: 8,
            }
        });

        if (!res)
            throw new Error(t('UNABLE_TO_FETCH_RESOURCES'));

        const { data } = res;

        yield put({
            type: FETCH_MOVIES_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_MOVIES_FAILED,
        });
        yield notification['error']({
            message: t('ERROR_OCCURRED'),
            description: e.message,
        });
    }
}

function* fetchLatestMovies(action: AnyAction): IterableIterator<Object | void> {
    const { t } = getI18n();

    try {
        const res = yield axios.get('movies/latest', {
            params: {
                limit: 8,
            }
        });

        if (!res)
            throw new Error(t('UNABLE_TO_FETCH_RESOURCES'));

        const { data } = res;

        yield put({
            type: FETCH_LATEST_MOVIES_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_LATEST_MOVIES_FAILED,
        });
        yield notification['error']({
            message: t('ERROR_OCCURRED'),
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(FETCH_MOVIES, fetchMovies);
    yield takeEvery(FETCH_LATEST_MOVIES, fetchLatestMovies);
}

export default saga;
