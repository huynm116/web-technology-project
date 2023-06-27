import AppTable from "../material-kit/tables/AppTable";
import { useLayoutEffect, useState } from "react";
import axios from 'app/../axios';


const AccountTable = () => {
    const [accounts, setAccounts] = useState([]);
    useLayoutEffect(() => {
            axios
                .get("/api/auth")
                .then((res) => {
                    setAccounts(res.data.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        },[]);
   
    return (
        <AppTable dataList={accounts} type={'auth'}/>
    );
};

export default AccountTable;
