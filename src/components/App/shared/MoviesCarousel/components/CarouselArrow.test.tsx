import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import CarouselArrow from './CarouselArrow';

Enzyme.configure({ adapter: new Adapter() })

describe('the Homepage component', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(
            <CarouselArrow
                direction="left"
                onClick={jest.fn}
                className="poney"
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });
});
