import { Reducer, AnyAction } from 'redux';
import {
    FETCH_USER_PROFILE,
    FETCH_USER_PROFILE_SUCCEEDED,
    FETCH_USER_PROFILE_FAILED,
    UPDATE_USER_PROFILE,
    UPDATE_USER_PROFILE_SUCCEEDED,
    UPDATE_USER_PROFILE_FAILED,
} from './constants';

export interface IProfile {
    avatarUrl: string
    displayName: string
    firstName: string
    lastName: string
}

export interface IProfileStore {
    email?: string
    role?: string
    id?: string
    profile?: IProfile
    loading: boolean
    updatingUser: boolean
};

export const defaultState: IProfileStore = {
    loading: true,
    updatingUser: false,
};

const loginReducer: Reducer<IProfileStore, AnyAction> = (state: IProfileStore = defaultState, action: AnyAction): IProfileStore => {
    switch (action.type) {
        case FETCH_USER_PROFILE:
            return {
                ...state,
                loading: true,
            };
        case FETCH_USER_PROFILE_SUCCEEDED:
            return {
                ...state,
                email: action.payload.email,
                role: action.payload.role,
                id: action.payload.id,
                profile: {
                    firstName: action.payload.profile.first_name,
                    lastName: action.payload.profile.last_name,
                    displayName: action.payload.profile.display_name,
                    avatarUrl: action.payload.profile.avatar,
                },
                loading: false,
            };
        case FETCH_USER_PROFILE_FAILED:
            return {
                loading: false,
                updatingUser: false,
            };
        case UPDATE_USER_PROFILE:
            return {
                ...state,
                ...action.payload,
                updatingUser: true,
            };
        case UPDATE_USER_PROFILE_SUCCEEDED:
            return {
                ...state,
                email: action.payload.email,
                role: action.payload.role,
                id: action.payload.id,
                profile: {
                    firstName: action.payload.profile.first_name,
                    lastName: action.payload.profile.last_name,
                    displayName: action.payload.profile.display_name,
                    avatarUrl: action.payload.profile.avatar,
                },
                loading: false,
                updatingUser: false,
            };
        case UPDATE_USER_PROFILE_FAILED:
            return {
                ...state,
                updatingUser: false,
            };
        default:
            return state;
    }
};

export default loginReducer;
