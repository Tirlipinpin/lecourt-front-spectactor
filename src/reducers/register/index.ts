import { REGISTER_USER, REGISTER_USER_SUCCEEDED, REGISTER_USER_FAILED } from './constantes';

export const defaultState = {
    loading: false,
};

export default (state = defaultState, action: any) => {
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
                error: action.payload,
            };
        default:
            return state;
    };
};