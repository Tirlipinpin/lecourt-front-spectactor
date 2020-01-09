import { put, takeLatest } from 'redux-saga/effects';
import axios, { AxiosResponse } from 'axios';
import { notification } from 'antd';
import {
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCEEDED,
    FETCH_USER_PROFILE_FAILED,
    UPDATE_USER_PROFILE,
    UPDATE_USER_PROFILE_SUCCEEDED,
    UPDATE_USER_PROFILE_FAILED,
} from 'reducers/profile/constants';
import { getUserUrl } from 'services/requestUrl';
import { IProfileStore } from 'reducers/profile';

export interface IFetchUserProfileAction {
    type: string
}

function* fetchUserProfile(action: IFetchUserProfileAction): IterableIterator<Object | void> {
    try {
        const res: unknown = yield axios.get(getUserUrl());

        if (!res)
            throw new Error('Unable to fetch your profile information');

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

export interface IUpdateUserProfileAction {
  type: string
  payload: Omit<IProfileStore, 'loading'>
}

function* updateUserProfile(action: IUpdateUserProfileAction): IterableIterator<Object | void> {
  try {
    const {
      email,
      displayName,
      firstName,
      lastName,
    } = action.payload;

    const res: unknown = yield axios.put(getUserUrl(), {
      email,
      display_name: displayName,
      first_name: firstName,
      last_name: lastName,
    });

    if (!res)
        throw new Error('Unable to update your profile information');

    const { data } = res as AxiosResponse;

    yield put({
        type: UPDATE_USER_PROFILE_SUCCEEDED,
        payload: data,
    });
} catch (e) {
    yield put({
        type: UPDATE_USER_PROFILE_FAILED,
    });
    yield notification['error']({
        message: 'An error occured',
        description: e.message,
    });
}
}

function* saga() {
    yield takeLatest(FETCH_USER_PROFILE, fetchUserProfile);
    yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}

export default saga;
