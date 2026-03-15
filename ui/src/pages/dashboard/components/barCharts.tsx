import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { Box, Stack } from '@mui/material';

interface IBarChartsProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
  data: {
    xData: (string | number)[];
    yData: number[];
  };
}

const BarCharts: React.FC<IBarChartsProps> = ({ title, data, extra }) => {
  const { xData, yData } = data;
  const domRef = useRef(null);
  const echartsRef = useRef<echarts.ECharts>(null);

  useEffect(() => {
    if (!echartsRef.current) {
      echartsRef.current = echarts.init(domRef.current);
    }

    const chart = echartsRef.current;
    chart.setOption({
      xAxis: {
        type: 'category',
        data: xData,
        splitLine: {
          show: false,
        },
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
      },
      grid: {
        left: 0,
        right: 0,
        bottom: 10,
        top: 10,
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (
          params: { seriesName: string; name: string; value: number }[]
        ) => {
          if (params[0]) {
            const { name, seriesName, value } = params[0];
            return `<div style="font-family: G;">${name}<div>${seriesName} ${
              value || 0
            }</div></div>`;
          }
          return '';
        },
      },

      yAxis: {
        type: 'value',
        splitNumber: 4,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        axisLabel: {
          show: false,
        },
        splitLine: {
          lineStyle: {
            type: 'dashed',
            color: '#F2F3F5',
          },
        },
      },
      series: [
        {
          data: yData,
          type: 'bar',
          name: title,
          barGap: 0,
          barMinHeight: 4,
          itemStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: '#3248F2' },
                { offset: 1, color: '#9E68FC' },
              ],
            },
            borderRadius: [4, 4, 0, 0],
          },
        },
      ],
    });

    // 添加 resize 监听器
    const handleResize = () => {
      echartsRef.current!.resize();
    };

    window.addEventListener('resize', handleResize);

    // 清理函数
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [data, title]);

  return (
    <Stack
      sx={{
        background: '#fff',
        borderRadius: '10px',
        p: 2,
      }}
    >
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Box sx={{ fontWeight: 700 }}>{title}</Box>
        <Box sx={{ fontSize: 12, color: 'text.tertiary' }}>{extra}</Box>
      </Stack>

      <div ref={domRef} style={{ height: 144 }}></div>
    </Stack>
  );
};

export default BarCharts;
