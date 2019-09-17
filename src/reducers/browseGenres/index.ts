import { Reducer } from "react";
import { AnyAction } from "redux";
import { Genre } from '../../components/App/interfaces';
import {
    FETCH_GENRES,
    FETCH_GENRES_FAILED,
    FETCH_GENRES_SUCCEEDED,
} from './constants';

export interface IBrowseGenresStore {
    genres: Genre[]
    loading: boolean
};

export const defaultState: IBrowseGenresStore = {
    genres: [],
    loading: false
};

const browseGenresReducer: Reducer<IBrowseGenresStore | undefined, AnyAction> = (state: IBrowseGenresStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case FETCH_GENRES:
            return {
                ...state,
                loading: true,
            };
        case FETCH_GENRES_FAILED:
            return {
                ...state,
                loading: false,
            };
        case FETCH_GENRES_SUCCEEDED:
            return {
                ...state,
                genres: action.payload,
                loading: false,
            };
        default:
            return state;
    }
}

export default browseGenresReducer;
