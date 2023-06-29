import { useLayoutEffect, useState } from 'react';
import {
    Button,
    FormControlLabel,
    Grid,
    Radio,
    RadioGroup,
    styled,
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

]

export default function AccountFormDialog(props) {
    const { open, onClose: handleClose, email: id } = props;
    const [state, setState] = useState({});
    const {
        email,
        username,
        name,
        role,
        age
    } = state;

    const handleChange = (event) => {
        event.persist();
        if (readOnlyAttributes.includes(event.target.name)) return;
        setState({ ...state, [event.target.name]: event.target.value });
    };


    const handleSubmit = () => {
        let newEmail = state.emailState;
        axios.get("/api/auth/" + newEmail).then((res) => {
            if (newEmail !== id && res.data.data !== null) {
                alert("Account email existed");
                return;
            }
            axios.put("/api/auth/" + newEmail, state).then((res) => {
                if(res.data.status === "success") alert("Save succesful");
            }).catch(err => console.log(err))
        }).catch(err => console.log(err));
    }

    useLayoutEffect(() => {
        if (id === null || !open) return;
        axios
            .get(`/api/auth/${id}`)
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
                <DialogTitle id="form-dialog-title">Account info</DialogTitle>

                <DialogContent>

                    <Grid container spacing={6}>
                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                //type="text"
                                name="email"
                                label="Email"
                                onChange={handleChange}
                                value={email || ""}
                                validators={["required","isEmail"]}
                                errormessages={["this field is required","invalid email"]}
                            />

                            <TextField
                                type="text"
                                name="username"
                                label="Username"
                                value={username || ""}
                                onChange={handleChange}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />


                            <TextField
                                type="text"
                                name="name"
                                label="Name"
                                onChange={handleChange}
                                value={name || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />


                        </Grid>

                        <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                            <TextField
                                type="number"
                                name="age"
                                label="Age"
                                onChange={handleChange}
                                value={age || ""}
                                validators={["required"]}
                                errormessages={["this field is required"]}
                            />

                            <RadioGroup
                                row
                                name="role"
                                sx={{ mb: 2 }}
                                value={role || ""}
                                onChange={handleChange}
                            >
                                <FormControlLabel
                                    value="SA"
                                    label="Super Admin"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />

                                <FormControlLabel
                                    value="ADMIN"
                                    label="Admin"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />

                                <FormControlLabel
                                    value="EDITOR"
                                    label="Editor"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />

                                <FormControlLabel
                                    value="GUEST"
                                    label="Guest"
                                    labelPlacement="end"
                                    control={<Radio color="secondary" />}
                                />
                            </RadioGroup>


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
