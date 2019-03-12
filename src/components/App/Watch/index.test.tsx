import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, ShallowWrapper } from 'enzyme';
import { Icon } from 'antd';
import { Location, History } from 'history';

import { WatchStore } from '../../../reducers/watch';
import { Movie } from '../interfaces';
import { Watch } from '.';
import NotFound from '../../NotFound';

Enzyme.configure({ adapter: new Adapter() });

describe('The Watch component', () => {
    let wrapper: ShallowWrapper;
    const dispatch = jest.fn();

    beforeEach(() => {
        const location: Location = {} as Location;
        const history: History = {} as History;
        const watch: WatchStore = {
            loading: false,
            notFound: false,
            movie: {} as Movie,
        };
        const match = {
            params: {
                id: 42,
            },
        };

        wrapper = shallow(
            <Watch
                location={location}
                history={history}
                match={match}
                dispatch={dispatch}
                watch={watch}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });

    test('should dispatch a FETCH_MOVIE_DETAILS action when mounted', () => {
        expect(dispatch).toHaveBeenCalledWith({
            type: 'FETCH_MOVIE_DETAILS',
            payload: {
                id: 42,
            },
        });
    });

    test('should render a loading Icon when fetching datas', () => {
        wrapper.setProps({
            watch: {
                loading: true,
                movie: {},
                notFound: false,
            }
        });

        expect(wrapper.find(Icon).props()).toEqual({
            type: 'loading',
        });
    });

    test('should render NotFound component when fetching datas', () => {
        wrapper.setProps({
            watch: {
                loading: false,
                movie: {},
                notFound: true,
            },
        });

        expect(wrapper.find(NotFound).props()).toEqual({
            title: 'No short found for this id...',
        });
    });
});
