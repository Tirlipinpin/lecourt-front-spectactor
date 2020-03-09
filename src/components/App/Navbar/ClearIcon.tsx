import React, { PureComponent } from 'react';
import posed from 'react-pose';
import { CloseCircleFilled } from '@ant-design/icons';

export interface ClearIconProps {
    termLength: Number
    onChangeSearchTerm: ((e: any) => void)
}

const Box = posed.span({
    hidden: {
        opacity: 0,
        transition: {
            duration: 200,
        },
    },
    visible: {
        opacity: 1,
        transition: {
            duration: 200,
        },
    },
});

export default class ClearIcon extends PureComponent<ClearIconProps> {
    render() {
        const { termLength, onChangeSearchTerm } = this.props;

        return (
            <Box pose={ termLength > 0 ? 'visible': 'hidden' } >
                <CloseCircleFilled
                    onClick={() => onChangeSearchTerm({
                        target: {
                            value: '',
                        },
                    })}
                    style={{
                        color: 'rgba(0,0,0,.25)',
                        fontSize: 12,
                    }}
                />
            </Box>
        );
    }
};
