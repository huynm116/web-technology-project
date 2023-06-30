import { authRoles } from '../../auth/authRoles';
import Analytics from './Analytics';

const dashboardRoutes = [
  { path: '/dashboard/default', auth: authRoles.guest, element: <Analytics />,  },
];

export default dashboardRoutes;
