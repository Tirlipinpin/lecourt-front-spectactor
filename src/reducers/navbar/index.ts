import { UPDATE_SEARCH_TERM } from './constantes';
import { Reducer, AnyAction } from 'redux';

export interface NavbarStore {
    searchTerm: string,
};

export const defaultState = {
    searchTerm: '',
};

const navbarReducer: Reducer<NavbarStore, AnyAction> = (state: NavbarStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case UPDATE_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            }
        default:
            return state;
    };
};

export default navbarReducer;
