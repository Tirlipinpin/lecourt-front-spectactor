import React from 'react';
import { CardProps } from 'antd/lib/card';
import  { shallow, ShallowWrapper } from 'enzyme';

import MoviePoster, { MoviePosterProps } from '../MoviePoster';
import styles from './index.module.scss';

describe('The MoviePoster component', () => {
    let wrapper: ShallowWrapper;
    const goToWatch = jest.fn();
    const uuid = "a9c1aea3-f720-4d3f-b545-b939fbd08680";

    beforeEach(() => {
        const props = {
            goToWatch,
            movie: {
                id: uuid,
                title: 'chapeau',
                images: [],
            },
        } as unknown;

        wrapper = shallow(
            <MoviePoster
                {...props as MoviePosterProps}
            />
        );
    });


    test('should call getOnClick on click', () => {
        wrapper.find(`.${styles.hover}`).simulate('click');

        expect(goToWatch).toHaveBeenCalledWith(uuid);
    });
});