import { put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import { getI18n } from 'react-i18next';
import axios from 'axios';
import { notification } from 'antd';
import {
    FETCH_SEARCH_MOVIES_SUCCEEDED,
    FETCH_SEARCH_MOVIES_FAILED,
    FETCH_SEARCH_MOVIES,
} from 'reducers/search/constants';

function* fetchSearchMovies(action: AnyAction): IterableIterator<Object | void> {
    const { t } = getI18n();

    try {
        const { term } = action.payload;

        const res = yield axios.get('movies/search', {
            params: {
                limit: 20,
                page: 1,
                words: term,
            }
        });

        if (!res)
            throw new Error('Unable to fetch movies');

        const { data } = res;

        yield put({
            type: FETCH_SEARCH_MOVIES_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_SEARCH_MOVIES_FAILED,
        });
        yield notification['error']({
            message: t('ERROR_OCCURRED'),
            description: e.message,
        });
    }
}

function* saga() {
    yield takeLatest(FETCH_SEARCH_MOVIES, fetchSearchMovies);
}

export default saga;
