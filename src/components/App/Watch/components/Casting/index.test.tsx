import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow } from 'enzyme';

import Casting from '.';
import { Person } from '../../../interfaces';

Enzyme.configure({ adapter: new Adapter() });

describe('The StaffGallery component', () => {
    const person: Person = {
        id: 0,
        firstName: 'poney',
        lastName: 'cheval',
        birthDate: '1958-08-2',
    }
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Casting actors={[ { node: person, role: 'Role' } ]} directors={[ { node: person } ]} staff={[ { node: person, job: 'Cameraman' } ]} />);
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
