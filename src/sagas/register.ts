import { put, takeLatest } from 'redux-saga/effects';
import { AnyAction } from 'redux';
import axios from 'axios';
import { notification } from 'antd';

import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from '../reducers/register/constantes';

function* registerUser(action: AnyAction): IterableIterator<Object | void> {
    try {
        const token = yield axios.post('https://sso.stg.lecourt.tv/users/auth/register', {
            display_name: action.payload.displayName,
            email: action.payload.email,
            password: action.payload.password,
            password_confirm: action.payload.passwordConfirm,
        });

        yield put({
            type: REGISTER_USER_SUCCEEDED,
            payload: token,
        });
    } catch (e) {
        yield put({
            type: REGISTER_USER_FAILED,
        });
        yield notification['error']({
            message: 'An error occured',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeLatest(REGISTER_USER, registerUser);
}

export default saga;
