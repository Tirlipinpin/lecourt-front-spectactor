import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import { Provider } from 'react-redux';
import { Store } from 'redux';

import { Homepage, IHomepageProps } from '.';

describe('the Homepage component', () => {
    let wrapper: ShallowWrapper<IHomepageProps>;

    beforeEach(() => {
        const store = {
            getState: jest.fn(),
        } as unknown;
        const path = `/route/:id`;

        const match: match<{ id: string }> = {
            isExact: false,
            path,
            url: path.replace(':id', '1'),
            params: { id: "1" }
        };

        const location = createLocation(match.url);
        wrapper = shallow(
            <Provider store={store as Store} >
                <Homepage
                    history={createMemoryHistory()}
                    location={location}
                    match={match}
                />
            </Provider>
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});
