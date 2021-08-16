import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField, Select, FormControl, MenuItem, InputLabel, FormHelperText,
} from '@material-ui/core';
import axios from 'axios';
import { useForm } from 'react-hook-form';
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
        width: "100%",
        '& > .MuiFormHelperText-root':{
            color:'red'
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

const CreateStaff = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [roleItem, setRoleItem] = useState([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
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

    const staffSubmit = async (datas) => {
        dispatch(createStaff(datas))
        reset()
    }
    return (
        <Paper className={classes.root}>
            {/* <form onSubmit={handleSubmit(staffSubmit())}> */}
            <form onSubmit={handleSubmit(staffSubmit)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="first_name"
                            label="First name"
                            variant="outlined"
                            name="first_name"
                            value={data.first_name}
                            {...register('first_name', {
                                required: "Please enter first name",
                            })}
                            helperText={errors.first_name ? "Please enter first name" : false}
                            error={(errors.first_name ? true : false)}
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
                            {...register('last_name', {
                                required: "Please enter last name",
                            })}
                            helperText={errors.last_name ? "Please enter last name" : false}
                            error={(errors.last_name ? true : false)}
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
                            {...register('email', {
                                required: "Please enter email address",
                            })}
                            helperText={errors.email ? "Please enter email address" : false}
                            error={(errors.email ? true : false)}
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
                            {...register('contact_number', {
                                required: "Please enter contact number",
                            })}
                            helperText={errors.contact_number ? "Please enter contact number" : false}
                            error={(errors.contact_number ? true : false)}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Select Role</InputLabel>
                            <Select
                                value={data.role_id}
                                {...register('role_id', {
                                    required: "Please select role",
                                })}
                                // helperText={errors.role_id ? "Please select role" : false}
                                error={(errors.role_id ? true : false)}
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
                            <FormHelperText>{errors.role_id ? "Please select role" : false}</FormHelperText>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Select Designation</InputLabel>
                            <Select
                                value={data.designation_id}
                                {...register('designation_id', {
                                    required: "Please select designation",
                                })}
                                // helperText={errors.role_id ? "Please select role" : false}
                                error={(errors.designation_id ? true : false)}
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
                            <FormHelperText>{errors.designation_id ? "Please select designation" : false}</FormHelperText>
                        </FormControl>
                    </Grid>
                </Grid>

                <Box className={classes.footerBtn}>
                    <Button color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained" type="submit">
                        Add
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}

export default CreateStaff
