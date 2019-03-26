import { Reducer, AnyAction } from 'redux';

import { Movie } from '../../components/App/interfaces'
import { FETCH_SEARCH_MOVIES, FETCH_SEARCH_MOVIES_SUCCEEDED, FETCH_SEARCH_MOVIES_FAILED } from './constantes';

export interface SearchStore {
    loading: boolean
    movies: Movie[]
};

export const defaultState: SearchStore = {
    loading: false,
    movies: [],
};

const searchReducer: Reducer<SearchStore, AnyAction> = (state: SearchStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case FETCH_SEARCH_MOVIES:
            return {
                ...state,
                loading: true,
            };
        case FETCH_SEARCH_MOVIES_SUCCEEDED:
            return {
                ...state,
                loading: false,
                movies: action.payload,
            }
        case FETCH_SEARCH_MOVIES_FAILED:
            return {
                ...state,
                loading: false,
                movies: [],
            }
        default:
            return state;
    };
};

export default searchReducer;
