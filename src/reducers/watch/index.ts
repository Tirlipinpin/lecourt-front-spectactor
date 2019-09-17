import { Reducer, AnyAction } from 'redux';

import { Movie } from '../../components/App/interfaces'
import { FETCH_MOVIE_DETAILS, FETCH_MOVIE_DETAILS_SUCCEEDED, FETCH_MOVIE_DETAILS_FAILED } from './constants';

export interface WatchStore {
    loading: boolean
    movie: Movie
    notFound: boolean
};

export const defaultState: WatchStore = {
    loading: false,
    movie: {} as Movie,
    notFound: false,
};

const watchReducer: Reducer<WatchStore, AnyAction> = (state: WatchStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case FETCH_MOVIE_DETAILS:
            return {
                ...state,
                notFound: false,
                loading: true,
            };
        case FETCH_MOVIE_DETAILS_SUCCEEDED:
            return {
                ...state,
                loading: false,
                movie: action.payload,
            };
        case FETCH_MOVIE_DETAILS_FAILED:
            return {
                ...state,
                notFound: true,
                loading: false,
                movie: {},
            };
        default:
            return state;
    };
};

export default watchReducer;
