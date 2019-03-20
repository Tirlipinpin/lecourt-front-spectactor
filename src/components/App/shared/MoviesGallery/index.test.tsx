import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { Icon } from 'antd';
import { History } from 'history';

import { Movie } from '../../interfaces';
import MoviesGallery from '.';


Enzyme.configure({ adapter: new Adapter() });

describe('The MoviesGallery component', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        const history: History = {} as History;
        const movies: Movie[] = [];

        wrapper = shallow(
            <MoviesGallery
                movies={movies}
                history={history}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });

    test('should render a loading icon when there is no movies', () => {
        expect(wrapper.find(Icon).props()).toEqual({
            type: 'loading',
        });
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