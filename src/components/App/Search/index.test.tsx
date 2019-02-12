import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import { Search } from '.';

Enzyme.configure({ adapter: new Adapter() })

describe('the Homepage component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Search match={{}} history={{}} location={{}} dispatch={jest.fn} navbar={{ searchTerm: '' }} />);
    });

    it('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});
