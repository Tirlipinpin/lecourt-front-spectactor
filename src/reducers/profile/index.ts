import { Reducer, AnyAction } from 'redux';
import {
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCEEDED,
    FETCH_USER_PROFILE_FAILED,
} from './constants';

export interface IProfileStore {
    loading: boolean
    firstName?: string
    lastName?: string
    displayName?: string
    avatarUrl?: string
};

export const defaultState: IProfileStore = {
    loading: true,
};

const loginReducer: Reducer<IProfileStore, AnyAction> = (state: IProfileStore = defaultState, action: AnyAction): IProfileStore => {
    switch (action.type) {
        case FETCH_USER_PROFILE:
            return {
                loading: true,
            };
        case FETCH_USER_PROFILE_SUCCEEDED:
            return {
                loading: false,
                firstName: action.payload.first_name,
                lastName: action.payload.last_name,
                displayName: action.payload.display_name,
                avatarUrl: action.payload.avatar,
            };
        case FETCH_USER_PROFILE_FAILED:
            return {
                loading: false,
            };
        default:
            return state;
    }
};

export default loginReducer;
