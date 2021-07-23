import React, { useState } from 'react'
import { Grid, Card, TextField, Button, makeStyles, Typography } from '@material-ui/core';
import { Link } from 'react-router-dom';
import MailIcon from '@material-ui/icons/Mail';
import logo from '../../../assets/images/logo.svg';

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
    }
})

const ForgottenPassword = ({ history }) => {
    const classes = useStyle();
    const [show, setShow] = useState(true)

    const [data, setData] = useState({
        email: "",
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const toggleContainer = () => {
        setShow(false)
    }

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
                                    />

                                    <div className={classes.forgotCont}>
                                        <Link to="/login" className={classes.forgotText}>Back to Login</Link>
                                    </div>
                                    <Button variant="contained" color="primary" className={classes.resetBtn} onClick={toggleContainer}>
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
                                    Back
                                </Button>
                            </Card>
                        </>
                }

            </Grid>
        </>
    )
}

export default ForgottenPassword