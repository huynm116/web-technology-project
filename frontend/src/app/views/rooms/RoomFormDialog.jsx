import { useLayoutEffect, useState } from 'react';
import {
    Button,

    Grid,

    styled
} from '@mui/material';


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

const readOnlyAttributes = [
    'available',
    'student_ids',
]

export default function RoomFormDialog(props) {
    const { open, onClose: handleClose, room_id: id } = props;
    const [state, setState] = useState({});
    const {
        room_id,
        dorm_id,
        slot, 
        available,
        price,
        status,
        student_ids
    } = state;

    const handleChange = (event) => {
        event.persist();
        if(readOnlyAttributes.includes(event.target.name) ) return;
        setState({ ...state, [event.target.name]: event.target.value });
    };


    const handleSubmit = () => {
        let newId = state.room_id;
        axios.get("/api/room/" + newId).then((res) => {
            if (newId !== id && res.data.data !== null) {
                alert("Room_id existed");
                return;
            }
            axios.put("/api/room/" + newId, state).then((res) => {
                alert("Save succesful");
            }).catch(err => console.log(err))
        }).catch(err => console.log(err));
    }

    useLayoutEffect(() => {
        if (id === null || !open) return;
        axios
            .get(`/api/room/${id}`)
            .then((res) => {
                console.log(res.data.data);
                setState(res.data.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id, open])

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <ValidatorForm onSubmit={handleSubmit} onError={() => null}>
                <DialogTitle id="form-dialog-title">Room info</DialogTitle>

                <DialogContent>

                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                //type="text"
                                name="room_id"
                                label="Room ID"
                                onChange={handleChange}
                                value={room_id || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />

                            <TextField
                                type="text"
                                name="dorm_id"
                                label="Dorm ID"
                                value={dorm_id || ""}
                                onChange={handleChange}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />


                            <TextField
                                type="number"
                                name="slot"
                                label="Slot"
                                onChange={handleChange}
                                value={slot || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="number"
                                name="available"
                                label="Available"
                                onChange={handleChange}
                                value={available || ""}
                            />

                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                type="number"
                                name="price"
                                label="Price"
                                onChange={handleChange}
                                value={price || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            
                            <TextField
                                type="text"
                                name="status"
                                label="Status"
                                onChange={handleChange}
                                value={status || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="text"
                                name="student_ids"
                                label="Student IDs"
                                onChange={handleChange}
                                value={student_ids || ""}
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
