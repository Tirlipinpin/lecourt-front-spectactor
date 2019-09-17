import browseGenres, { defaultState } from '.';

describe('browseGenres reducer', () => {
    test('should return initial state', () => {
        expect(browseGenres(defaultState, { type: 'poney' })).toEqual(defaultState);
    });

    test('should return a state with loading set to true when receiving a FETCH_GENRES', () => {
        expect(browseGenres(defaultState, {
            type: 'FETCH_GENRES',
        })).toEqual({
            genres: [],
            loading: true,
        });
    });

    test('should return a state with new genres when receiving a FETCH_GENRES_SUCCEEDED', () => {
        const genres = [{
            id: 42,
            name: 'poney',
        }];

        expect(browseGenres(defaultState, {
            type: 'FETCH_GENRES_SUCCEEDED',
            payload: genres,
        })).toEqual({
            genres,
            loading: false,
        });
    });

    test('should return a state with loading set to false when receiving a FETCH_GENRES_FAILED', () => {
        expect(browseGenres(defaultState, {
            type: 'FETCH_GENRES_FAILED',
        })).toEqual({
            genres: [],
            loading: false,
        });
    });
});

