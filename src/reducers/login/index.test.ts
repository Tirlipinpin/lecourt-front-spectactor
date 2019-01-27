import login, { defaultState } from '.';
import { FETCH_TOKEN, FETCH_TOKEN_SUCCEEDED, FETCH_TOKEN_FAILED } from './constantes';

describe('login reducer', () => {
    it('should return initial state', () => {
        expect(login(defaultState, {})).toEqual(defaultState);
    });

    it('should start loading when fetch is triggered', () => {
        const action = {
            type: FETCH_TOKEN,
        };

        expect(login(defaultState, action)).toEqual({
            loading: true,
        });
    });

    it('should stop loading when fetch is successful', () => {
        const action = {
            type: FETCH_TOKEN_SUCCEEDED,
        };

        expect(login(defaultState, action)).toEqual({
            loading: false,
        });
    });

    it('should return an error state when fetch fails', () => {
        const action = {
            type: FETCH_TOKEN_FAILED,
            payload: 'error message',
        };

        expect(login(defaultState, action)).toEqual({
            loading: false,
            error: 'error message',
        });
    });
});

