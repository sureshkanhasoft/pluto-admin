import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField, Select, FormControl, MenuItem, InputLabel,
} from '@material-ui/core';
import axios from 'axios';
import apiConfigs from '../../config/config';
import { useDispatch } from 'react-redux';
import { createStaff } from '../../store/action';

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
    const dispatch = useDispatch();
    const [roleItem, setRoleItem] = useState([])
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        role_id: "",
        designation_id: ""
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const getRole = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-all-role`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setRoleItem(response.data)
        }).catch(error => {
            console.log('error: ', error);
        })
    }

    useEffect(() => {
        getRole();
    }, []);

    const staffSubmit = (e) => {
        e.preventDefault()
        dispatch(createStaff(data))
    }
    return (
        <Paper className={classes.root}>
            <form onSubmit={(e) => staffSubmit(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="first_name"
                            label="First name"
                            variant="outlined"
                            name="first_name"
                            value={data.first_name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="last_name"
                            label="Last name"
                            variant="outlined"
                            name="last_name"
                            value={data.last_name}
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
                            id="contact_number"
                            label="Contact Number"
                            variant="outlined"
                            name="contact_number"
                            value={data.contact_number}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Select Role</InputLabel>
                            <Select
                                value={data.role_id}
                                onChange={handleChange}
                                name="role_id"
                                label="Role Required"
                            >
                                <MenuItem value="">
                                    Select a role
                                </MenuItem>
                                {
                                    roleItem?.data && roleItem?.data.map((item) => {
                                        return (
                                            <MenuItem value={item.id} key={item.id}>{item.role_name}</MenuItem>
                                        )
                                    })
                                }

                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Select Designation</InputLabel>
                            <Select
                                value={data.designation_id}
                                onChange={handleChange}
                                label="Designation Required"
                                name="designation_id"
                            >
                                <MenuItem value="">
                                    Select a Designation
                                </MenuItem>
                                <MenuItem value="1">Compliance</MenuItem>
                                <MenuItem value="2">Booking</MenuItem>
                                <MenuItem value="3">Finance</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box className={classes.footerBtn}>
                    <Button color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained" type="submit">
                        Save
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}

export default CreateStaff
