import * as React from 'react';
import Axis from '../Axis';

const YAxis = ({ type = 'linear', ...restProps }) => (
  <Axis type={type} {...restProps} isX={false} />
);

YAxis.displayName = 'YAxis';

YAxis.Title = Axis.Title;
export default YAxis;
