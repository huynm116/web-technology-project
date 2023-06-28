import { authRoles } from '../../auth/authRoles';

//const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  { path: '/dashboard/default', auth: authRoles.guest}, //element: <Analytics />,  },
];

export default dashboardRoutes;
