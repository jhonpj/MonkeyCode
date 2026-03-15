import React, { useMemo } from 'react';
import Card from '@/components/card';
import { Stack, Box, styled } from '@mui/material';
import LineCharts from './lineCharts';
import { useRequest } from 'ahooks';
import { getGetTokenUsage } from '@/api/Model';
import { addCommasToNumber, getRecentDaysData } from '@/utils';
import { DomainModelTokenUsage } from '@/api/types';

export const StyledHighlight = styled('span')(({ theme }) => ({
  fontSize: 18,
  color: theme.palette.text.primary,
  fontWeight: 700,
}));

const StyledTokenWrapper = styled(Stack)(({ theme }) => ({
  width: 200,
  fontSize: 14,
  backgroundColor: theme.vars.palette.grey[50],
  borderRadius: '10px',
  padding: theme.spacing(1.5),
}));

const TokenUsage = () => {
  const { data: llmModelData } = useRequest(() =>
    getGetTokenUsage({
      model_type: 'llm',
    })
  );
  const { data: coderModelData } = useRequest(() =>
    getGetTokenUsage({
      model_type: 'coder',
    })
  );

  const { llmInputData, llmOutputData } = useMemo(() => {
    return {
      llmInputData: getRecentDaysData(
        (llmModelData?.input_usage as Required<DomainModelTokenUsage>[]) || []
      ),
      llmOutputData: getRecentDaysData(
        (llmModelData?.output_usage as Required<DomainModelTokenUsage>[]) || []
      ),
    };
  }, [llmModelData]);

  const { coderInputData, coderOutputData } = useMemo(() => {
    return {
      coderInputData: getRecentDaysData(
        (coderModelData?.input_usage as Required<DomainModelTokenUsage>[]) || []
      ),
      coderOutputData: getRecentDaysData(
        (coderModelData?.output_usage as Required<DomainModelTokenUsage>[]) ||
          []
      ),
    };
  }, [coderModelData]);

  return (
    <Card>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Box sx={{ fontWeight: 700 }}>Token 使用量</Box>
        <Box sx={{ fontSize: 12, color: 'text.tertiary' }}>最近 90 天</Box>
      </Stack>
      <Stack gap={2} sx={{ mt: 2 }}>
        <Stack direction='row' alignItems='center' gap={2}>
          <StyledTokenWrapper>
            <StyledHighlight>
              {addCommasToNumber(llmModelData?.total_input)}
            </StyledHighlight>
            <Box sx={{ color: 'text.tertiary', fontSize: 12 }}>
              对话模型 - 输入 Token
            </Box>
          </StyledTokenWrapper>
          <LineCharts data={llmInputData} name='输入 Token' />
        </Stack>
        <Stack direction='row' gap={2} alignItems='center'>
          <StyledTokenWrapper>
            <StyledHighlight>
              {addCommasToNumber(llmModelData?.total_output)}
            </StyledHighlight>
            <Box sx={{ color: 'text.tertiary', fontSize: 12 }}>
              对话模型 - 输出 Token
            </Box>
          </StyledTokenWrapper>
          <LineCharts data={llmOutputData} name='输出 Token' />
        </Stack>
        <Stack direction='row' gap={2} alignItems='center'>
          <StyledTokenWrapper>
            <StyledHighlight>
              {addCommasToNumber(coderModelData?.total_input)}
            </StyledHighlight>
            <Box sx={{ color: 'text.tertiary', fontSize: 12 }}>
              代码补全模型 - 输入 Token
            </Box>
          </StyledTokenWrapper>
          <LineCharts data={coderInputData} name='输入 Token' />
        </Stack>
        <Stack direction='row' gap={2} alignItems='center'>
          <StyledTokenWrapper>
            <StyledHighlight>
              {addCommasToNumber(coderModelData?.total_output)}
            </StyledHighlight>
            <Box sx={{ color: 'text.tertiary', fontSize: 12 }}>
              代码补全模型 - 输出 Token
            </Box>
          </StyledTokenWrapper>

          <LineCharts data={coderOutputData} name='输出 Token' />
        </Stack>
      </Stack>
    </Card>
  );
};

export default TokenUsage;
