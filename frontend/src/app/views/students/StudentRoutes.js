
import StudentAppDialog from './StudentAppDialog';
import StudentAppForm from './StudentAppForm';
import StudentTable from './StudentTable';


const studentRoutes = [
    { path: '/students/list', element: <StudentTable /> },
    { path: '/students/create', element: <StudentAppForm />},
    { path: '/students/add', element: <StudentAppDialog />},
];

export default studentRoutes;
