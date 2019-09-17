import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from './constants';
import { Reducer, AnyAction } from 'redux';

export interface RegisterStore {
    loading: boolean
};

export const defaultState: RegisterStore = {
    loading: false,
};

const registerReducer: Reducer<RegisterStore, AnyAction> = (state: RegisterStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case REGISTER_USER:
            return {
                ...state,
                loading: true,
            };
        case REGISTER_USER_SUCCEEDED:
            return {
                ...state,
                loading: false,
            };
        case REGISTER_USER_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    };
};

export default registerReducer;
