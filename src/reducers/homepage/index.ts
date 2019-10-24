import { Reducer } from "react";
import { AnyAction } from "redux";

import { Movie } from "../../components/App/interfaces";
import { FETCH_MOVIES_SUCCEEDED, FETCH_LATEST_MOVIES_SUCCEEDED, FETCH_MOVIES, FETCH_LATEST_MOVIES } from "./constants";

export interface HomepageStore {
    movies: Movie[]
    latestMovies: Movie[]
    loadingLatestMovies: boolean
    loadingMovies: boolean
};

export const defaultState: HomepageStore = {
    loadingLatestMovies: false,
    loadingMovies: false,
    latestMovies: [],
    movies: [],
};

const homepageReducer: Reducer<HomepageStore | undefined, AnyAction> = (state: HomepageStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case FETCH_MOVIES:
            return {
                ...state,
                loadingMovies: true,
            };
        case FETCH_MOVIES_SUCCEEDED:
            return {
                ...state,
                loadingMovies: false,
                movies: action.payload,
            };
        case FETCH_LATEST_MOVIES:
                return {
                    ...state,
                    loadingLatestMovies: true,
                };
        case FETCH_LATEST_MOVIES_SUCCEEDED:
            return {
                ...state,
                loadingLatestMovies: false,
                latestMovies: action.payload,
            };
        default:
            return state;
    }
}

export default homepageReducer;
