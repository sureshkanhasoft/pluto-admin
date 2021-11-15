import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, TextField, Button, makeStyles, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import logo from '../../../assets/images/logo.svg'
import { login } from '../../../store/action';
import { useForm } from "react-hook-form";
import Notification from '../../../components/Notification/Notification';

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
    validationError: {
        marginTop: "-14px",
        marginBottom: "10px",
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
    loginBtn: {
        width: 140,
        borderRadius: "4px",
        margin: "0 auto",
        background: "#ff8b46",
        "&:hover": {
            background: "#ff8b46"
        }
    }
})

const Login = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const { loading, loginErrors, userInfo } = useSelector(state => state.authReducer)
    console.log('loginErrors: ', loginErrors);
    const [loginNotify, setLoginNotify]=useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const onSubmit = async data => {
        dispatch(login(data))
        setLoginNotify(true)
        // reset();
    };
    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
   

    // const handleSubmit = () => {
    //     const { email, password } = data;
    //     if (email && password) {
    //         dispatch(login(data))
    //     }
    // }

    // const validation = (email) => {
    //     let errors= {};
    //     let isValid = true;

    //     if(typeof email !== "undefined"){
    //         console.log('email: ', email);
    //         var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    //         if(!pattern.test(email)){
    //             isValid = false;
    //             errors[email]="please enter your email id"
    //         }
    //     }
    // }

    return (
        <>
            <Grid className={classes.loginContainer}>
                <div className="mb-6">
                    <img src={logo} alt="" />
                </div>

                <Card className={classes.loginCard}>
                    {loginNotify && (loginErrors?.message || loginErrors) && 
                        <Notification
                            data= {loginErrors?.message || loginErrors }
                            status="error"
                        />
                    }
                    {/* {loginNotify && (loginErrors?.message || loginErrors) && 
                        <Notification
                            data= {loginErrors?.message || loginErrors?.message ? loginErrors?.message : loginErrors ? "Sorry, your account does't exists" :""}
                            status="error"
                        />
                    } */}
                    {loginNotify && userInfo?.message &&
                        <Notification
                            data= {userInfo?.message}
                            status="success"
                        />
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
                          required
                          aria-invalid={errors.password ? "true" : "false"}
                          {...register("email", {
                              required: "Please enter email",
                          })}
                          className={classes.textField}
                        />
                        {errors.email && <span className={classes.validationError} role="alert"> {errors.email.message}</span>}
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            autoComplete="off"
                            // value={data.password}
                            onChange={handleChange}
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <LockIcon />
                            }}
                            required
                            aria-invalid={errors.password ? "true" : "false"}
                            {...register("password", {
                                required: "Please enter password",
                                // minLength: {
                                //     value: 5,
                                //     message: "min length is 5"
                                // }
                            })}
                            className={classes.textField}
                        />
                        {errors.password && <span className={classes.validationError} role="alert"> {errors.password.message}</span>}
                        <div className={classes.forgotCont}>
                            <Link to="/forgotten-password" className={classes.forgotText}>Forgotten your password?</Link>
                        </div>
                        {/* <Button variant="contained" color="primary" className={classes.loginBtn} onClick={handleSubmit}> */}
                        <Button variant="contained" color="primary" className={classes.loginBtn} type="submit" formNoValidate>
                            {loading ? <CircularProgress style={{ width: 18, height: 18, marginRight: 12 }} /> : ""}login
                        </Button>
                    </form>
                </Card>
            </Grid>
        </>
    )
}

export default Login