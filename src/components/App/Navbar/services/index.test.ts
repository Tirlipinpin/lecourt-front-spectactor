import { store, history } from '../../../../store';
import {
    onChangeSearchTerm,
    onSearchTerm,
    redirectToGenre,
    getActiveKey,
    logout,
} from '.';

jest.mock('../../../../store');

describe('navbar services', () => {
    test('onChangeSearchTerm should dispatch UPDATE_SEARCH_TERM with given argument', () => {
        onChangeSearchTerm({ target: { value: 'poney' } });

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'UPDATE_SEARCH_TERM',
            payload: 'poney',
        });
    });

    test('onSearchTerm should call history push with store term', () => {
        jest.spyOn(store, 'getState').mockImplementation(() => ({ navbar: { searchTerm: 'poney' } }));

        onSearchTerm();

        expect(history.push).toHaveBeenCalledWith('/app/search/poney');
    });

    test('redirectToGenre should call history push with the given value', () => {
        const givenValue = 'poney';

        redirectToGenre(givenValue);

        expect(history.push).toHaveBeenCalledWith(`/app/genres/${givenValue}`);
    });

    describe('getActiveKey', () => {
        const defaultMockedStore = {
            navbar: {
                genres: [],
            },
            router: {
                location: {
                    pathname: 'localhost/app',
                },
            },
        };

        test('should return homepage without current active route', () => {
            jest.spyOn(store, 'getState').mockImplementation(() => defaultMockedStore);

            const activeKey = getActiveKey();

            expect(activeKey).toEqual(['homepage']);
        });

        test('should return the current active route if this is not genres', () => {
            const definedCurrentActiveMockedStore = {
                ...defaultMockedStore,
                router: {
                    location: {
                        pathname: 'localhost/app/poney',
                    },
                },
            };
            jest.spyOn(store, 'getState').mockImplementation(() => definedCurrentActiveMockedStore);

            const activeKey = getActiveKey();

            expect(activeKey).toEqual(['poney']);
        });

        test('should return the current active genre if route is genres and its id is listed', () => {
            const GenredCurrentActiveMockedStore = {
                navbar: {
                    genres: [{
                        id: '42',
                    }],
                },
                router: {
                    location: {
                        pathname: 'localhost/app/genres/42',
                    },
                },
            };
            jest.spyOn(store, 'getState').mockImplementation(() => GenredCurrentActiveMockedStore);

            const activeKey = getActiveKey();

            expect(activeKey).toEqual(['genres:42']);
        });

        test('should return browse_genres if route is genres and its id is not listed', () => {
            const GenreNotListedCurrentActiveMockedStore = {
                ...defaultMockedStore,
                router: {
                    location: {
                        pathname: 'localhost/app/genres/42',
                    },
                },
            };
            jest.spyOn(store, 'getState').mockImplementation(() => GenreNotListedCurrentActiveMockedStore);

            const activeKey = getActiveKey();

            expect(activeKey).toEqual(['browse_genres']);
        });
    });

    test('logout should dispath a LOGOUT action', () => {
        logout();

        expect(store.dispatch).toHaveBeenCalledWith({
            type: 'LOGOUT',
        });
    });
});
