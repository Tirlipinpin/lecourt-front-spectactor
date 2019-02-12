import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import NotFound from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The NotFound component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<NotFound />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
