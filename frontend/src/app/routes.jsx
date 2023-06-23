import AuthGuard from 'app/auth/AuthGuard';
import dashboardRoutes from 'app/views/dashboard/DashboardRoutes';
import NotFound from 'app/views/sessions/NotFound';
import sessionRoutes from 'app/views/sessions/SessionRoutes';
import { Navigate } from 'react-router-dom';
import MatxLayout from './components/MatxLayout/MatxLayout';
import materialRoutes from './views/material-kit/MaterialRoutes';
import studentRoutes from './views/students/StudentRoutes';
import roomRoutes from './views/rooms/RoomRoutes';
import dormRoutes from './views/dorms/DormRoutes';
import accountRoutes from './views/account/AccountRoutes';

const routes = [
  {
    element: (
      <AuthGuard>
        <MatxLayout />
      </AuthGuard>
    ),
    children: [...dashboardRoutes, ...materialRoutes, ...studentRoutes, ...roomRoutes, ...dormRoutes, ...accountRoutes],
  },
  ...sessionRoutes,
  { path: '/', element: <Navigate to="dashboard/default" /> },
  { path: '*', element: <NotFound /> },
];

export default routes;
