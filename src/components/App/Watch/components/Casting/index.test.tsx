import React from 'react';
import  { shallow } from 'enzyme';

import Casting from '.';
import { Person } from '../../../interfaces';

describe('The StaffGallery component', () => {
    const person: Person = {
        id: 0,
        first_name: 'poney',
        last_name: 'cheval',
        birth_date: '1958-08-2',
    }
    let wrapper;

    beforeEach(() => {
        wrapper = shallow(<Casting actors={[ { person, role: 'Role' } ]} directors={[ { person } ]} staff={[ { person, job: 'Cameraman' } ]} />);
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});
