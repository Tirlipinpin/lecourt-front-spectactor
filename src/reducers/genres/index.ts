import { Movie } from '../../components/App/interfaces';
import { Reducer, AnyAction } from 'redux';
import { SearchStore } from '../search';
import {
    FETCH_MOVIES_WITH_GENRES,
    FETCH_MOVIES_WITH_GENRES_SUCCEEDED,
    FETCH_MOVIES_WITH_GENRES_FAILED,
} from './constants';

export interface IGenresStore {
    loading: boolean
    movies: Movie[]
}

export const defaultState: IGenresStore = {
    loading: false,
    movies: [],
};

const genresReducer: Reducer<IGenresStore, AnyAction> = (state: SearchStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case FETCH_MOVIES_WITH_GENRES:
            return {
                ...state,
                loading: true,
                movies: [],
            };
        case FETCH_MOVIES_WITH_GENRES_SUCCEEDED:
            return {
                ...state,
                loading: false,
                movies: action.payload,
            };
        case FETCH_MOVIES_WITH_GENRES_FAILED:
            return {
                ...state,
                loading: false,
            };
        default:
            return state;
    }
};

export default genresReducer;