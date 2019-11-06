import React from 'react';
import  { shallow, ShallowWrapper } from 'enzyme';
import { Redirect, match } from 'react-router';

import { History, Location } from 'history';

import { App } from '.';
import styles from './index.module.scss';
import { LoginStore } from '../../reducers/login';

describe('The App component', () => {
    let wrapper: ShallowWrapper;
    const dispatch = jest.fn();

    beforeEach(() => {
        const match: match = {} as match;
        const history: History = {} as History;
        const location: Location = {} as Location;
        const login: LoginStore = {
            token: 'something',
            loading: false,
            rememberMe: true,
        };

        wrapper = shallow(
            <App
                match={match}
                history={history}
                location={location}
                login={login}
                dispatch={dispatch}
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });

    test('should redirect when user is not logged', () => {
        wrapper.setProps({
            login: {
                token: null,
                loading: false,
            }
        })

        expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    test('should display app when user is logged', () => {
        expect(wrapper.find(`.${styles.appWrapper}`)).toHaveLength(1);
    });
});