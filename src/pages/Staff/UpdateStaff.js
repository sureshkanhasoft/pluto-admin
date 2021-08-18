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
import { useDispatch, useSelector } from 'react-redux';
import { updateStaff } from '../../store/action';
import history from '../../utils/HistoryUtils';
import Notification from '../../components/Notification/Notification';

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
    const [staffNotify, setStaffNotify] = useState(false)
    const [designationItem, setDesignationItem] = useState([])
    const { staffUpdateError, staffUpdateSuccess } = useSelector(state => state.staff)
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
        setStaffNotify(true)
    }
    const backPage = () => {
        history.goBack()
    }
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {
                staffNotify && staffUpdateSuccess?.message &&
                <Notification
                    data={staffUpdateSuccess?.message}
                    status="success"
                />
            }

            {/* {staffNotify && staffUpdateError?.message &&
                <Notification
                    data={staffUpdateError?.message}
                    status="error"
                />
            } */}
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
                                helperText={staffUpdateError.message?.first_name}
                                error={!!staffUpdateError.message?.first_name}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="last_name"
                                label="Last name"
                                variant="outlined"
                                name="last_name"
                                value={data?.last_name}
                                helperText={staffUpdateError?.message?.last_name}
                                error={!!staffUpdateError.message?.last_name}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="email"
                                label="Email Address"
                                variant="outlined"
                                name="email"
                                value={data?.email}
                                helperText={staffUpdateError.message?.email}
                                error={!!staffUpdateError.message?.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="contact_number"
                                label="Contact Number"
                                variant="outlined"
                                name="contact_number"
                                value={data?.contact_number}
                                helperText={staffUpdateError.message?.contact_number}
                                error={!!staffUpdateError.message?.contact_number}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" required className={classes.formControl} error={!!staffUpdateError?.message?.role_id}>
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
                                                <MenuItem value={item?.id ? item?.id : ""} key={item.id}>{item?.role_name ? item?.role_name : ""}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                                <FormHelperText>{staffUpdateError.message?.role_id ? "The role field is required." :""}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" required className={classes.formControl} error={!!staffUpdateError.message?.designation_id}>
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
                                </Select>
                                <FormHelperText>{staffUpdateError.message?.designation_id ? "The designation field is required." :""}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box className={classes.footerBtn}>
                        <Button color="primary" onClick={backPage}>
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" formNoValidate>
                            Update
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default UpdateStaff
