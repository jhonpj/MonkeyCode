import { useState } from 'react';
import { Stack, MenuItem, Select } from '@mui/material';
import { getUserProfile } from '@/api/UserManage';
import { useRequest } from 'ahooks';
import MemberStatistic from './components/memberStatistic';

export type TimeRange = '90d' | '24h';

const Dashboard = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('24h');

  const { data: userData = {} } = useRequest(getUserProfile);

  return (
    <Stack gap={2} sx={{ height: '100%' }}>
      <Stack direction='row' justifyContent='space-between' alignItems='center'>
        <Select
          labelId='time-range-label'
          value={timeRange}
          size='small'
          onChange={(e) => setTimeRange(e.target.value as TimeRange)}
          sx={{ fontSize: 14 }}
          disabled
        >
          <MenuItem value='24h'>最近 24 小时</MenuItem>
          <MenuItem value='90d'>最近 90 天</MenuItem>
        </Select>
      </Stack>

      <MemberStatistic memberData={userData as any} timeRange={timeRange} />
    </Stack>
  );
};

export default Dashboard;
