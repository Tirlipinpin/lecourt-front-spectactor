import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import { History, Location } from 'history';

import { SearchStore } from '../../../reducers/search';
import { Search } from '.';
import MoviesCarousel from '../shared/MoviesCarousel';


Enzyme.configure({ adapter: new Adapter() });

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

        wrapper = shallow(
            <Search
                location={location}
                history={history}
                match={match}
                search={search}
                dispatch={dispatch}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });

    it('should dispatch a FETCH_SEARCH_MOVIES when rendered', () => {
        expect(dispatch).toHaveBeenCalledWith({
            type: 'FETCH_SEARCH_MOVIES',
            payload: {
                term: 'poney',
            },
        });
    });

    it('should not render the Carousel when there is no results', () => {
        expect(wrapper.find('.no-content').length).toBe(1);
    });

    it('should render the Carousel when there is results', () => {
        wrapper.setProps({
            search: {
                movies: [{
                    id: 42,
                    title: 'poney',
                }],
            },
        });
        expect(wrapper.find(MoviesCarousel).length).toBe(1);
    });
});
