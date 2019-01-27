import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { Homepage } from '.';

Enzyme.configure({ adapter: new Adapter() })

describe('the Homepage component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Homepage homepage={{ page: 'poney' }} />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});