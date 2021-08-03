import React, { useState, useEffect } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField
} from '@material-ui/core';
import { changePassword, getProfile, updateProfile } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
        marginBottom: 24
    },
    title: {
        fontWeight: "500",
        fontSize: 16,
        margin: "0 0 24px 0"
    },

    formControl: {
        width: "100%"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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

const Profile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: '',
        contact_number: '',
        address_line_1: '',
        address_line_2: '',
        city:'',
        postcode: '',
    })
    const [resetPass, setResetPass] = useState({
        old_password: "",
        password: "",
        conform_password: ""
    })
    const { profile, loading } = useSelector(state => state.profile)

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleChangePassword = (event) => {
        setResetPass({ ...resetPass, [event.target.name]: event.target.value });
    };

    const getProfileDetail =() => {
        dispatch(getProfile())
    }

    
    
    useEffect(() => {
        getProfileDetail()
    }, [])

    useEffect(()=>{
        if(profile.data){
            setData(profile.data)
        }
    },[profile.data])

    const profileSubmit = () => {
        dispatch(updateProfile(data))
        // console.log('data: ', data);
    }
    const changePassDetail =() => {
        dispatch(changePassword(resetPass))
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
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="first_name"
                            label="First Name"
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
                            label="Last Name"
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
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            fullWidth
                            disabled
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
                        <TextField
                            id="address_line_1"
                            label="Address line 1"
                            variant="outlined"
                            name="address_line_1"
                            value={data.address_line_1}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="address_line_2"
                            label="Address line 2"
                            variant="outlined"
                            name="address_line_2"
                            value={data.address_line_2}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            name="city"
                            value={data.city}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="postcode"
                            label="Postcode"
                            variant="outlined"
                            name="postcode"
                            value={data.postcode}
                            onChange={handleChange}
                            fullWidth
                            type="text"
                        />
                    </Grid>
                </Grid>
                <Box className={classes.footerBtn}>
                    <Button color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained" onClick={profileSubmit}>
                        Save
                    </Button>
                </Box>


            </Paper>

            <Paper className={classes.root}>
                <h3 className={classes.title}>Change Password</h3>
                <Grid container spacing={2}>

                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="old_password"
                            label="Old Password"
                            variant="outlined"
                            name="old_password"
                            value={resetPass.old_password}
                            type="password"
                            onChange={handleChangePassword}
                            fullWidth
                            autoComplete="new-password"
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="password"
                            label="New Password"
                            variant="outlined"
                            name="password"
                            value={resetPass.password}
                            type="password"
                            onChange={handleChangePassword}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="conform_password"
                            label="Confirm Password"
                            variant="outlined"
                            name="conform_password"
                            value={resetPass.conform_password}
                            type="password"
                            onChange={handleChangePassword}
                            fullWidth
                        />
                    </Grid>
                </Grid>
                <Box className={classes.footerBtn}>
                    <Button color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained" onClick={changePassDetail}>
                        Save
                    </Button>
                </Box>

            </Paper>
        </>
    )
}

export default Profile
