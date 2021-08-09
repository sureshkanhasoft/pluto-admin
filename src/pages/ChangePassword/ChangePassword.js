import React, { useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Grid, TextField, IconButton
} from '@material-ui/core';
import { useForm } from "react-hook-form";
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { useDispatch, useSelector } from 'react-redux';
import { orgChangePassword } from '../../store/action';
import Notification from '../../components/Notification/Notification';

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

const ChangePassword = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [showPass, setShowPass]= useState(false)
    const [showCPass, setShowCPass]= useState(false)
    const [passNotify, setPassNotify]= useState(false)
    const { passChange, passerrors } = useSelector(state => state.orgProfile)
    const {register, handleSubmit, formState: { errors }} = useForm();
    const [data, setData] = useState({
        old_password: "",
        password: "",
        confirm_password: "",
    })
    const handleChangePassword = (event) => {
        console.log('event: ', event);
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    };
    const handleClickShowCPassword = () => {
        setShowCPass(!showCPass);
    };
    const onSubmit = async(data) => {
        dispatch(orgChangePassword(data))
        setPassNotify(true)
    }
    return (
        <>
         
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
            <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>
            <Paper className={classes.root}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Grid container spacing={2} direction="column">
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
                                type={showPass ? "text" : "password"}
                                onChange={handleChangePassword}
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: <IconButton onClick={handleClickShowPassword}>
                                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }}
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
                                type={showCPass ? "text" : "password"}
                                onChange={handleChangePassword}
                                fullWidth
                                required
                                InputProps={{
                                    endAdornment: <IconButton onClick={handleClickShowCPassword}>
                                        {showCPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }}
                                error={(errors.confirm_password ? true : false)}
                                {...register("confirm_password", {
                                    required: "Please enter Confirm password",
                                })}
                                helperText={errors.confirm_password ? "Please enter confirm password" : ""}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Button color="secondary" variant="contained" type="submit">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                
            </Paper>
        </>
    )
}

export default ChangePassword
