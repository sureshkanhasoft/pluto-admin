import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, TextField, Button, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import logo from '../../../assets/images/logo.svg';
import { forgotpassword } from '../../../store/action';
import { useForm } from "react-hook-form";

const useStyle = makeStyles({
    loginContainer: {
        width: "100%",
        height: "100%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#2b68a4",
        flexDirection: "column"
    },
    loginCard: {
        width: "100%",
        maxWidth: 480,
        padding: "36px 24px 24px",
        background: "#dceeff",
        boxShadow: "0 1px 35px rgba(11, 48, 86, 0.50)",
    },
    form: {
        width: "100%",
        display: "flex",
        flexDirection: "column"
    },
    error: {
        marginBottom: "15px",
        paddingLeft: "7px",
        color: "red"
    },
    success: {
        marginBottom: "15px",
        paddingLeft: "7px",
        color: "green"
    },
    textField: {
        marginBottom: 24,
        color: "#000",
        "& input": {
            paddingLeft: 12
        },
        "& svg": {
            color: "#2b68a4"
        }
    },
    forgotCont: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 24,
    },
    forgotText: {
        color: "#2b68a4",
        fontSize: 13,
        borderBottom: "1px dashed #2b68a4"
    },
    resetBtn: {
        width: 180,
        borderRadius: "4px",
        margin: "0 auto",
        background: "#ff8b46",
        "&:hover": {
            background: "#ff8b46"
        }
    },
    subTitle: {
        fontSize: 20,
        color: "#9dcbec",
        marginBottom: 20
    },
    descText: {
        marginBottom: 20
    },
    validationError: {
        marginTop: "-14px",
        marginBottom: "10px",
        color: "red"
    },
})

const ForgottenPassword = ({ history }) => {
    const classes = useStyle();
    const [show, setShow] = useState(true)
    const dispatch = useDispatch()
    const { forgotsuccess, forgoterrors } = useSelector(state => state.authReducer)
    const [data, setData] = useState({ email: "" })
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const onSubmit = async data => {
        // dispatch(forgotpassword(data));
        // reset();
    };
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    // const toggleContainer = () => {
    //     // setShow(false)
    // }
    // const handleSubmit = () => {
    //     const { email } = data;
    //     if (email) {
    //         dispatch(forgotpassword(data));
    //     }
    // }

    return (
        <>
            <Grid className={classes.loginContainer}>
                <div className="mb-6">
                    <img src={logo} alt="" />
                </div>
                {
                    show
                        ?
                        <>
                            <Typography className={classes.subTitle}>Reset your password</Typography>
                            <Card className={classes.loginCard}>
                                {forgoterrors?.message &&
                                    <div className={classes.error}>
                                        {forgoterrors?.message}
                                    </div>
                                }
                                {forgotsuccess?.message &&
                                    <div className={classes.success}>
                                        {forgotsuccess?.message}
                                    </div>
                                }

                                <form className={classes.form} onSubmit={handleSubmit(onSubmit)} >
                                    <TextField
                                        id="email"
                                        name="email"
                                        label="Email"
                                        autoComplete="off"
                                        // value={data.email}
                                        onChange={handleChange}
                                        type="email"
                                        variant="outlined"
                                        InputProps={{
                                            startAdornment: <MailIcon />
                                        }}
                                        aria-invalid={errors.password ? "true" : "false"}
                                        {...register("email", {
                                            required: "Please enter email",
                                        })}
                                        className={classes.textField}
                                    />
                                    {errors.email && <span className={classes.validationError} role="alert"> {errors.email.message}</span>}

                                    <div className={classes.forgotCont}>
                                        <Link to="/login" className={classes.forgotText}>Back to Login</Link>
                                    </div>
                                    {/* <Button variant="contained" color="primary" className={classes.resetBtn} onClick={toggleContainer}> */}
                                    <Button variant="contained"  type="submit" color="primary" className={classes.resetBtn} onClick={handleSubmit} disabled={forgotsuccess?.status}>
                                        Reset Password
                                    </Button>
                                </form>
                            </Card>
                        </>
                        :
                        <>
                            <Typography className={classes.subTitle}>Check your inbox</Typography>
                            <Card className={classes.loginCard} align="center">
                                <Typography className={classes.descText}>We have sent you an email containing details on how to reset your password.</Typography>
                                <Button variant="contained" color="primary" className={classes.resetBtn}>
                                    {/* Back */}
                                    <Link to="/login" >Back to Login</Link>
                                </Button>
                            </Card>
                        </>
                }
            </Grid>
        </>
    )
}

export default ForgottenPassword