import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';

import { Movie } from '../../../../interfaces';
import MoviePoster from '.';

Enzyme.configure({ adapter: new Adapter() })

describe('the MoviePoster component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        const movie: Movie = {
            id: 42,
            title: 'poney',
            images: [{
                    id: 'chapeau',
            }],
        } as Movie;

        wrapper = shallow(
            <MoviePoster
                movie={movie}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toEqual(1);
    });

    test('should not display content when the picture isn\'t hovered', () => {
        expect(wrapper.find('.movie-poster-hover-content').length).toBe(0);
    });

    test('should display content when the picture is hovered', () => {
        wrapper.setState({
            hovering: true,
        });

        expect(wrapper.find('.movie-poster-hover-content').length).toBe(1);
    });
});
