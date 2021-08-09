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
import Notification from '../../components/Notification/Notification';
import { useForm } from "react-hook-form";
import MuiAlert from '@material-ui/lab/Alert';
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
    },
    error: {
        color: "red"
    }
}))

const Profile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { passChange, passerrors, profileErrors, profileData } = useSelector(state => state.profile)

    const { profile, loading } = useSelector(state => state.profile)
    const [open, setOpen] = React.useState(false);
    const [profileNotify, setProfileNotify] = useState(false)
    const [passNotify, setPassNotify] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const { register: register2, control, formState: { errors: errors2 }, handleSubmit: handleSubmit2, } = useForm();

    const [data, setData] = useState({
        first_name: "",
        last_name: "",
        email: '',
        contact_number: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        postcode: '',
    })
    const [resetPass, setResetPass] = useState({
        old_password: "",
        password: "",
        confirm_password: ""
    })

    const handleChange = (event) => {
        if (event.target.name === 'contact_number') {
            const re = /^[0-9 \b]+$/; 
            if (event.target.value === '' || re.test(event.target.value)) {
                setData({ ...data, [event.target.name]: event.target.value });
             }
        }else{
            setData({ ...data, [event.target.name]: event.target.value });
        }
        
    };

    const handleChangePassword = (event) => {
        setResetPass({ ...resetPass, [event.target.name]: event.target.value });
    };

    const getProfileDetail = () => {
        dispatch(getProfile())
    }

    useEffect(() => {
        getProfileDetail()
    }, [])

    const onSubmit = async data => {
        console.log("resetPass => ", data)
        dispatch(changePassword(data))
        setPassNotify(true)
        reset();
    };
    // const onSubmit2 = async data => {
    //     console.log("profile datas  => ", data)
    //     dispatch(updateProfile(data))
    //     setProfileNotify(true)
    // };

    useEffect(() => {
        if (profile.data) {
            setData(profile.data)
        }
    }, [profile.data])

    const profileSubmit = (e) => {
        e.preventDefault()
        dispatch(updateProfile(data))
        setProfileNotify(true)
    }
    // const changePassDetail = () => {
    //     dispatch(changePassword(resetPass))
    // }
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }

            <Paper className={classes.root}>
                {/* <form className={classes.form} onSubmit={handleSubmit2(onSubmit2)} > */}
                <form className={classes.form} onSubmit={profileSubmit} >

                    {/* {profileNotify && profileErrors?.message &&
                        <Notification
                            data={profileErrors?.message}
                            status="error"
                        />
                    } */}
                    {profileNotify && profileData?.message &&
                        <Notification
                            data={profileData?.message}
                            status="success"
                        />
                    }
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField

                                id="first_name"
                                label="First Name"
                                variant="outlined"
                                name="first_name"
                                value={data.first_name}
                                // error={(errors2.first_name ? true : false)}
                                // {...register2("first_name", {
                                //     required: true,
                                // })}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileErrors.message?.first_name}
                                error={
                                    !!profileErrors.message?.first_name
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField

                                id="last_name"
                                label="Last Name"
                                variant="outlined"
                                name="last_name"
                                value={data.last_name}
                                // error={(errors2.last_name ? true : false)}
                                // {...register2("last_name", {
                                //     required: true,
                                // })}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileErrors.message?.last_name}
                                error={!!profileErrors.message?.last_name}
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
                                // error={(errors2.contact_number ? true : false)}
                                // {...register2("contact_number", {
                                //     required: true,
                                // })}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileErrors.message?.contact_number}
                                error={
                                    !!profileErrors.message?.contact_number}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField

                                id="address_line_1"
                                label="Address line 1"
                                variant="outlined"
                                name="address_line_1"
                                value={data.address_line_1}
                                // error={(errors2.address_line_1 ? true : false)}
                                // {...register2("address_line_1", {
                                //     required: true,
                                // })}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileErrors.message?.address_line_1}
                                error={!!profileErrors.message?.address_line_1}
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
                                // error={(errors2.city ? true : false)}
                                // {...register2("city", {
                                //     required: true,
                                // })}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileErrors.message?.city}
                                error={!!profileErrors.message?.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField

                                id="postcode"
                                label="Postcode"
                                variant="outlined"
                                name="postcode"
                                value={data.postcode}
                                // error={(errors2.postcode ? true : false)}
                                // {...register2("postcode", {
                                //     required: true,
                                // })}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileErrors.message?.postcode}
                                error={!!profileErrors.message?.postcode}
                            />
                        </Grid>
                    </Grid>
                    <Box className={classes.footerBtn}>
                        {/* <Button color="primary">
                            Cancel
                        </Button> */}
                        <Button color="secondary" variant="contained" onClick={profileSubmit}>
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Paper className={classes.root}>
                <h3 className={classes.title}>Change Password</h3>


                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                    <Grid container spacing={2}>

                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                error={(errors.old_password ? true : false)}
                                id="old_password"
                                label="Old Password"
                                variant="outlined"
                                name="old_password"
                                // value={resetPass.old_password}
                                type="password"
                                aria-invalid={errors.old_password ? "true" : "false zz"}
                                onChange={handleChangePassword}
                                fullWidth
                                required
                                {...register("old_password", {
                                    required: "Please enter old password",
                                })}
                                autoComplete="new-password"
                                helperText={errors.old_password ? "Please enter old password" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="password"
                                label="New Password"
                                variant="outlined"
                                name="password"
                                // value={resetPass.password}
                                type="password"
                                onChange={handleChangePassword}
                                fullWidth
                                required
                                error={(errors.password ? true : false)}
                                {...register("password", {
                                    required: "Please enter password",
                                })}
                                helperText={errors.password ? "Please enter new password" : ""}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="confirm_password"
                                label="Confirm Password"
                                variant="outlined"
                                name="confirm_password"
                                // value={resetPass.confirm_password}
                                type="password"
                                onChange={handleChangePassword}
                                fullWidth
                                required
                                error={(errors.confirm_password ? true : false)}
                                {...register("confirm_password", {
                                    required: "Please enter confirm password",
                                })}
                                helperText={errors.confirm_password ? "Please enter confirm password" : ""}
                            />
                        </Grid>
                    </Grid>
                    {passNotify && passerrors?.message &&
                        <Notification
                            data={passerrors?.message}
                            status="error"
                        />
                    }
                    {passNotify && passChange?.message &&
                        <Notification
                            data={passChange?.message}
                            status="success"
                        />
                    }
                    <Box className={classes.footerBtn}>
                        {/* <Button color="primary">
                            Cancel
                        </Button> */}
                        <Button color="secondary" variant="contained" type="submit">
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default Profile