import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED } from '../reducers/login/constantes';

function* fetchToken(action: any): any {
    try {
        const token = yield axios.post('tokens/create', {
            auth: {
                username: 'user',
                password: 'password',
            },
        });

        yield put({
            type: FETCH_TOKEN_SUCCEEDED,
            payload: token,
        });
    } catch (e) {
        yield put({
            type: FETCH_TOKEN_FAILED,
            payload: e.message,
        });
    }
}

function* saga() {
    yield takeLatest(FETCH_TOKEN, fetchToken);
}

export default saga;
