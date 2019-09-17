import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { createMemoryHistory } from 'history'

import { HomepageStore } from '../../../reducers/homepage';
import { Homepage } from '.';

describe('the Homepage component', () => {
    let wrapper;
    const dispatch = jest.fn();

    beforeEach(() => {
        const homepage: HomepageStore = {
            movies: [],
            latestMovies: [],
        };
        wrapper = shallow(
            <Homepage
                homepage={homepage}
                dispatch={dispatch}
                history={createMemoryHistory()}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });

    test('should dispatch twice FETCH_LATEST_MOVIES', () => {
        expect(dispatch).toHaveBeenNthCalledWith(1, {
            type: 'FETCH_LATEST_MOVIES',
        });

        expect(dispatch).toHaveBeenNthCalledWith(2, {
            type: 'FETCH_LATEST_MOVIES',
        });
    });
});
