import AppTable from "../material-kit/tables/AppTable";
import { useLayoutEffect, useState } from "react";
import axios from "axios";


const DormTable = () => {
    const [dorms, setDorms] = useState([]);
    useLayoutEffect(() => {
            axios
                .get("/api/dorm")
                .then((res) => {
                    setDorms(res.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },[]);
   
    return (
        <AppTable dataList={dorms} type={'dorm'}/>
    );
};

export default DormTable;
