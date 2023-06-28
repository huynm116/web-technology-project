
import { authRoles } from 'app/auth/authRoles';
import AccountAppForm from './AccountAppForm';
import AccountTable from './AccountTable';


const accountRoutes = [
    { path: '/accounts/list', auth: authRoles.sa ,element: <AccountTable /> },
    { path: '/accounts/create', auth: authRoles.sa, element: <AccountAppForm />},
];

export default accountRoutes;
