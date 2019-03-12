import homepage, { defaultState } from '.';

describe('homepage reducer', () => {
    test('should return initial state', () => {
        expect(homepage(defaultState, { type: 'poney' })).toEqual(defaultState);
    });
});

