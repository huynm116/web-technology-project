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
    'avail_rooms',
    'room_ids',
]

export default function DormFormDialog(props) {
    const { open, onClose: handleClose, dorm_id: id } = props;
    const [state, setState] = useState({});
    const {
        dorm_id,
        status,
        action,
        avail_room,
        number_of_room,
        room_ids
    } = state;

    const handleChange = (event) => {
        event.persist();
        if(readOnlyAttributes.includes(event.target.name) ) return;
        setState({ ...state, [event.target.name]: event.target.value });
    };


    const handleSubmit = () => {
        let newId = state.dorm_id;
        axios.get("/api/dorm/" + newId).then((res) => {
            if (newId !== id && res.data.data !== null) {
                alert("Dorm_id existed");
                return;
            }
            axios.put("/api/dorm/" + newId, state).then((res) => {
                alert("Save succesful");
            }).catch(err => console.log(err))
        }).catch(err => console.log(err));
    }

    useLayoutEffect(() => {
        if (id === null || !open) return;
        axios
            .get(`/api/dorm/${id}`)
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
                <DialogTitle id="form-dialog-title">Dorm info</DialogTitle>

                <DialogContent>

                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                //type="text"
                                name="dorm_id"
                                label="Dorm ID"
                                onChange={handleChange}
                                value={dorm_id || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />

                            <TextField
                                type="number"
                                name="number_of_room"
                                label="Maximum Rooms"
                                value={number_of_room || ""}
                                onChange={handleChange}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />


                            <TextField
                                type="number"
                                name="avail_room"
                                label="Available Rooms"
                                onChange={handleChange}
                                value={avail_room || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />


                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

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
                                name="action"
                                label="Action"
                                onChange={handleChange}
                                value={action || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />
                            <TextField
                                type="text"
                                name="room_ids"
                                label="Room IDs"
                                onChange={handleChange}
                                value={room_ids || ""}
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
