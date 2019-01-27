import { put, takeLatest } from 'redux-saga/effects';
import axios from 'axios';

function* fetchToken(action: any): any {
    try {
        const token = yield axios.post( 'tokens/create', {
            body: action.payload,
        });

        yield put({
            type: 'FETCH_TOKEN_SUCCEEDED',
            payload: token,
        });
    } catch (e) {
        yield put({
            type: 'FETCH_TOKEN_FAILED',
            message: e.message,
        });
    }
}

function* saga() {
    yield takeLatest('FETCH_TOKEN', fetchToken);
}

export default saga;
