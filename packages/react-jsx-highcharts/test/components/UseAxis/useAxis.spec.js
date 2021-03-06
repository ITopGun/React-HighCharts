import * as React from 'react';
import { render } from '@testing-library/react';

import useAxis from '../../../src/components/UseAxis';
import AxisContext from '../../../src/components/AxisContext';
import ChartContext from '../../../src/components/ChartContext';
import { createMockAxis } from '../../test-utils';
import * as createProvidedAxis from '../../../src/components/Axis/createProvidedAxis';

describe('useAxis', () => {
  let ChildComponent;
  let testAxis;
  let testChart;
  let axisCallback;
  beforeEach(() => {
    jest.useFakeTimers();

    testAxis = createMockAxis();

    testChart = {
      get: jest.fn().mockImplementation(() => testAxis)
    };
    axisCallback = jest.fn();

    jest.spyOn(createProvidedAxis, 'default').mockImplementation(c => c);

    ChildComponent = props => {
      const axis = useAxis(props.axisId);
      axisCallback(axis);
      return null;
    };
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  it('should return axis from context', () => {
    render(
      <AxisContext.Provider value={testAxis}>
        <ChildComponent />
      </AxisContext.Provider>
    );

    expect(axisCallback).toHaveBeenCalledWith(testAxis);
  });

  it('should return axis outside the context', () => {
    render(
      <ChartContext.Provider value={testChart}>
        <ChildComponent axisId="myAxisId" />
      </ChartContext.Provider>
    );

    expect(testChart.get).toHaveBeenCalledWith('myAxisId');
    expect(axisCallback).toHaveBeenCalledWith(testAxis);
  });
});
