import { FETCH_MOVIES_WITH_GENRES } from '../../../reducers/genres/constants';

export const fetchMoviesWithGenres = (genreId: string) => ({
    type: FETCH_MOVIES_WITH_GENRES,
    payload: {
        genreId,
    },
});
