import { authRoles } from '../../auth/authRoles';

//const Analytics = Loadable(lazy(() => import('./Analytics')));

const dashboardRoutes = [
  { path: '/dashboard/default', auth: authRoles.admin}, //element: <Analytics />,  },
  { path: '/dashboard/student_list'},// element: <StudentTable />},
  { path: '/dashboard/room_list', }
];

export default dashboardRoutes;
