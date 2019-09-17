import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import Profile from '.';

describe('The Profile component', () => {
    let wrapper;

    beforeEach(() => {
        const store = {
            subscribe: jest.fn(),
            dispatch: jest.fn(),
            replaceReducer: jest.fn(),
            getState: jest.fn(),
        } as unknown;

        wrapper = shallow(
          <Provider store={store as Store}>
            <Profile />
          </Provider>
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
