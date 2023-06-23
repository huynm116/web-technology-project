
import DormAppForm from './DormAppForm';
import DormTable from './DormTable';


const dormRoutes = [
    { path: '/dorms/list', element: <DormTable /> },
    { path: '/dorms/create', element: <DormAppForm />},
];

export default dormRoutes;
