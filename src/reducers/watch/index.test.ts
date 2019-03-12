import search, { defaultState } from '.';

describe('watch reducer', () => {
    test('should return initial state', () => {
        expect(search(defaultState, { type: 'poney' })).toEqual(defaultState);
    });

    test('should set loading to true and notFound to false when receiving a FETCH_MOVIE_DETAILS', () => {
        expect(search(defaultState, {
            type: 'FETCH_MOVIE_DETAILS',
        })).toEqual({
            loading: true,
            movie: {},
            notFound: false,
        });
    });

    test('should set loading to false and add movie when receiving a FETCH_MOVIE_DETAILS_SUCCEEDED', () => {
        const movie = {
            id: 42,
            title: 'poney',
        };

        expect(search(defaultState, {
            type: 'FETCH_MOVIE_DETAILS_SUCCEEDED',
            payload: movie,
        })).toEqual({
            loading: false,
            movie,
            notFound: false,
        });
    });

    test('should set loading to false and remove movies when receiving a FETCH_MOVIE_DETAILS_FAILED', () => {
        expect(search(defaultState, {
            type: 'FETCH_MOVIE_DETAILS_FAILED',
        })).toEqual({
            loading: false,
            movie: {},
            notFound: true,
        });
    });
});
