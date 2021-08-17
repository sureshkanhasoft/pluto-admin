import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField, Select, FormControl, MenuItem, InputLabel, FormHelperText, Backdrop, CircularProgress,
} from '@material-ui/core';
import axios from 'axios';
import apiConfigs from '../../config/config';
import { useDispatch } from 'react-redux';
import { updateStaff } from '../../store/action';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },

    formControl: {
        width: "100%",
        '& > .MuiFormHelperText-root': {
            color: 'red'
        }
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

const UpdateStaff = ({ match }) => {
    const classes = useStyle();
    const user_id = match.params.id;
    const dispatch = useDispatch();
    const [roleItem, setRoleItem] = useState([])
    const [loading, setLoading] = useState(false)
    const [designationItem, setDesignationItem] = useState([])
    // const [items, setItems] = useState([])
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: "",
        contact_number: "",
        role_id: "",
        designation_id: "",
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const getStaff = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        setLoading(true)
        await axios.get(`${apiConfigs.API_URL}api/organization/user/get-user/${user_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setData(response.data.data)
            setLoading(false)
        }).catch(error => {
            console.log("error.message", error.message);
            setLoading(false)
        });
    }

    useEffect(() => {
        getStaff()
    }, [user_id])

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

    const getDesignation = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-designation-list`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setDesignationItem(response.data.data)
        }).catch(error => {
            console.log('error: ', error);
        })
    }

    useEffect(() => {
        getRole();
    }, []);

    useEffect(() => {
        getDesignation();
    }, []);

    const staffUpdateSubmit = (e) => {
        e.preventDefault();
        dispatch(updateStaff(data))
    }
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            <Paper className={classes.root}>
                {/* <form onSubmit={handleSubmit(staffSubmit())}> */}
                <form onSubmit={(e) => staffUpdateSubmit(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="first_name"
                                label="First name"
                                variant="outlined"
                                name="first_name"
                                value={data?.first_name ? data?.first_name : ""}
                                onChange={handleChange}
                                helperText={!data?.first_name ? "Please enter first name" : false}
                                error={(!data?.first_name ? true : false)}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="last_name"
                                label="Last name"
                                variant="outlined"
                                name="last_name"
                                value={data?.last_name}
                                helperText={!data?.last_name ? "Please enter last name" : false}
                                error={(!data?.last_name ? true : false)}
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
                                value={data?.email}
                                helperText={!data?.email ? "Please enter email address" : false}
                                error={(!data?.email ? true : false)}
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
                                value={!data?.contact_number}
                                helperText={!data?.contact_number ? "Please enter contact number" : false}
                                error={(!data?.contact_number ? true : false)}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} error={(!data.role_id ? true : false)}>
                                <InputLabel>Select Role</InputLabel>
                                <Select
                                    value={data?.role_id}
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
                                <FormHelperText>{!data?.role_id ? "Please select role" : false}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} error={(!data.designation_id ? true : false)}>
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
                                    {
                                        designationItem?.data && designationItem?.data.map((item) => {
                                            return (
                                                <MenuItem value={item.id} key={item.id}>{item.designation_name}</MenuItem>
                                            )
                                        })
                                    }
                                    {/* <MenuItem value="1">Compliance</MenuItem>
                                    <MenuItem value="2">Booking</MenuItem>
                                    <MenuItem value="3">Finance</MenuItem> */}
                                </Select>
                                <FormHelperText>{!data?.designation_id ? "Please select designation" : false}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box className={classes.footerBtn}>
                        <Button color="primary">
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit">
                            Update
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default UpdateStaff
