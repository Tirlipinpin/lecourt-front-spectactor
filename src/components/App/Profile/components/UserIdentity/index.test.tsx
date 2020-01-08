import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import UserIdentity, { IUserIdentityProps } from '.';
import defaultAvatar from './assets/avatar.jpg';
import styles from './index.module.scss';

describe.skip('UserIdentity', () => {
    let wrapper: ShallowWrapper<IUserIdentityProps>;

    beforeEach(() => {
        wrapper = shallow(<UserIdentity loading={false} />);
    });

    test('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });

    test('should render the Container if loading if false', () => {
        expect(wrapper.find(`.${styles.container}`).exists()).toBe(true);
    });

    test('should render an avatar with the given url if there is one', () => {
        wrapper.setProps({ avatarUrl: 'poney' });

        expect(wrapper.find(`.${styles.avatar}`).props().src).toBe('poney');
    });

    test('should render the default avatar if there is no given url', () => {
        expect(wrapper.find(`.${styles.avatar}`).props().src).toBe(defaultAvatar);
    });

    test('should render the displayName if there is one', () => {
        wrapper.setProps({ displayName: 'Poney' });

        expect(wrapper.find(`.${styles.displayName}`).contains('Poney')).toBe(true);
    });

    test('should render the first name and the last name if there is no display name', () => {
        wrapper.setProps({ firstName: 'Poney', lastName: 'Magique' });

        expect(wrapper.find(`.${styles.displayName}`).contains('Poney Magique')).toBe(true);
    });

    test('should render the loading container if loading is true', () => {
        wrapper.setProps({ loading: true });

        expect(wrapper.find(`.${styles.loadingContainer}`));
    });
});
