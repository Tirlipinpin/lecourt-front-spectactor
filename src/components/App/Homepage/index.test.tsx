import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';
import { createMemoryHistory } from 'history'

import { HomepageStore } from '../../../reducers/homepage';
import { Homepage } from '.';

Enzyme.configure({ adapter: new Adapter() })

describe('the Homepage component', () => {
    let wrapper;
    const dispatch = jest.fn();

    beforeEach(() => {
        const homepage: HomepageStore = {
            movies: [],
            latestMovies: [],
        }
        wrapper = shallow(
            <Homepage
                homepage={homepage}
                dispatch={dispatch}
                history={createMemoryHistory()}
            />
        );
    });

    it('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('should dispatch FETCH_MOVIES twice with simple and latest requests', () => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'FETCH_MOVIES',
            payload: {},
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'FETCH_MOVIES',
            payload: {
                latest: true,
            },
        });
    });
});
