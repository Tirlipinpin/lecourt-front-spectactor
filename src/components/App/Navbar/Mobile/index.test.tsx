import React from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';
import { History, Location } from 'history';

import { MobileNavbar } from '.';
import { NavbarStore } from '../../../../reducers/navbar';
import { match } from 'react-router';
import { WithTranslation } from 'react-i18next';

describe('The Mobile navbar component', () => {
    let wrapper: ShallowWrapper;
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
            <MobileNavbar
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
