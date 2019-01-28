import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED, LOGOUT } from './constantes';

export const defaultState = {
    loading: false,
    logged: false,
};

export default (state = defaultState, action: any) => {
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
                logged: true,
            }
        case FETCH_TOKEN_FAILED:
            return {
                ...state,
                loading: false,
            }
        case LOGOUT:
            return {
                ...state,
                logged: false,
            }
        default:
            return state;
    };
}
