
import StudentAppForm from './StudentAppForm';
import StudentTable from './StudentTable';


const studentRoutes = [
    { path: '/students/list', element: <StudentTable /> },
    { path: '/students/add', element: <StudentAppForm />},
];

export default studentRoutes;
