import React, { useRef, useEffect } from 'react';
import * as echarts from 'echarts';
import { Box, Stack } from '@mui/material';

interface IPieChartsProps {
  title: React.ReactNode;
  extra?: React.ReactNode;
  data: {
    category?: string;
    value?: number;
  }[];
}

const PieCharts: React.FC<IPieChartsProps> = ({ title, data, extra }) => {
  const domRef = useRef(null);
  const echartsRef = useRef<echarts.ECharts>(null);

  useEffect(() => {
    if (!echartsRef.current) {
      echartsRef.current = echarts.init(domRef.current);
    }

    const chart = echartsRef.current;
    chart.setOption({
      tooltip: {
        trigger: 'item',
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'center',
        formatter: function (name: string) {
          return name.length > 10 ? name.substring(0, 10) + '...' : name;
        },
      },
      dataset: {
        source: data.slice(0, 5),
      },
      series: [
        {
          type: 'pie',
          radius: ['40%', '70%'],
          center: ['30%', '50%'],
          avoidLabelOverlap: false,
          itemStyle: {
            borderRadius: 10,
            borderColor: '#fff',
            borderWidth: 2,
          },
          label: {
            show: false,
            position: 'center',
          },
          emphasis: {
            label: {
              // show: true,
              fontSize: 40,
              fontWeight: 'bold',
            },
          },
          labelLine: {
            show: false,
          },
          encode: {
            value: 'value',
            itemName: 'category',
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
  }, [data]);

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

export default PieCharts;
