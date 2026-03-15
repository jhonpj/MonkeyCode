import Card from '@/components/card';
import { Box, Stack } from "@mui/material"
import AdminUser from './adminUser';
import AdminLoginHistory from './adminLoginHistory';


const CardAdminUser = () => {

  return <Card sx={{ p : 0, }}>
    <Box sx={{
      fontWeight: 'bold',
      px: 2,
      py: 1.5,
      bgcolor: 'rgb(248, 249, 250)',
      borderTopLeftRadius: '10px',
      borderTopRightRadius: '10px',
    }}>管理员配置</Box>
    <Stack direction='column'>
      <AdminUser />
      <AdminLoginHistory />
    </Stack>
  </Card>
}

export default CardAdminUser;