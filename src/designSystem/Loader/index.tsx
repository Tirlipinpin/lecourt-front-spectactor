import React, { FunctionComponent } from 'react';
import { Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

export interface ILoaderProps {
  size?: number | string
  className?: string
}

export const Loader: FunctionComponent<ILoaderProps> = ({ size, className }): React.ReactElement => (
  <Spin
    className={className}
    indicator={
        <LoadingOutlined
            style={{ fontSize: size, color: '#FF5242' }}
        />
    }
  />
);

export default Loader;
