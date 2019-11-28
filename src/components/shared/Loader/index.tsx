import React, { FunctionComponent } from 'react';
import { Spin, Icon } from 'antd';

export interface ILoaderProps {
  size?: number | string
  className?: string
}

export const Loader: FunctionComponent<ILoaderProps> = ({ size, className }): React.ReactElement => (
  <Spin
    className={className}
    indicator={
        <Icon
            type="loading"
            style={{ fontSize: size, color: '#FF5242' }}
        />
    }
  />
);

export default Loader;
