import {
    Button,
    Grid,
    Icon,
    styled,
} from "@mui/material";
import { Span } from "app/components/Typography";
import { useState } from "react";
import { TextValidator, ValidatorForm } from "react-material-ui-form-validator";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const DormForm = () => {
    const [state, setState] = useState({ date: new Date() });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        axios.get("http://localhost:4444/api/dorm/" + state.dorm_id).then((res) => {
            if (res.data.data != null) {
                alert("Dorm already exists");
            } else {
                axios.post("http://localhost:4444/api/dorm/", state).then((res) => {
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


    const {
        dorm_id,
        number_of_room,
        action,
        status,
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                        <TextField
                            type="text"
                            name="dorm_id"
                            label="Dorm ID"
                            onChange={handleChange}
                            value={dorm_id || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />


                        <TextField
                            type="number"
                            name="number_of_room"
                            label="Maximum room"
                            onChange={handleChange}
                            value={number_of_room || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>


                        <TextField
                            type="text"
                            name="action"
                            label="Action"
                            onChange={handleChange}
                            value={action || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />


                        <TextField
                            type="text"
                            name="status"
                            label="Status (either 'active' or 'inactive')"
                            onChange={handleChange}
                            value={status || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
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

export default DormForm;
