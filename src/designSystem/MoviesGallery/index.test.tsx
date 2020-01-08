import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { History } from 'history';
import { MoviesGallery } from 'designSystem';
import { Movie } from 'components/App/interfaces';
import styles from './index.module.scss';

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

    test('should render the movies fallery containing the carousel when there is movies', () => {
        wrapper.setProps({
            movies: [{
                id: 42,
                title: 'poney',
            }],
        });

        expect(wrapper.find(`.${styles.moviesGalleryContainer}`).length).toBe(1);
    });
});