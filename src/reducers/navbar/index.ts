import {FETCH_NAVBAR_GENRES_SUCCEEDED, UPDATE_SEARCH_TERM} from './constants';
import { Reducer, AnyAction } from 'redux';
import { shuffle } from 'lodash';
import { Genre } from '../../components/App/interfaces';

export interface NavbarStore {
    searchTerm: string
    genres: Genre[]
};

export const defaultState = {
    searchTerm: '',
    genres: [],
};

const navbarReducer: Reducer<NavbarStore, AnyAction> = (state: NavbarStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case UPDATE_SEARCH_TERM:
            return {
                ...state,
                searchTerm: action.payload,
            };
        case FETCH_NAVBAR_GENRES_SUCCEEDED:
            return {
                ...state,
                genres: shuffle(action.payload),
            };
        default:
            return state;
    }
};

export default navbarReducer;
