import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import StaffGallery from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The StaffGallery component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<StaffGallery />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
