import homepage, { defaultState } from '.';

describe('homepage reducer', () => {
    test('should return initial state', () => {
        expect(homepage(defaultState, { type: 'poney' })).toEqual(defaultState);
    });

    test('should return a state with new movies when receiving a FETCH_MOVIES_SUCCEEDED', () => {
        const movies = [{
            id: 42,
            title: 'poney',
        }];

        expect(homepage(defaultState, {
            type: 'FETCH_MOVIES_SUCCEEDED',
            payload: movies,
        })).toEqual({
            loadingLatestMovies: false,
            loadingMovies: false,
            latestMovies: [],
            movies,
        });
    });

    test('should return a state with new latest movies when receiving a FETCH_LATEST_MOVIES_SUCCEEDED', () => {
        const latestMovies = [{
            id: 42,
            title: 'poney',
        }];

        expect(homepage(defaultState, {
            type: 'FETCH_LATEST_MOVIES_SUCCEEDED',
            payload: latestMovies,
        })).toEqual({
            loadingLatestMovies: false,
            loadingMovies: false,
            latestMovies,
            movies: [],
        });
    });
});

