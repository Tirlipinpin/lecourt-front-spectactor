import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MoviePoster, { MoviePosterProps } from '.';
import { CardProps } from 'antd/lib/card';

Enzyme.configure({ adapter: new Adapter() });

describe('The MoviePoster component', () => {
    let wrapper: ShallowWrapper;
    const goToWatch = jest.fn();

    beforeEach(() => {
        const props = {
            goToWatch,
            movie: {
                id: 4321,
                title: 'chapeau',
            },
        } as unknown;

        wrapper = shallow(
            <MoviePoster
                {...props as MoviePosterProps}
            />
        );
    });

    test('should call getOnClick on clik', () => {
        const props = wrapper.find('.movie-poster-container').props() as CardProps;
        const Image = props.cover as any;

        Image.props.onClick();

        expect(goToWatch).toHaveBeenCalledWith(4321);
    });
});