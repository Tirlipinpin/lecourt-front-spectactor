import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { History } from 'history';

import { Movie } from '../../interfaces';
import MoviesGallery from '.';

describe('The MoviesGallery component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        const history: History = {} as History;
        const movies: Movie[] = [];

        wrapper = shallow(
            <MoviesGallery
                movies={movies}
                history={history}
                loading
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });

    test('should render a loading icon when there is no movies', () => {
        expect(wrapper.find('Loader').exists()).toBe(true);
    });

    test('should render a carousel when there is movies', () => {
        wrapper.setProps({
            movies: [{
                id: 42,
                title: 'poney',
            }],
        });

        expect(wrapper.find('.search-results-container').length).toBe(1);
    });
});