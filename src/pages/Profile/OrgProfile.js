import React, { useState, useEffect } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField
} from '@material-ui/core';
import { getOrgProfile, orgChangePassword, updateOrgProfile } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../../components/Notification/Notification';
import { useForm } from "react-hook-form";
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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

const OrgProfile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [profileNotify, setProfileNotify] = useState(false)
    const [data, setData] = useState({
        organization_name: "",
        first_name: "",
        last_name: "",
        email: '',
        contact_number: '',
        address_line_1: '',
        address_line_2: '',
        city: '',
        postcode: '',
    })
    const { profile, loading } = useSelector(state => state.orgProfile)
    const { profileOrgErrors, profileOrgSuccess } = useSelector(state => state.orgProfile)
    const [passNotify, setPassNotify] = useState(false)
    const { passChange, passerrors } = useSelector(state => state.orgProfile)
    console.log('passerrors: ', passerrors);
    const {register, handleSubmit, formState: { errors }} = useForm();

    const [passData, setPassData] = useState({
        old_password: "",
        password: "",
        confirm_password: "",
    })

    const handleChangePassword = (event) => {
        setPassData({ ...passData, [event.target.name]: event.target.value });
    };

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };



    useEffect(() => {
        const getProfileDetail = () => {
            dispatch(getOrgProfile())
        }
        getProfileDetail()
    }, [dispatch])

    useEffect(() => {
        if (profile.data) {
            setData(profile.data)
        }
    }, [profile.data])

    const profileSubmit = () => {
        dispatch(updateOrgProfile(data))
        setProfileNotify(true)
    }

    const onSubmit = async (passData) => {
        dispatch(orgChangePassword(passData))
        setPassNotify(true)
    }


    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {profileNotify && profileOrgSuccess?.message &&
                <Notification
                    data={profileOrgSuccess?.message}
                    status="success"
                />
            }

            {passNotify && (passerrors || passerrors?.message) &&
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
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="organization_name"
                            label="Organization Name"
                            variant="outlined"
                            name="organization_name"
                            value={data.organization_name ? data.organization_name : ""}
                            onChange={handleChange}
                            fullWidth
                            disabled
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
                            id="contact_person_name"
                            label="Contact Person Name"
                            variant="outlined"
                            name="contact_person_name"
                            value={data.contact_person_name ? data.contact_person_name : ""}
                            onChange={handleChange}
                            fullWidth
                            required
                            helperText={profileOrgErrors?.message?.contact_person_name}
                            error={
                                !!profileOrgErrors?.message?.contact_person_name
                            }
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="contact_number"
                            label="Contact Number"
                            variant="outlined"
                            name="contact_number"
                            value={data.contact_number ? data.contact_number : ""}
                            onChange={handleChange}
                            fullWidth
                            required
                            helperText={profileOrgErrors?.message?.contact_number}
                            error={
                                !!profileOrgErrors?.message?.contact_number
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="address_line_1"
                            label="Address line 1"
                            variant="outlined"
                            name="address_line_1"
                            value={data.address_line_1 ? data.address_line_1 : ""}
                            onChange={handleChange}
                            fullWidth
                            required
                            helperText={profileOrgErrors.message?.address_line_1}
                            error={!!profileOrgErrors.message?.address_line_1}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="address_line_2"
                            label="Address line 2"
                            variant="outlined"
                            name="address_line_2"
                            value={data.address_line_2 ? data.address_line_2 : ""}
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
                            value={data.city ? data.city : ""}
                            onChange={handleChange}
                            fullWidth
                            required
                            helperText={profileOrgErrors.message?.city}
                            error={!!profileOrgErrors.message?.city}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="postcode"
                            label="Postcode"
                            variant="outlined"
                            name="postcode"
                            value={data.postcode ? data.postcode : ""}
                            onChange={handleChange}
                            fullWidth
                            required
                            helperText={profileOrgErrors.message?.postcode}
                            error={!!profileOrgErrors.message?.postcode}
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


            </Paper>

            <Paper className={classes.root}>
            <h3 className={classes.title}>Change Password</h3>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                                label="Enter New Password"
                                variant="outlined"
                                name="password"
                                // value={data.password}
                                // type={showPass ? "text" : "password"}
                                type="password"
                                onChange={handleChangePassword}
                                fullWidth
                                required
                                // InputProps={{
                                //     endAdornment: <IconButton onClick={handleClickShowPassword}>
                                //         {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                //     </IconButton>
                                // }}
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
                                // value={data.confirm_password}
                                // type={showCPass ? "text" : "password"}
                                type="password"
                                onChange={handleChangePassword}
                                fullWidth
                                required
                                // InputProps={{
                                //     endAdornment: <IconButton onClick={handleClickShowCPassword}>
                                //         {showCPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                //     </IconButton>
                                // }}
                                error={(errors.confirm_password ? true : false)}
                                {...register("confirm_password", {
                                    required: "Please enter Confirm password",
                                })}
                                helperText={errors.confirm_password ? "Please enter confirm password" : ""}
                            />
                        </Grid>
                        {/* <Grid className={classes.footerBtn}>
                            <Button color="secondary" variant="contained" type="submit" formNoValidate>
                                Save
                            </Button>
                        </Grid> */}
                    </Grid>
                    <Box className={classes.footerBtn}>
                    <Button color="secondary" variant="contained" type="submit" formNoValidate>
                                Save
                            </Button>
                    </Box>
                </form>

            </Paper>


        </>
    )
}

export default OrgProfile
