import React, { PureComponent } from 'react';
import { Icon } from 'antd';

export interface PureComponentProps {
    direction: string,
    onClick: () => void,
};

export default class CarouselArrow extends PureComponent<PureComponentProps, {}> {
    render() {
        const { direction, onClick } = this.props;

        return (
            <div>
                <Icon type={`arrow-${direction}`} style={{ cursor: 'pointer' }} onClick={onClick} />
            </div>
        );
    }
};
