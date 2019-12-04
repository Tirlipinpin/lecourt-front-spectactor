import { History } from 'history';
import { AnyAction } from 'redux';
import rootReducer from './rootReducer';
import { IBrowseGenresStore } from './browseGenres';
import { RouterState } from 'connected-react-router';
import { IGenresStore } from './genres';
import { HomepageStore } from './homepage';
import { ILoginStore } from './login';
import { NavbarStore } from './navbar';
import { IProfileStore } from './profile';
import { RegisterStore } from './register';
import { SearchStore } from './search';
import { WatchStore } from './watch';

describe('rootReducer', () => {
    test('should return every reducers and rooter', () => {
        const history: History = {} as History;

        const reducers = rootReducer(history)({
            browseGenres: {} as IBrowseGenresStore,
            genres: {} as IGenresStore,
            homepage: {} as HomepageStore | undefined,
            login: {} as ILoginStore,
            navbar: {} as NavbarStore,
            profile: {} as IProfileStore,
            register: {} as RegisterStore,
            router: {} as RouterState,
            search: {} as SearchStore,
            watch: {} as WatchStore,
        }, {} as AnyAction);

        expect(reducers).toEqual({
            browseGenres: {},
            genres: {},
            homepage: {},
            login: {},
            navbar: {},
            profile: {},
            register: {},
            router: {},
            search: {},
            watch: {},
        });
    })
});
