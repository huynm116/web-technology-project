import { DatePicker } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import {
    Button,
    Checkbox,
    FormControlLabel,
    Grid,
    Icon,
    Radio,
    RadioGroup,
    styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from 'app/../axios';
import { useNavigate } from "react-router-dom";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const StudentForm = () => {
    const [state, setState] = useState({ date: new Date() });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        console.log("submitted");
        axios.get("/api/student/" + state.student_id).then((res) => {
            if (res.data.data != null) {
                alert("Student already exists");
            }else{
                axios.post("/api/student/", state).then((res) => {
                    alert(res.data.status);
                    navigate("/dashboard/default");
                }).catch(err => console.log(err));
            }
        });


    };

    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };

    const handleDateChange = (date) => setState({ ...state, date });

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
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                        <TextField
                            type="text"
                            name="name"
                            label="Name"
                            onChange={handleChange}
                            value={name || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="text"
                            name="student_id"
                            label="Student ID"
                            onChange={handleChange}
                            value={student_id || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        <TextField
                            type="email"
                            name="email"
                            label="Email"
                            value={email || ""}
                            onChange={handleChange}
                            validators={["required", "isEmail"]}
                            errorMessages={["this field is required", "email is not valid"]}
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
                            errorMessages={["this field is required"]}
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
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="text"
                            name="course"
                            label="Course"
                            onChange={handleChange}
                            value={course || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="text"
                            name="emergency_name"
                            label="Emergency Name"
                            onChange={handleChange}
                            value={emergency_name || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="number"
                            name="emergency_contact"
                            label="Emergency Contact"
                            onChange={handleChange}
                            value={emergency_contact || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="text"
                            name="emergency_address"
                            label="Emergency Address"
                            onChange={handleChange}
                            value={emergency_address || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="text"
                            name="emergency_relation"
                            label="Relationship"
                            onChange={handleChange}
                            value={emergency_relation || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />


                        <FormControlLabel
                            control={<Checkbox />}
                            label="I have read and agree to the terms of service."
                        />
                    </Grid>
                </Grid>

                <Button color="primary" variant="contained" type="submit">
                    <Icon>send</Icon>
                    <Span sx={{ pl: 1, textTransform: "capitalize" }}>Submit</Span>
                </Button>
            </ValidatorForm>
        </div>
    );
};

export default StudentForm;
