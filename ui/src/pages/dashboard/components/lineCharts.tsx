import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { Box, Stack } from '@mui/material';

interface ILineChartsProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
  data: {
    xData: (string | number)[];
    yData: number[];
  };
  formatValueTooltip?: (value: number) => string;
}

const LineCharts: React.FC<ILineChartsProps> = ({
  title,
  data,
  extra,
  formatValueTooltip,
}) => {
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
        show: false,
        data: xData,
        axisLine: {
          show: false,
        },
        axisTick: {
          show: false,
        },
        splitLine: {
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
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow',
        },
        formatter: (
          params: { name: string; seriesName: string; value: number }[]
        ) => {
          if (params[0]) {
            const { name, seriesName, value } = params[0];
            return `<div style="font-family: G;">${name}<div>${seriesName} ${
              formatValueTooltip ? formatValueTooltip(value) : value
            }</div></div>`;
          }
          return '';
        },
      },
      series: [
        {
          name: title,
          data: yData,
          type: 'line',
          lineStyle: {
            color: {
              type: 'linear',
              x: 0, // 起点 x 坐标（0: 左侧）
              y: 0, // 起点 y 坐标（0: 顶部）
              x2: 1, // 终点 x 坐标（1: 右侧）
              y2: 1, // 终点 y 坐标（0: 保持顶部，形成水平渐变）
              colorStops: [
                { offset: 0, color: '#9E68FC' }, // 起始颜色
                { offset: 1, color: '#3248F2' }, // 结束颜色
              ],
            },
          },
          areaStyle: {
            color: {
              type: 'linear',
              x: 0,
              y: 0,
              x2: 0,
              y2: 1,
              colorStops: [
                { offset: 0, color: 'rgba(158,104,252,0.1)' },
                { offset: 1, color: 'rgba(50,72,242,0)' },
              ],
              global: false,
            },
          },
        },
      ],
    });

    // 添加 resize 监听器
    const handleResize = () => {
      chart.resize();
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

export default LineCharts;
