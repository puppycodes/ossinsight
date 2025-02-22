import { ChartResult } from '@site/src/api/explorer';
import React, { useMemo } from 'react';
import { EChartsOption } from 'echarts';
import EChartsReact from 'echarts-for-react';

export default function BarChart ({ chartName, title, x, y, data }: ChartResult & { data: any[] }) {
  const options: EChartsOption = useMemo(() => {
    const isTime = /date|time|year|month/.test(x);

    const makeSeries = function (y: string | string[]) {
      if (typeof y === 'string') {
        return {
          type: 'bar',
          name: y,
          datasetId: 'raw',
          encode: {
            x,
            y,
          },
        };
      } else {
        return y.map(makeSeries);
      }
    };

    return {
      dataset: {
        id: 'raw',
        source: data,
      },
      backgroundColor: 'rgb(36, 35, 43)',
      grid: {
        top: 64,
        left: 8,
        right: 8,
        bottom: 8,
      },
      tooltip: {
      },
      legend: {
        left: 'center',
        top: 28,
      },
      series: makeSeries(y),
      title: {
        text: title,
      },
      xAxis: {
        type: isTime ? 'time' : 'category',
      },
      yAxis: {
        type: 'value',
      },
      animationDuration: 2000,
    };
  }, [chartName, title, x, y, data]);

  return (
    <EChartsReact
      theme='dark'
      style={{
        height: 400,
      }}
      opts={{
        height: 400,
      }}
      option={options}
    />
  );
}
