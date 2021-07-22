import React, { useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField, Select, FormControl, MenuItem, InputLabel,
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },

    formControl: {
        width: "100%"
    },
    footerBtn: {
        display: "flex",
        justifyContent: "flex-end",
        marginTop: "24px",
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}))

const CreateStaff = () => {
    const classes = useStyle();
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        number: "",
        role: "",
        designation: ""
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    return (
        <Paper className={classes.root}>
            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="firstname"
                            label="First name"
                            variant="outlined"
                            name="firstname"
                            value={data.firstname}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="lastname"
                            label="Last name"
                            variant="outlined"
                            name="lastname"
                            value={data.lastname}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="email"
                            label="Email Address"
                            variant="outlined"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="number"
                            label="Contact Number"
                            variant="outlined"
                            name="number"
                            value={data.number}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Select Role</InputLabel>
                            <Select
                                value={data.role}
                                onChange={handleChange}
                                name="role"
                                label="Role Required"
                            >
                                <MenuItem value="">
                                    Select a Role
                                </MenuItem>
                                <MenuItem value="Clinical Manager">Clinical Manager</MenuItem>
                                <MenuItem value="Nurse Manager">Nurse Manager</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Select Designation</InputLabel>
                            <Select
                                value={data.designation}
                                onChange={handleChange}
                                label="Designation Required"
                                name="designation"
                            >
                                <MenuItem value="">
                                    Select a Designation
                                </MenuItem>
                                <MenuItem value="Compliance">Compliance</MenuItem>
                                <MenuItem value="Booking">Booking</MenuItem>
                                <MenuItem value="Finance">Finance</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box className={classes.footerBtn}>
                    <Button color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained">
                        Save
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}

export default CreateStaff
