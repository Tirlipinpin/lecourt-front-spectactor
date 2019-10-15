import { FETCH_NAVBAR_GENRES, UPDATE_SEARCH_TERM } from '../../../reducers/navbar/constants';

export const fetchNavbarGenres = () => ({ type: FETCH_NAVBAR_GENRES });
export const updateSearchTerm = (term: string) => ({ type: UPDATE_SEARCH_TERM, payload: term });