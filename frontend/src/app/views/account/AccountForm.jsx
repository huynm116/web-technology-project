import {
  Button,
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
import { useNavigate } from "react-router-dom";
import axios from "axios";

const TextField = styled(TextValidator)(() => ({
    width: "100%",
    marginBottom: "16px",
}));

const AccountForm = () => {
    const [state, setState] = useState({});
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        axios.get("http://localhost:4444/api/auth/" + state.email).then((res) => {
            if (res.data.data != null) {
                alert("Account already exists");
            } else {
                axios.post("http://localhost:4444/api/auth/register", state).then((res) => {
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
        role,
        name,
        username,
        email,
        age,
        password,
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
                            name="username"
                            label="Username"
                            onChange={handleChange}
                            value={username || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                        <TextField
                            type="number"
                            name="age"
                            label="Age"
                            onChange={handleChange}
                            value={age || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />

                    </Grid>

                    <Grid item lg={6} md={6} sm={12} xs={12} sx={{ mt: 2 }}>

                        <TextField
                            type="text"
                            name="email"
                            label="Email"
                            onChange={handleChange}
                            value={email || ""}
                            validators={["required" || "isEmail"]}
                            errorMessages={["this field is required"]}
                        />
                        <TextField
                            type="text"
                            name="password"
                            label="Password"
                            onChange={handleChange}
                            value={password || ""}
                            validators={["required"]}
                            errorMessages={["this field is required"]}
                        />
                        <RadioGroup
                            row
                            name="role"
                            sx={{ mb: 2 }}
                            value={role || ""}
                            onChange={handleChange}
                        >
                            <FormControlLabel
                                value="sa"
                                label="Super Admin"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="admin"
                                label="Admin"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />

                            <FormControlLabel
                                value="guest"
                                label="Guest"
                                labelPlacement="end"
                                control={<Radio color="secondary" />}
                            />
                        </RadioGroup>
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

export default AccountForm;
