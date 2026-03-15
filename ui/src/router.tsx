import LinearProgress from '@mui/material/LinearProgress';
import { styled } from '@mui/material/styles';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import MainLayout from './layouts/mainLayout';
import { type LazyExoticComponent, Suspense, forwardRef, lazy } from 'react';
import { type JSX } from 'react/jsx-runtime';

const LoaderWrapper = styled('div')({
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 1301,
  width: '100%',
});

const Loader = () => (
  <LoaderWrapper>
    <LinearProgress color='primary' />
  </LoaderWrapper>
);

const LazyLoadable = (
  Component: LazyExoticComponent<() => JSX.Element>
): React.ForwardRefExoticComponent<any> =>
  forwardRef((props: any, ref: React.Ref<any>) => (
    <Suspense fallback={<Loader />}>
      <Component {...props} ref={ref} />
    </Suspense>
  ));

const Dashboard = LazyLoadable(lazy(() => import('@/pages/dashboard')));
const Chat = LazyLoadable(lazy(() => import('@/pages/chat')));
const Completion = LazyLoadable(lazy(() => import('@/pages/completion')));
const Model = LazyLoadable(lazy(() => import('@/pages/model')));
const MemberManage = LazyLoadable(lazy(() => import('@/pages/memberManage')));
const GeneralSetting = LazyLoadable(lazy(() => import('@/pages/generalSetting')));
const Invite = LazyLoadable(lazy(() => import('@/pages/invite')));
const Auth = LazyLoadable(lazy(() => import('@/pages/auth')));
const Login = LazyLoadable(lazy(() => import('@/pages/login')));
const UserLogin = LazyLoadable(lazy(() => import('@/pages/user/login')));
const Expectation = LazyLoadable(lazy(() => import('@/pages/expectation')));
const UserChat = LazyLoadable(lazy(() => import('@/pages/user/chat')));
const AdminCodeScan = LazyLoadable(lazy(() => import('@/pages/codescan')));
const AdminEmployee = LazyLoadable(lazy(() => import('@/pages/employee')));
const UserCodeScan = LazyLoadable(lazy(() => import('@/pages/user/codescan')));
const UserCompletion = LazyLoadable(
  lazy(() => import('@/pages/user/completion'))
);
const UserSetting = LazyLoadable(lazy(() => import('@/pages/user/setting')));

const UserDashboard = LazyLoadable(
  lazy(() => import('@/pages/user/dashboard'))
);

const routerConfig = [
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/dashboard' replace />,
      },
      {
        path: 'dashboard/:tab?/:id?',
        element: <Dashboard />,
      },
      {
        path: 'chat',
        element: <Chat />,
      },
      {
        path: 'codescan',
        element: <AdminCodeScan/>,
      },
      {
        path: 'completion',
        element: <Completion />,
      },
      {
        path: 'employee',
        element: <AdminEmployee />,
      },
      {
        path: 'member-management',
        element: <MemberManage />,
      },
      {
        path: 'general-setting',
        element: <GeneralSetting />,
      },
    ],
  },

  {
    path: '/user',
    element: <MainLayout />,
    children: [
      {
        index: true,
        element: <Navigate to='/user/dashboard' replace />,
      },
      {
        path: 'dashboard',
        element: <UserDashboard />,
      },
      {
        path: 'chat',
        element: <UserChat />,
      },
      {
        path: 'completion',
        element: <UserCompletion />,
      },
      {
        path: 'codescan',
        element: <UserCodeScan />,
      },
      {
        path: 'employee',
        element: <AdminEmployee />,
      },
      {
        path: 'setting',
        element: <UserSetting />,
      },
    ],
  },
  {
    path: '/invite/:id/:step?',
    element: <Invite />,
  },
  {
    path: '/auth',
    element: <Auth />,
  },
  // {
  //   path: '/user/login',
  //   element: <UserLogin />,
  // },
  {
    path: '/login/:tab?',
    element: <Login />,
  },
];

const router = createBrowserRouter(routerConfig, {});

export default router;
