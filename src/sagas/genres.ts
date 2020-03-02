import { put, takeEvery } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { getI18n } from 'react-i18next';
import axios from 'axios';
import { notification } from 'antd';
import {
    FETCH_NAVBAR_GENRES,
    FETCH_NAVBAR_GENRES_FAILED,
    FETCH_NAVBAR_GENRES_SUCCEEDED,
} from 'reducers/navbar/constants';
import {
    FETCH_GENRES,
    FETCH_GENRES_FAILED,
    FETCH_GENRES_SUCCEEDED,
} from 'reducers/browseGenres/constants';
import {
    FETCH_MOVIES_WITH_GENRES,
    FETCH_MOVIES_WITH_GENRES_FAILED,
    FETCH_MOVIES_WITH_GENRES_SUCCEEDED,
} from 'reducers/genres/constants';

function* fetchNavbarGenres(action: AnyAction): IterableIterator<Object | void> {
    const { t } = getI18n();

    try {
        const res = yield axios.get('genres', {
            params: {
                limit: 4,
            }
        });

        if (!res)
            throw new Error(t('UNABLE_TO_FETCH_RESOURCES'));

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
            message: t('ERROR_OCCURRED'),
            description: e.message,
        });
    }
}

function* fetchAllGenres(action: AnyAction): IterableIterator<Object | void> {
    const { t } = getI18n();

    try {
        const res = yield axios.get('genres');

        if (!res)
            throw new Error(t('UNABLE_TO_FETCH_RESOURCES'));

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
            message: t('ERROR_OCCURRED'),
            description: e.message,
        });
    }
}

function* fetchAllMoviesWithGenres(action: AnyAction): IterableIterator<Object | void> {
    const { t } = getI18n();

    try {
        const { payload: { genreId } } = action;

        const res = yield axios.get(`movies/genres/${genreId}`);

        if (!res)
            throw new Error(t('UNABLE_TO_FETCH_RESOURCES'));

        const { data } = res;

        yield put({
            type: FETCH_MOVIES_WITH_GENRES_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_MOVIES_WITH_GENRES_FAILED,
        });
        yield notification['error']({
            message: t('ERROR_OCCURRED'),
            description: e.message,
        });
    }
}

function* saga() {
    yield takeEvery(FETCH_NAVBAR_GENRES, fetchNavbarGenres);
    yield takeEvery(FETCH_GENRES, fetchAllGenres);
    yield takeEvery(FETCH_MOVIES_WITH_GENRES, fetchAllMoviesWithGenres);
}

export default saga;
