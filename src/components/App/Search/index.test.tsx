import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import Search from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The Search component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Search location={{}} history={{}} match={{}} />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
