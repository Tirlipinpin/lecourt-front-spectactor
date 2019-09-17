import React from 'react';
import Enzyme, { shallow } from 'enzyme';

import NotFound from '.';

describe('The NotFound component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <NotFound
                title="poney"
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
