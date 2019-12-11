import React from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';
import MoviePoster, { MoviePosterProps } from '../MoviePoster';
import HoverableImageStyles from 'designSystem/HoverableImage/index.module.scss';

describe('The MoviePoster component', () => {
    let wrapper: ShallowWrapper;

    const goToWatch = jest.fn();
    const uuid = 'a9c1aea3-f720-4d3f-b545-b939fbd08680';

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

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });
});