
import RoomAppForm from './RoomAppForm';
import RoomTable from './RoomTable';


const roomRoutes = [
    { path: '/rooms/list', element: <RoomTable /> },
    { path: '/rooms/create', element: <RoomAppForm />}

];

export default roomRoutes;
