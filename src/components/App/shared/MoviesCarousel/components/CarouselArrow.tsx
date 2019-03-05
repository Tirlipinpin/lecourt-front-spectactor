import React, { PureComponent } from 'react';
import { Icon } from 'antd';

export interface CarouselArrowProps {
    direction: string,
    className: string,
    onClick: () => void,
};

export default class CarouselArrow extends PureComponent<CarouselArrowProps> {
    render() {
        const { direction, onClick } = this.props;

        return (
            <div>
                <Icon type={`arrow-${direction}`} style={{ cursor: 'pointer' }} onClick={onClick} />
            </div>
        );
    }
};
