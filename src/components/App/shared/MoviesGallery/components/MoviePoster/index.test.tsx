import React from 'react';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import MoviePoster, { MoviePosterProps } from '.';
import { CardProps } from 'antd/lib/card';

Enzyme.configure({ adapter: new Adapter() });

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

    test('should call getOnClick on clik', () => {
        const cardProps = wrapper.find('.movie-poster-container').props() as CardProps;
        expect(cardProps).toBeTruthy()

        const { cover } = cardProps as any;
        expect(cover).toBeTruthy()

        const imageProps = cover.props.children.props
        imageProps.onClick();

        expect(goToWatch).toHaveBeenCalledWith(uuid);
    });
});