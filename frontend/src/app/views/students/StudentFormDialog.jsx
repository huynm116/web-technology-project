import { useLayoutEffect, useState } from 'react';
import {
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    styled
} from '@mui/material';
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import axios from 'app/../axios';
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));


export default function StudentFormDialog(props) {
    const { open, onClose: handleClose, student_id: id } = props;
    const [state, setState] = useState({});
    const {
        name,
        student_id,
        contact,
        department,
        course,
        emergency_name,
        emergency_contact,
        emergency_address,
        emergency_relation,
        gender,
        date,
        email,
        room_id
    } = state;

    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => setState({ ...state, date });

    const handleSubmit = () => {
        let newId = state.student_id;
        axios.get("/api/student/" + newId).then((res) => {
            if (newId !== id && res.data.data !== null) {
                alert("Student_id existed");
                return;
            }
            axios.get("/api/room/" + state.room_id).then((res) => {
                if(res.data.data === null ){
                    alert("Room id not valid!");
                    return;
                }
                if (state.room_id !== res.data.data.room_id) {
                    // remove student from old room
                    axios.put(`/api/room/student/remove/${res.data.data.room_id}`).then((res) => console.log("Remove from room")).catch(err => console.log(err))
                }
                axios.put("/api/student/" + newId, state).then((res) => {
                    alert("Save succesful");
                }).catch(err => console.log(err));
                if(state.room_id !== ""){
                    axios.put(`/api/room/student/add/${state.room_id}?student_id=${newId}`).then((res) => console.log("Add student to new room")).catch(err => console.log(err));
                }
            }).catch(err=>console.log(err));
            
        }).catch(err => console.log(err));
    }

    useLayoutEffect(() => {
        if (id === null || !open) return;
        axios
            .get(`/api/student/${id}`)
            .then((res) => {
                setState(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, open])

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <DialogTitle id="form-dialog-title">Student info</DialogTitle>

                <DialogContent>

                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                type="text"
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                value={name || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                //type="text"
                                name="student_id"
                                label="Student ID"
                                onChange={handleChange}
                                value={student_id || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />

                            <TextField
                                type="email"
                                name="email"
                                label="Email"
                                value={email || ""}
                                onChange={handleChange}
                                validators={["required", "isEmail"]}
                                errormessages={["this field is required", "email is not valid"]}
                            />

                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    value={date}
                                    onChange={handleDateChange}
                                    renderInput={(props) => (
                                        <TextField
                                            {...props}
                                            label="Date of birth"
                                            id="mui-pickers-date"
                                            sx={{ mb: 2, width: "100%" }}
                                        />
                                    )}
                                />
                            </LocalizationProvider>

                            <TextField
                                type="number"
                                name="contact"
                                label="Mobile number"
                                onChange={handleChange}
                                value={contact || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="text"
                                name="room_id"
                                readOnly={true}
                                label="Room number"
                                onChange={handleChange}
                                value={room_id || ""}
                            />
                            <RadioGroup
                                row
                                name="gender"
                                sx={{ mb: 2 }}
                                value={gender || ""}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="Male"
                                    label="Male"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />

                                <FormControlLabel
                                    value="Female"
                                    label="Female"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />

                            </RadioGroup>

                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                type="text"
                                name="department"
                                label="Department"
                                onChange={handleChange}
                                value={department || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="text"
                                name="course"
                                label="Course"
                                onChange={handleChange}
                                value={course || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="text"
                                name="emergency_name"
                                label="Emergency Name"
                                onChange={handleChange}
                                value={emergency_name || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="number"
                                name="emergency_contact"
                                label="Emergency Contact"
                                onChange={handleChange}
                                value={emergency_contact || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="text"
                                name="emergency_address"
                                label="Emergency Address"
                                onChange={handleChange}
                                value={emergency_address || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="text"
                                name="emergency_relation"
                                label="Relationship"
                                onChange={handleChange}
                                value={emergency_relation || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />


                        </Grid>
                    </Grid>
                </DialogContent>

                <DialogActions>
                    <Button variant="outlined" color="secondary" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button onClick={handleClose} color="primary" type="submit">
                        Save
                    </Button>
                </DialogActions>
            </ValidatorForm>
        </Dialog >
    );
}
