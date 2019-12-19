import React from 'react';
import MoviePosterLoading, { IMoviePosterLoadingProps } from '.';
import { shallow, ShallowWrapper } from 'enzyme';
import styles from './index.module.scss';

describe('MoviePosterLoading', () => {
    let wrapper: ShallowWrapper<IMoviePosterLoadingProps>;

    beforeEach(() => {
        wrapper = shallow(<MoviePosterLoading />);
    });

    test('should render correctly', () => {
        expect(wrapper).toHaveLength(1);
    });

    test('should have a false image', () => {
        expect(wrapper.find(`.${styles.image}`)).toHaveLength(1);
    });

    test('should have a false title', () => {
        expect(wrapper.find(`.${styles.title}`)).toHaveLength(1);
    });

    test('should have a false genres', () => {
        expect(wrapper.find(`.${styles.genres}`)).toHaveLength(1);
    });
});
