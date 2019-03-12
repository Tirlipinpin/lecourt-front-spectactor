import { Reducer } from "react";
import { AnyAction } from "redux";

import { Movie } from "../../components/App/interfaces";
import { FETCH_MOVIES_SUCCEEDED, FETCH_LATEST_MOVIES_SUCCEEDED } from "./constantes";

export interface HomepageStore {
    movies: Movie[],
    latestMovies: Movie[],
};

export const defaultState: HomepageStore = {
    movies: [],
    latestMovies: [],
};

const homepageReducer: Reducer<HomepageStore | undefined, AnyAction> = (state: HomepageStore = defaultState, action: AnyAction) => {
    switch(action.type) {
        case FETCH_MOVIES_SUCCEEDED:
            return {
                ...state,
                movies: action.payload,
            };
        case FETCH_LATEST_MOVIES_SUCCEEDED:
            return {
                ...state,
                latestMovies: action.payload,
            };
        default:
            return state;
    }
}

export default homepageReducer;
