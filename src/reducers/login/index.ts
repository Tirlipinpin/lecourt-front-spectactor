import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED, LOGOUT } from './constantes';
import { Reducer, AnyAction } from 'redux';

export interface LoginStore {
    loading: boolean,
    token?: string | null,
};

export const defaultState: LoginStore = {
    loading: false,
};

const loginReducer: Reducer<LoginStore, AnyAction> = (state: LoginStore = defaultState, action: AnyAction) => {
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
                token: action.payload.data,
            }
        case FETCH_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
            }
        case LOGOUT:
            return {
                ...state,
                token: null,
            }
        default:
            return state;
    };
}

export default loginReducer;
