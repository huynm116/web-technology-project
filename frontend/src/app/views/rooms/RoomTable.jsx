import AppTable from "../material-kit/tables/AppTable";
import { useLayoutEffect, useState } from "react";
import axios from "axios";


const RoomTable = () => {
    const [rooms, setRooms] = useState([]);
    useLayoutEffect(() => {
            axios
                .get("http://localhost:4444/api/room")
                .then((res) => {
                    setRooms(res.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },[]);
   
    return (
        <AppTable dataList={rooms} type={'room'}/>
    );
};

export default RoomTable;
