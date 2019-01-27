import login, { defaultState } from '.';

describe('login reducer', () => {
    it('should return initial state', () => {
        expect(login(defaultState, {})).toEqual(defaultState);
    });
});

