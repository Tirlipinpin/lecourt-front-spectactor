import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MoviePoster, { MoviePosterProps } from '.';

Enzyme.configure({ adapter: new Adapter() });

describe('The MoviePoster component', () => {
    let wrapper: ShallowWrapper;
    const goToWatch = jest.fn();

    beforeEach(() => {
        const props = {
            photo: {
                src: 'poney',
                height: 21,
                width: 42,
            },
            goToWatch,
            index: 1234,
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
        wrapper.find('.movie-poster').simulate('click');

        expect(goToWatch).toHaveBeenCalledWith(1234);
    });
});