import HelpCenter from '@/assets/json/help-center.json';
import IconUpgrade from '@/assets/json/upgrade.json';
import LottieIcon from '@/components/lottieIcon';
import { Box, Stack, Tooltip } from '@mui/material';
import { useEffect, useState } from 'react';
import packageJson from '../../../package.json';
import DiamondIcon from '@mui/icons-material/Diamond';
import { useRequest } from 'ahooks';
import { v1LicenseList } from '@/api/License';
import AboutModal from './aboutModal';

const Version = () => {
  const curVersion = import.meta.env.VITE_APP_VERSION || packageJson.version
  const [latestVersion, setLatestVersion] = useState<string | undefined>(undefined)
  const [licenseModalOpen, setLicenseModalOpen] = useState(false)
  const license = useRequest(() => {
    return v1LicenseList({})
  }).data

  const editionText = (edition: any) => {
    if (edition === 0) {
      return '开源版'
    } else if (edition === 1) {
      return '联创版'
    } else if (edition === 2) {
      return '企业版'
    } else {
      return '未知'
    }
  }

  useEffect(() => {
    fetch('https://release.baizhi.cloud/monkeycode/version.txt')
      .then((response) => response.text())
      .then((data) => {
        setLatestVersion(data);
      })
      .catch((error) => {
        console.error(error);
        setLatestVersion('');
      });
  }, []);

  return (
    <>
      <Stack justifyContent={'center'} gap={0.5} sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        p: 0,
        mt: 1,
        cursor: 'pointer',
        color: 'text.primary',
        fontSize: 12,

      }} onClick={() => setLicenseModalOpen(true)}>
        <Box sx={{
          borderRadius: '8px',
          p: 1,
          mt: 1,
          mb: -1,
          '&:hover': {
            backgroundColor: 'background.paper'
          }
        }}>

          <Stack direction={'row'} alignItems="center" gap={0.5}>
            <Box sx={{ width: 40, color: 'text.auxiliary' }}>型号</Box>
            <DiamondIcon style={{ 
              width: 13, 
              height: 13,
              color: license && license.edition === 0 ? 'rgba(33,34,45, 0.2)' : '#35B37E'
            }} />
            {editionText(license?.edition)}
          </Stack>
          <Stack direction={'row'} gap={0.5}>
            <Box sx={{ width: 40, color: 'text.auxiliary' }}>版本</Box>
            <Box sx={{ whiteSpace: 'nowrap' }}>{curVersion}</Box>
            {latestVersion !== `${curVersion}` && <Tooltip
              placement='top'
              arrow
              title={latestVersion === '' ? '无法获取最新版本' : '检测到新版本，点击查看'}
            >
              <Box>
                <LottieIcon
                  id='version'
                  src={latestVersion === '' ? HelpCenter : IconUpgrade}
                  style={{ width: 16, height: 16 }}
                />
              </Box>
            </Tooltip>}
          </Stack>
        </Box>
      </Stack>
      <AboutModal
        open={licenseModalOpen}
        onClose={() => setLicenseModalOpen(false)}
        latestVersion={latestVersion || ''}
        curVersion={curVersion}
        license={license}      />
    </>
  )
};

export default Version;
