import genresReducer, { defaultState } from '.';

describe('genresReducer', () => {
    test('should return initialState by default', () => {
        const actual = genresReducer(defaultState, { type: 'poney' });

        expect(actual).toEqual(defaultState);
    });

    test('should reduce loading to true when receiving a FETCH_MOVIES_WITH_GENRES action', () => {
        const actual = genresReducer(defaultState, { type: 'FETCH_MOVIES_WITH_GENRES' });

        expect(actual).toEqual({
            ...defaultState,
            loading: true,
        });
    });

    test('should reduce loading to false when receiving a FETCH_MOVIES_WITH_GENRES_FAILED action', () => {
        const actual = genresReducer(defaultState, { type: 'FETCH_MOVIES_WITH_GENRES_FAILED' });

        expect(actual).toEqual({
            ...defaultState,
            loading: false,
        });
    });

    
    test('should reduce loading to false and movies with array when receiving a FETCH_MOVIES_WITH_GENRES_SUCCEEDED action', () => {
        const actual = genresReducer(defaultState, {
            type: 'FETCH_MOVIES_WITH_GENRES_SUCCEEDED',
            payload: [{id: 42, title: 'poney'}],
        });

        expect(actual).toEqual({
            ...defaultState,
            loading: false,
            movies: [{id: 42, title: 'poney'}],
        });
    });
});
