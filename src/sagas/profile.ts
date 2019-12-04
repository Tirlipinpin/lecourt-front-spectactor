import { put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';
import {
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCEEDED,
    FETCH_USER_PROFILE_FAILED,
} from 'reducers/profile/constants';
import { getUserUrl } from 'services/requestUrl';

export interface IFetchUserProfileAction {
    type: string
}

function* fetchUserProfile(action: IFetchUserProfileAction): IterableIterator<Object | void> {
    try {
        const res: unknown = yield axios.get(getUserUrl());

        if (!res)
            throw new Error('Unable to fetch movies');

        const { data } = res as AxiosResponse;

        yield put({
            type: FETCH_USER_PROFILE_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_USER_PROFILE_FAILED,
        });
        yield notification['error']({
            message: 'An error occured',
            description: e.message,
        });
    }
}

function* saga() {
    yield takeLatest(FETCH_USER_PROFILE, fetchUserProfile);
}

export default saga;
