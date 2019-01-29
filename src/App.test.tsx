import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import { Redirect } from 'react-router';

import { App } from './App';

Enzyme.configure({ adapter: new Adapter() });

describe('The App component', () => {

    it('should render correctly', () => {
        const store = {
            logged: true,
            loading: false,
        };

        const wrapper = shallow(
            <App
                match={{}}
                history={{}}
                login={store}
                dispatch={() => {}}
            />
        );

        expect(wrapper.length).toBe(1);
    });

    it('should redirect when user is not logged', () => {
        const store = {
            logged: false,
            loading: false,
        };

        const wrapper = shallow(
            <App
                match={{}}
                history={{}}
                login={store}
                dispatch={() => {}}
            />
        );

        expect(wrapper.find(Redirect)).toHaveLength(1);
    });

    it('should display app when user is logged', () => {
        const store = {
            logged: true,
            loading: false,
        };

        const wrapper = shallow(
            <App
                match={{}}
                history={{}}
                login={store}
                dispatch={() => {}}
            />
        );

        expect(wrapper.find('.app-wrapper')).toHaveLength(1);
    });
});