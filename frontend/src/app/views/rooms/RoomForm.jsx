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

const RoomForm = () => {
    const [state, setState] = useState({ date: new Date() });
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        axios.get("http://localhost:4444/api/room/" + state.room_id).then((res) => {
            if (res.data.data != null) {
                alert("Room already exists");
            } else {
                axios.post("http://localhost:4444/api/room/", state).then((res) => {
                    axios.put(`http://localhost:4444/api/dorm/${dorm_id}?room_id=${room_id}`).then((res) => {
                        alert(res.data.status);
                        navigate("/dashboard/default");
                    }).catch(err => {
                        axios.delete(`http://localhost:4444/api/room/${room_id}`).then((res) => {
                            console.log("Cannot add room to dorm -> deleted room");
                        }).catch(err => console.log(err));
                    });
                }).catch(err => console.log(err));
            }
        });


    };

    const handleChange = (event) => {
        event.persist();
        setState({ ...state, [event.target.name]: event.target.value });
    };


    const {
        room_id,
        slot,
        available,
        dorm_id,
        price,
        status,
    } = state;

    return (
        <div>
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <Grid container spacing={6}>
                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                        <TextField
                            type="text"
                            name="room_id"
                            label="Room ID"
                            onChange={handleChange}
                            value={room_id || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        <TextField
                            type="text"
                            name="dorm_id"
                            label="Belongs to dorm ID"
                            onChange={handleChange}
                            value={dorm_id || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        <TextField
                            type="number"
                            name="slot"
                            label="Maximum slot"
                            onChange={handleChange}
                            value={slot || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                        <TextField
                            type="text"
                            name="available"
                            label="Available slot"
                            onChange={handleChange}
                            value={available || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="text"
                            name="price"
                            label="Price"
                            onChange={handleChange}
                            value={price || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />


                        <TextField
                            type="text"
                            name="status"
                            label="Status"
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

export default RoomForm;
