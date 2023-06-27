import {
  Box,
  Icon,
  IconButton,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import axios from 'app/../axios';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";


const type={
  'student':['Name','Student ID', 'Email', 'Gender', 'Contact'],
  'room': ['Room ID','Dorm ID', 'Slot', 'Available', 'Price'],
  'dorm': ['Dorm ID', 'Number of rooms','Number of available room', 'Status','Notes'],
  'auth': ['Name', 'Username', 'Email', 'Role', 'Age']
}

const field={
  'student': ['name', 'student_id', 'email', 'gender', 'contact'],
  'room' : ['room_id', 'dorm_id', 'slot', 'available', 'price'],
  'dorm': ['dorm_id', 'number_of_room', 'avail_room','status','action'],
  'auth': ['name', 'username', 'email','role','age']
}

const StyledTable = styled(Table)(() => ({
  whiteSpace: "pre",
  "& thead": {
    "& tr": { "& th": { paddingLeft: 0, paddingRight: 0 } },
  },
  "& tbody": {
    "& tr": { "& td": { paddingLeft: 0, textTransform: "capitalize" } },
  },
}));


const PaginationTable = (props) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [id, setId] = useState('');
  const [_id, set_Id] = useState('');
  const {type: objectType, dataList} = props;
  const navigate = useNavigate();
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (id === '') return;
    if(window.confirm("Do you want to delete "+ objectType + " with id: " + _id)){
        axios.delete(`/api/${objectType}/` + id).then((res) => {
        if (res.status === 200) {
          alert(`${objectType.charAt(0).toUpperCase()+objectType.slice(1)} successfully deleted`);
          navigate(`/dashboard/default`);
        } else Promise.reject();
      })
        .catch((err) => alert("Something went wrong"))}
  }, [id, objectType, navigate, _id]);




  return (
    <Box width="100%" overflow="auto">
      <StyledTable>
        <TableHead>
          <TableRow>
            <TableCell align="left">{type[objectType][0]}</TableCell>
            <TableCell align="center">{type[objectType][1]}</TableCell>
            <TableCell align="center">{type[objectType][2]}</TableCell>
            <TableCell align="center">{type[objectType][3]}</TableCell>
            <TableCell align="center">{type[objectType][4]}</TableCell>
            <TableCell align="right">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.sort((a,b) => {return a[`${objectType}_id`] - b[`${objectType}_id`]})
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((data, index) => (
              <TableRow key={index}>
                <TableCell align="left">{data[field[objectType][0]]}</TableCell>
                <TableCell align="center">{data[field[objectType][1]]}</TableCell>
                <TableCell align="center">{data[field[objectType][2]]}</TableCell>
                <TableCell align="center">{data[field[objectType][3]]}</TableCell>
                <TableCell align="center">{data[field[objectType][4]]}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => {setId(data._id); set_Id(data[field[objectType][0]])}}>
                    <Icon color="error">close</Icon>
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </StyledTable>

      <TablePagination
        sx={{ px: 2 }}
        page={page}
        component="div"
        rowsPerPage={rowsPerPage}
        count={dataList.length}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[5, 10, 25]}
        onRowsPerPageChange={handleChangeRowsPerPage}
        nextIconButtonProps={{ "aria-label": "Next Page" }}
        backIconButtonProps={{ "aria-label": "Previous Page" }}
      />
    </Box>
  );
};

export default PaginationTable;
