import React from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import { match } from 'react-router';
import { History, Location } from 'history';
import Navbar from '.';

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
        const store = {
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            replaceReducer: jest.fn(),
            getState: jest.fn(),
        } as unknown;

        wrapper = shallow(
            <Provider store={ store as Store}>
                <Navbar
                    location={location}
                    history={history}
                    match={match}
                />
            </Provider>
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
