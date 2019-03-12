import search, { defaultState } from '.';

describe('search reducer', () => {
    test('should return initial state', () => {
        expect(search(defaultState, { type: 'poney' })).toEqual(defaultState);
    });

    test('should set loading to true when receiving a FETCH_SEARCH_MOVIES', () => {
        expect(search(defaultState, {
            type: 'FETCH_SEARCH_MOVIES',
        })).toEqual({
            loading: true,
            movies: [],
        });
    });

    test('should set loading to false and add movies when receiving a FETCH_SEARCH_MOVIES_SUCCEEDED', () => {
        const movies = [{
            id: 42,
            title: 'poney',
        }];

        expect(search(defaultState, {
            type: 'FETCH_SEARCH_MOVIES_SUCCEEDED',
            payload: movies,
        })).toEqual({
            loading: false,
            movies,
        });
    });

    test('should set loading to false and remove movies when receiving a FETCH_SEARCH_MOVIES_FAILED', () => {
        expect(search(defaultState, {
            type: 'FETCH_SEARCH_MOVIES_FAILED',
        })).toEqual({
            loading: false,
            movies: [],
        });
    });
});
