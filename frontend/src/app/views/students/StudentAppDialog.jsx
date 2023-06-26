import { Stack } from '@mui/material';
import { Box, styled,Button,Icon, } from '@mui/material';
import { Breadcrumb, SimpleCard } from 'app/components';
import StudentConfirmDormDialog from './StudentConfirmDormDialog';
import StudentConfirmRoomDialog from './StudentConfirmRoomDialog';
import { useEffect, useState } from 'react';
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import { Span } from "app/components/Typography";
import axios from "axios";

const Container = styled('div')(({ theme }) => ({
  margin: '30px',
  [theme.breakpoints.down('sm')]: { margin: '16px' },
  '& .breadcrumb': {
    marginBottom: '30px',
    [theme.breakpoints.down('sm')]: { marginBottom: '16px' }
  }
}));
const TextField = styled(TextValidator)(() => ({
  width: "100%",
  marginBottom: "16px",
}));

const StudentAppDialog = () => {

  const [state, setState] = useState({});


  const handleSubmit = (event) => {
    axios.get("/api/student/" + student_id).then((res) => {
      if(res.data.data ===null){
        alert("Student does not exist");
        return;
      }
      axios.get("/api/room/" + room_id).then((res) => {
        if(res.data.data.available===0){
          alert(`Room ${room_id} is full`);
          return;
        };
        axios.put(`/api/room/${room_id}?student_id=${student_id}`).then((res) => {
          console.log(res.data);
          alert("Add success");
        }).catch((err) => {console.log(err);});
      }).catch(err => console.log(err));
  
    })
    
  };
  const {
    dorm_id,
    room_id,
    student_id,
} = state;

  const handleChange = (field, value) => {
    setState({ ...state, [field]: value });
  };

  const handleChangeType =(event) => {
    event.persist();
    setState({...state, [event.target.name] : event.target.value})
  }

  return (
    <Container>
      <Box className="breadcrumb">
        <Breadcrumb routeSegments={[{ name: 'Student', path: '/students/list' }, { name: 'Add to room' }]} />
      </Box>

      <Stack spacing={3}>
        <SimpleCard title="Add student to room">
          <StudentConfirmDormDialog onValueChange={handleChange} />
          <StudentConfirmRoomDialog dorm_id={dorm_id} onValueChange={handleChange} />
          <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
            <TextField
              type="text"
              name="student_id"
              label="Student ID"
              onChange={handleChangeType}
              value={student_id || ""}
              validators={["required"]}
              errorMessages={["this field is required"]}
            />
            <Button color="primary" variant="contained" type="submit">
              <Icon>send</Icon>
              <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
            </Button>
          </ValidatorForm>
        </SimpleCard>
      </Stack>
    </Container>
  );
};

export default StudentAppDialog;
