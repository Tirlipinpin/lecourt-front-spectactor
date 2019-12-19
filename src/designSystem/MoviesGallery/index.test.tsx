import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { History } from 'history';
import { MoviesGallery } from 'designSystem';
import { Movie } from 'components/App/interfaces';

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

    test('should render a loading gallery when there is no movies', () => {
        expect(wrapper.find('MoviePosterLoading')).toHaveLength(5);
    });

    test('should render the PoseGroupe containing the carousel when there is movies', () => {
        wrapper.setProps({
            movies: [{
                id: 42,
                title: 'poney',
            }],
        });

        expect(wrapper.find('PoseGroup').length).toBe(1);
    });
});