import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import Watch from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The Watch component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Watch location={{}} history={{}} match={{}} />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
