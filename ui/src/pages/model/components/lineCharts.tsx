import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { Box, Stack } from '@mui/material';

interface ILineChartsProps {
  data: {
    xData: any[];
    yData: any[];
  };
  name: string;
}

const LineCharts: React.FC<ILineChartsProps> = ({ data, name }) => {
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
            return `<div style="font-family: G;">${name}<div>${seriesName} ${value}</div></div>`;
          }
          return '';
        },
      },
      series: [
        {
          name,
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
  }, [data, name]);

  return <Box sx={{ flex: 1, height: 60, minWidth: 0 }} ref={domRef} />;
};

export default LineCharts;
