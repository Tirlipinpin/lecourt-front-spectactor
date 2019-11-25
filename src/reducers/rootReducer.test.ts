import { History } from 'history';
import { AnyAction } from 'redux';
import { PersistState } from 'redux-persist';

import rootReducer from './rootReducer';
import { RouterState } from 'connected-react-router';
import { NavbarStore } from './navbar';
import { HomepageStore } from './homepage';
import { ILoginStore } from './login';
import { RegisterStore } from './register';
import { SearchStore } from './search';
import { WatchStore } from './watch';
import { IBrowseGenresStore } from './browseGenres';
import { IGenresStore } from './genres';


describe('rootReducer', () => {
    test('should return every reducers and rooter', () => {
        const history: History = {} as History;

        const reducers = rootReducer(history)({
            router: {} as RouterState,
            navbar: {} as NavbarStore,
            homepage: {} as HomepageStore | undefined,
            login: {} as ILoginStore,
            register: {} as RegisterStore,
            search: {} as SearchStore,
            watch: {} as WatchStore,
            browseGenres: {} as IBrowseGenresStore,
            genres: {} as IGenresStore,
        }, {} as AnyAction);

        expect(reducers).toEqual({
            homepage: {},
            login: {},
            navbar: {},
            register: {},
            router: {},
            search: {},
            watch: {},
            browseGenres: {},
            genres: {},
        });
    })
});
