import {
    FETCH_TOKEN,
    FETCH_TOKEN_SUCCEEDED,
    FETCH_TOKEN_FAILED,
    RESTORE_TOKEN,
    LOGOUT
} from './constants';
import { Reducer, AnyAction } from 'redux';

export interface ILoginStore {
    loading: boolean
    token?: string | null
};

export const defaultState: ILoginStore = {
    loading: false,
};

const loginReducer: Reducer<ILoginStore, AnyAction> = (state: ILoginStore = defaultState, action: AnyAction): ILoginStore => {
    switch(action.type) {
        case FETCH_TOKEN:
            return {
                ...state,
                loading: true,
            };
        case FETCH_TOKEN_SUCCEEDED:
            return {
                ...state,
                loading: false,
                token: action.payload.token,
            };
        case FETCH_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
            };
        case RESTORE_TOKEN:
            return {
                ...state,
                token: action.payload,
            };
        case LOGOUT:
            return {
                ...state,
                token: null,
            };
        default:
            return state;
    };
};

export default loginReducer;
