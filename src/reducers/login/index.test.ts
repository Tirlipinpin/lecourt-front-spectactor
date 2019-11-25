import login, { defaultState } from '.';

describe('login reducer', () => {
    test('should return initial state', () => {
        expect(login(defaultState, { type: 'poney' })).toEqual(defaultState);
    });

    test('should start loading when fetch is triggered', () => {
        const action = {
            type: 'FETCH_TOKEN',
        };

        expect(login(defaultState, action)).toEqual({
            ...defaultState,
            loading: true,
        });
    });

    test('should stop loading when fetch is successful', () => {
        const action = {
            type: 'FETCH_TOKEN_SUCCEEDED',
            payload: {
                token: 'poney',
            },
        };

        expect(login(defaultState, action)).toEqual({
            loading: false,
            token: 'poney',
        });
    });

    test('should return an error state when fetch fails', () => {
        const action = {
            type: 'FETCH_TOKEN_FAILED',
            payload: 'error message',
        };

        expect(login(defaultState, action)).toEqual({
            ...defaultState,
        });
    });

    test('should set token to null when LOGOUT action is triggered', () => {
        const action = {
            type: 'LOGOUT',
        };

        expect(login(defaultState, action)).toEqual({
            ...defaultState,
            token: null,
        });
    });

    test('should set new token with RESTORE_TOKEN', () => {
        const action = {
            type: 'RESTORE_TOKEN',
            payload: 'poney',
        };

        expect(login(defaultState, action)).toEqual({
            ...defaultState,
            token: 'poney',
        });
    });
});
