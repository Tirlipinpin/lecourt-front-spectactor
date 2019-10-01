import { FETCH_SEARCH_MOVIES } from '../../../reducers/search/constants';

export const fetchSearchMovies = (term: string) => ({
    type: FETCH_SEARCH_MOVIES,
    payload: {
        term,
    }
});
