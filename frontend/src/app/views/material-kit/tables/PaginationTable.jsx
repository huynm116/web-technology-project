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
import RoomFormDialog from "app/views/rooms/RoomFormDialog";
import StudentFormDialog from "app/views/students/StudentFormDialog";
import DormFormDialog from "app/views/dorms/DormFormDialog";
import {  useState } from "react";
import { useNavigate } from "react-router-dom";
import AccountFormDialog from "app/views/account/AccountFormDialog";

const type = {
  'student': ['Student ID', 'Name',  'Email', 'Gender', 'Contact'],
  'room': ['Room ID', 'Dorm ID', 'Slot', 'Available', 'Price'],
  'dorm': ['Dorm ID', 'Number of rooms', 'Number of available room', 'Status', 'Notes'],
  'auth': ['Email', 'Name', 'Username',  'Role', 'Age']
}

const field = {
  'student': ['student_id','name' , 'email', 'gender', 'contact'],
  'room': ['room_id', 'dorm_id', 'slot', 'available', 'price'],
  'dorm': ['dorm_id', 'number_of_room', 'avail_room', 'status', 'action'],
  'auth': ['email', 'name', 'username',  'role', 'age']
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
  const [open, setOpen] = useState(false);
  const [id, setId] = useState("");
  const handleClickOpen = () => setOpen(true) ;
  const handleClose = () => {setOpen(false)};


  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const { type: objectType, dataList } = props;
  const navigate = useNavigate();
  const handleChangePage = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleEdit = (id) => {
    handleClickOpen();
    setId(id);
  }

  const handleDelete = (id, objectId) => {
    if (window.confirm("Do you want to delete " + objectType + " with id: " + id)) {
      axios.delete(`/api/${objectType}/` + objectId).then((res) => {
        if (res.status === 200) {
          alert(`${objectType.charAt(0).toUpperCase() + objectType.slice(1)} successfully deleted`);
          navigate(`/dashboard/default`);
        } else Promise.reject();
      })
        .catch((err) => alert("Something went wrong"))
    }
  }



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
            <TableCell align="center">Action</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataList.sort((a, b) => { return a[`${objectType}_id`] - b[`${objectType}_id`] })
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((data, index) => (
              <TableRow key={index}>
                <TableCell align="left">{data[field[objectType][0]]}</TableCell>
                <TableCell align="center">{data[field[objectType][1]]}</TableCell>
                <TableCell align="center">{data[field[objectType][2]]}</TableCell>
                <TableCell align="center">{data[field[objectType][3]]}</TableCell>
                <TableCell align="center">{data[field[objectType][4]]}</TableCell>

                <TableCell align="center">
                  <IconButton onClick={() => handleEdit(data[field[objectType][0]])} >
                    <Icon color="primary">edit_icon</Icon>
                  </IconButton>
                  <IconButton onClick={() => handleDelete(data[field[objectType][0]], data._id)}>
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

      {objectType === "student" ? <StudentFormDialog open={open} onClose={handleClose} student_id={id} /> : null}
      {objectType === "room" ? <RoomFormDialog open={open} onClose={handleClose} room_id={id} /> : null}
      {objectType === "dorm" ? <DormFormDialog open={open} onClose={handleClose} dorm_id={id} /> : null}
      {objectType === "auth" ? <AccountFormDialog open={open} onClose={handleClose} email={id} /> : null}
    </Box>
  );
};

export default PaginationTable;
