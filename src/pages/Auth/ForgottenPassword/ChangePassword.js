import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Grid, Card, TextField, Button, makeStyles, Typography } from '@material-ui/core';
import logo from '../../../assets/images/logo.svg';
import LockIcon from '@material-ui/icons/Lock';
import { changepassword } from '../../../store/action';

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
    changeCont: {
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: 24,
    },
    changeText: {
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

const ChangePassword = ({ history }) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const params = new URLSearchParams(window.location.search);
    const dId = params.get('query');
    const { changesuccess, changeerrors } = useSelector(state => state.authReducer)

    const [data, setData] = useState({
        password: "",
        conform_password: "",
        decode_id: dId,
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const handleSubmit = () => {
        const { decode_id, password, conform_password } = data;
        if (decode_id && password && conform_password) {
            dispatch(changepassword(data));
        }
    }
    return (
        <>
            <Grid className={classes.loginContainer}>
                <div className="mb-6">
                    <img src={logo} alt="" />
                </div>
                <Typography className={classes.subTitle}>Change your password</Typography>
                <Card className={classes.loginCard}>
                    {changeerrors?.message &&
                        <div className={classes.error}>
                            {changeerrors?.message}
                        </div>
                    }
                    {changesuccess?.message &&
                        <div className={classes.success}>
                            {changesuccess?.message}
                        </div>
                    }
                    <form className={classes.form}>
                        <TextField
                            id="password"
                            name="password"
                            label="password"
                            value={data.password}
                            onChange={handleChange}
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <LockIcon />
                            }}
                            className={classes.textField}
                        />
                        <TextField
                            id="conform_password"
                            name="conform_password"
                            label="conform password"
                            value={data.conform_password}
                            onChange={handleChange}
                            type="password"
                            variant="outlined"
                            InputProps={{
                                startAdornment: <LockIcon />
                            }}
                            className={classes.textField}
                        />
                        <Button variant="contained" color="primary" onClick={handleSubmit} className={classes.resetBtn} disabled={changesuccess?.status}>
                            Change Password
                        </Button>
                    </form>
                </Card>

            </Grid>
        </>
    )
}

export default ChangePassword