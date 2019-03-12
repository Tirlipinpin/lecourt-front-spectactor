import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import { match } from 'react-router';
import { History, Location } from 'history';

import { NavbarStore } from '../../../reducers/navbar';
import { Navbar } from '.';


Enzyme.configure({ adapter: new Adapter() });

describe('The Navbar component', () => {
    let wrapper: ShallowWrapper<Navbar>;
    const dispatch = jest.fn();

    beforeEach(() => {
        const match: match = {
            url: 'poney',
        } as match;
        const history: History = {} as History;
        const location: Location = {
            pathname: '',
        } as Location;
        const navbar: NavbarStore = {
            searchTerm: '',
        };

        wrapper = shallow(
            <Navbar
                location={location}
                history={history}
                match={match}
                dispatch={dispatch}
                navbar={navbar}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });

    test('should dispatch a UPDATE_SEARCH_TERM action when updating search term', () => {
        const instance = wrapper.instance() as Navbar;
        instance.onChangeSearchTerm({
            target: {
                value: 'poney',
            },
        });

        expect(dispatch).toHaveBeenCalledWith({
            type: 'UPDATE_SEARCH_TERM',
            payload: 'poney',
        });
    });
});
