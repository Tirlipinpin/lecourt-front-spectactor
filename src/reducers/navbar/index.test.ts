import navbar, { defaultState } from '.';

describe('navbar reducer', () => {
    test('should return initial state', () => {
        expect(navbar(defaultState, { type: 'poney' })).toEqual(defaultState);
    });

    test('should return a state with new search term when receiving a UPDATE_SEARCH_TERM', () => {
        expect(navbar(defaultState, {
            type: 'UPDATE_SEARCH_TERM',
            payload: 'poney',
        })).toEqual({
            genres: [],
            searchTerm: 'poney',
        });
    });
});
