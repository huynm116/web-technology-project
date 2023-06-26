import AppTable from "../material-kit/tables/AppTable";
import { useLayoutEffect, useState } from "react";
import axios from "axios";


const StudentTable = () => {
    const [students, setStudents] = useState([]);
    useLayoutEffect(() => {
            axios
                .get("/api/student")
                .then((res) => {
                    setStudents(res.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },[]);
   
    return (
        <AppTable dataList={students} type={'student'}/>
    );
};

export default StudentTable;
