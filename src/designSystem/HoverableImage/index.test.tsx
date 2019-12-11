import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import HoverableImage from '.';
import styles from './index.module.scss';

describe('HoverableImage', () => {
    let wrapper: ShallowWrapper;
    const goTo = jest.fn();

    beforeEach(() => {
        wrapper = shallow(
            <HoverableImage
                alt="poney"
                coverContent={
                    <button className="poney-button">
                        Poney
                    </button>
                }
                goTo={goTo}
                src="some src"
            />
        );
    });

    test('should render correctly', () => {
        expect(wrapper.length).toBe(1);
    });

    test('should call goTo when clicking on the hover', () => {
        const cover = wrapper.find(`.${styles.hover}`);

        cover.simulate('click');

        expect(goTo).toHaveBeenCalled();
    });
});
