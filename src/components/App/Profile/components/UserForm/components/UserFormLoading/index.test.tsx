import React from 'react';
import UserFormLoading, { IUserFormLoadingProps } from '.';
import { shallow, ShallowWrapper } from 'enzyme';

describe('UserFormLoading', () => {
    let wrapper: ShallowWrapper<IUserFormLoadingProps>;

    beforeEach(() => {
        wrapper = shallow(<UserFormLoading />)
    });

    test('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });
});
