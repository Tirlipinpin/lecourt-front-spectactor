import { put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';
import { getLoginUrl, getRegisterUrl } from '../services/requestUrl';
import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED } from '../reducers/login/constants';
import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from '../reducers/register/constants';

export interface IFetchTokenAction {
    type: string
    payload: {
        email: string
        password: string
        rememberMe: boolean
    }
}

function* fetchToken(action: IFetchTokenAction): IterableIterator<Object | void> {
    try {
        const { payload: { email, password, rememberMe } } = action;

        const res: unknown = yield axios.post(getLoginUrl(), {
            username: email,
            password: password,
        }, {
            withCredentials: true,
        });

        const { data: { access_token } } = res as AxiosResponse;

        if (!access_token)
            throw new Error('Network error');

        yield put({
            type: FETCH_TOKEN_SUCCEEDED,
            payload: {
                token: access_token,
                rememberMe: rememberMe,
            },
        });
    } catch (e) {
        yield put({
            type: FETCH_TOKEN_FAILED,
        });
        yield notification['error']({
            message: 'An error occured',
            description: e.message,
        });
    }
}

export interface IRegisterUserAction {
    type: string
    payload: {
        displayName: string
        email: string
        password: string
        passwordConfirmation: string
    }
}

function* registerUser(action: IRegisterUserAction): IterableIterator<Object | void> {
    try {
        const {
            payload: {
                displayName,
                email,
                password,
                passwordConfirmation
            }
        } = action;

        const res: unknown = yield axios.post(getRegisterUrl(), {
            display_name: displayName,
            email: email,
            password: password,
            password_confirm: passwordConfirmation,
        });

        const { data: { access_token } } = res as AxiosResponse;

        yield put({
            type: REGISTER_USER_SUCCEEDED,
            payload: access_token,
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
    yield takeLatest(FETCH_TOKEN, fetchToken);
    yield takeLatest(REGISTER_USER, registerUser);
}

export default saga;
