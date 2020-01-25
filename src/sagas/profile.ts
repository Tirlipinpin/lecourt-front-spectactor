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
    FETCH_USER_INIT_APP,
    FETCH_USER_INIT_APP_SUCCEEDED,
    FETCH_USER_INIT_APP_FAILED,
} from 'reducers/profile/constants';
import { getUserUrl } from 'services/requestUrl';
import { IProfileStore } from 'reducers/profile';

export interface IFetchUserProfileAction {
    type: string
}

function* fetchUserInitApp(action: IFetchUserProfileAction): IterableIterator<Object | void> {
    try {
        const res: unknown = yield axios.get(getUserUrl());

        if (!res)
            throw new Error('Unable to fetch your profile information');

        const { data } = res as AxiosResponse;

        yield put({
            type: FETCH_USER_INIT_APP_SUCCEEDED,
            payload: data,
        });
    } catch (e) {
        yield put({
            type: FETCH_USER_INIT_APP_FAILED,
        });
        yield notification['error']({
            message: 'An error occured',
            description: e.message,
        });
    }
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
  payload: Omit<IProfileStore, 'loading' | 'updatingUser'>
}

function* updateUserProfile(action: IUpdateUserProfileAction): IterableIterator<Object | void> {
  try {
    const {
      email,
      role,
      id,
      profile,
    } = action.payload;

    const res: unknown = yield axios.put(getUserUrl(), {
      email,
      role,
      id,
      profile: {
        update: {
          avatar: profile?.avatarUrl,
          display_name: profile?.displayName,
          first_name: profile?.firstName,
          last_name: profile?.lastName,
        }
      }
    });

    if (!res)
        throw new Error('Unable to update your profile information');

    const { data } = res as AxiosResponse;

    yield put({
        type: UPDATE_USER_PROFILE_SUCCEEDED,
        payload: data,
    });

    yield notification['success']({
        message: 'Profile information udpated',
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
    yield takeLatest(FETCH_USER_INIT_APP, fetchUserInitApp);
    yield takeLatest(FETCH_USER_PROFILE, fetchUserProfile);
    yield takeLatest(UPDATE_USER_PROFILE, updateUserProfile);
}

export default saga;
