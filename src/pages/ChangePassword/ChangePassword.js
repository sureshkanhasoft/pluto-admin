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
    const { passChange, passerrors, profileErrors, profileData } = useSelector(state => state.profile)
    const {register, handleSubmit, formState: { errors }, setValue, reset } = useForm();
    const [data, setData] = useState({
        old_password: "",
        password: "",
        conform_password: "",
    })
    const handleChangePassword = (event) => {
        console.log('event: ', event);
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setShowPass(!showPass);
    };
    const onSubmit = async(data) => {
        dispatch(orgChangePassword(data))
    }
    return (
        <>
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
                                {...register("old_password", {
                                    required: "Please enter old password",
                                })}
                                autoComplete="new-password"
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
                                InputProps={{
                                    endAdornment: <IconButton onClick={handleClickShowPassword}>
                                        {showPass ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }}
                                error={(errors.password ? true : false)}
                                {...register("password", {
                                    required: "Please enter password",
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="conform_password"
                                label="Confirm Password"
                                variant="outlined"
                                name="conform_password"
                                // value={data.conform_password}
                                type={data.showPassword ? "text" : "password"}
                                onChange={handleChangePassword}
                                fullWidth
                                InputProps={{
                                    endAdornment: <IconButton onClick={handleClickShowPassword}>
                                        {data.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }}
                                error={(errors.conform_password ? true : false)}
                                {...register("conform_password", {
                                    required: "Please enter conform password",
                                })}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Button color="secondary" variant="contained" type="submit">
                                Save
                            </Button>
                        </Grid>
                    </Grid>
                </form>
                {passerrors?.message &&
                    <div className={classes.error}>
                        {passerrors?.message}
                    </div>
                }
                {passChange?.message &&
                    <div className={classes.success}>
                        {passChange?.message}
                    </div>
                }
            </Paper>
        </>
    )
}

export default ChangePassword
