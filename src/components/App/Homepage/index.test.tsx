import React from 'react';
import { shallow } from 'enzyme';
import { createMemoryHistory } from 'history'
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { Homepage } from '.';

describe('the Homepage component', () => {
    let wrapper;

    beforeEach(() => {
        const store = {
            getState: jest.fn(),
        } as unknown;
        wrapper = shallow(
            <Provider store={store as Store} >
                <Homepage
                    history={createMemoryHistory()}
                />
            </Provider>
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});
