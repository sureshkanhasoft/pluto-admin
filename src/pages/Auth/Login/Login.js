import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, TextField, Button, makeStyles, CircularProgress } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import LockIcon from '@material-ui/icons/Lock';
import logo from '../../../assets/images/logo.svg'
import { login } from '../../../store/action';

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

    const { loading, errors } = useSelector(state => state.authReducer)

    const [data, setData] = useState({
        email: "",
        password: ""
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        const {email,password} = data;
        if(email && password){
            dispatch(login(data))
        }
    }

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
                    <form className={classes.form}>
                        <TextField
                            id="email"
                            name="email"
                            label="Email"
                            value={data.email}
                            onChange={handleChange}
                            variant="outlined"
                            InputProps={{
                                startAdornment: <MailIcon />
                            }}
                            className={classes.textField}
                            required
                            error={errors === true}
                        />
                        <TextField
                            id="password"
                            name="password"
                            label="Password"
                            value={data.password}
                            onChange={handleChange}
                            variant="outlined"
                            type="password"
                            InputProps={{
                                startAdornment: <LockIcon />
                            }}
                            className={classes.textField}
                            error={errors === true}
                        />
                        <div className={classes.forgotCont}>
                            <Link to="/forgotten-password" className={classes.forgotText}>Forgotten your password?</Link>
                        </div>
                        <Button variant="contained" color="primary" className={classes.loginBtn} onClick={handleSubmit}>
                            {loading ? <CircularProgress style={{ width: 18, height: 18, marginRight: 12 }} /> : ""}login
                        </Button>
                    </form>
                </Card>
            </Grid>
        </>
    )
}

export default Login