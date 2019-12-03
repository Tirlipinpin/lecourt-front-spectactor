import React from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';
import { History, Location } from 'history';
import { WithTranslation } from 'react-i18next';
import { MoviesGallery } from 'designSystem';
import { SearchStore } from '../../../reducers/search';
import { Search } from '.';

describe('The Search component', () => {
    let wrapper: ShallowWrapper;
    const dispatch = jest.fn();

    beforeEach(() => {
        const location = {} as Location;
        const history = {} as History;
        const match = {
            params: {
                term: 'poney',
            },
        };
        const search: SearchStore = {
            loading: false,
            movies: [],
        };
        const i18n = {
            t: jest.fn(),
        } as unknown;

        wrapper = shallow(
            <Search
                location={location}
                history={history}
                match={match}
                search={search}
                dispatch={dispatch}
                {...i18n as WithTranslation}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });

    test('should dispatch a FETCH_SEARCH_MOVIES when rendered', () => {
        expect(dispatch).toHaveBeenCalledWith({
            type: 'FETCH_SEARCH_MOVIES',
            payload: {
                term: 'poney',
            },
        });
    });

    test('should not render the Gallery when there is no results', () => {
        expect(wrapper.find(MoviesGallery).length).toBe(0);
    });
});
