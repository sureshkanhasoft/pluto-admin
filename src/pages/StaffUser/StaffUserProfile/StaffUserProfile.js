import React, { useState, useEffect } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField
} from '@material-ui/core';
// import { changePassword, getProfile, updateProfile } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../../../components/Notification/Notification';
// import { changePassword, getProfile, updateProfile } from '../../../store/action';
// import Notification from '../../components/Notification/Notification';
import { useForm } from "react-hook-form";
import { getStaffProfile, staffChangePassword, updateStaffProfile } from '../../../store/action';
// import MuiAlert from '@material-ui/lab/Alert';
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

const StaffUserProfile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { passChange, passerrors, profileErrors, profileData, profile, loading,profileStaffErrors } = useSelector(state => state.staffProfile)
    const [profileNotify, setProfileNotify] = useState(false)
    const [passNotify, setPassNotify] = useState(false)
    const { register, handleSubmit, formState: { errors }, reset } = useForm();

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

    useEffect(() => {
        const getProfileDetail = () => {
            dispatch(getStaffProfile())
        }
        getProfileDetail()
    }, [dispatch])

    const onSubmit = async data => {
        dispatch(staffChangePassword(data))
        setPassNotify(true)
        // reset();
    };

    useEffect(() => {
        if (profile.data) {
            setData(profile.data)
        }
    }, [profile.data])

    const profileSubmit = (e) => {
        e.preventDefault()
        dispatch(updateStaffProfile(data))
        setProfileNotify(true)
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
                passNotify && (passerrors || passerrors?.message) &&
                <Notification
                        data={passerrors || passerrors?.message}
                        status="error"
                />
            }
            {passNotify && passChange?.message &&
                <Notification
                        data={passChange?.message}
                        status="success"
                />
            }

            <Paper className={classes.root}>
                <h3 className={classes.title}>Change Password</h3>


                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
                        <Button color="secondary" formNoValidate variant="contained" type="submit">
                            Save
                        </Button>
                    </Box>
                </form>
            </Paper>

            <Paper className={classes.root}>
                <h3 className={classes.title}>Profile Details</h3>
                <form className={classes.form} onSubmit={profileSubmit} >

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
                                value={data.first_name?data.first_name:""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileStaffErrors.message?.first_name}
                                error={
                                    !!profileStaffErrors.message?.first_name
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField

                                id="last_name"
                                label="Last Name"
                                variant="outlined"
                                name="last_name"
                                value={data.last_name?data.last_name:""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileStaffErrors.message?.last_name}
                                error={!!profileStaffErrors.message?.last_name}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={data.email?data.email:""}
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
                                value={data.contact_number?data.contact_number:""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileStaffErrors.message?.contact_number}
                                error={
                                    !!profileStaffErrors.message?.contact_number}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField

                                id="address_line_1"
                                label="Address line 1"
                                variant="outlined"
                                name="address_line_1"
                                value={data.address_line_1?data.address_line_1:""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileStaffErrors.message?.address_line_1}
                                error={!!profileStaffErrors.message?.address_line_1}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="address_line_2"
                                label="Address line 2"
                                variant="outlined"
                                name="address_line_2"
                                value={data.address_line_2?data.address_line_2:""}
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
                                value={data.city?data.city:""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileStaffErrors.message?.city}
                                error={!!profileStaffErrors.message?.city}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField

                                id="postcode"
                                label="Postcode"
                                variant="outlined"
                                name="postcode"
                                value={data.postcode?data.postcode:""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={profileStaffErrors.message?.postcode}
                                error={!!profileStaffErrors.message?.postcode}
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

           
        </>
    )
};

export default StaffUserProfile;