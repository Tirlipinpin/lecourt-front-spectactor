import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { Register } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The Register component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Register dispatch={() => {}} />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});
