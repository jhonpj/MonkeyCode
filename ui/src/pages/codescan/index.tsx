import { useRequest } from 'ahooks';
import { getListUser } from '@/api/User';
import CodeScanTaskList from '../../components/codescan/taskList';

const AdminCodeScanTaskList = (
) => {
  const res = useRequest(() => {
    return getListUser({
      page: 1,
      size: 9999,
    })
  })

  return (
    <CodeScanTaskList admin={true} users={res.data?.users || []}/>
  );
};

export default AdminCodeScanTaskList;
