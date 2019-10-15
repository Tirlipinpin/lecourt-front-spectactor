import React from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';
import { match } from 'react-router';
import { History, Location } from 'history';

import { NavbarStore } from '../../../reducers/navbar';
import { Navbar } from '.';
import { WithTranslation } from 'react-i18next';

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
            genres: [],
        };
        const i18n = {
            t: jest.fn(),
        } as unknown;

        wrapper = shallow(
            <Navbar
                location={location}
                history={history}
                match={match}
                dispatch={dispatch}
                navbar={navbar}
                {...i18n as WithTranslation}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
