import React, { useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Grid, TextField, IconButton
} from '@material-ui/core';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';

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
    const [data, setData] = useState({
        oldPassword: "",
        newPassword: "",
        confirmPassword: "",
        showPassword: false,
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleClickShowPassword = () => {
        console.log('sdfsdf')
        console.log('data', data)
        setData({ ...data, showPassword: !data.showPassword });
    };
    return (
        <>
            <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>
            <Paper className={classes.root}>
                <form>
                    <Grid container spacing={2} direction="column">
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="oldPassword"
                                label="Enter Old Password"
                                variant="outlined"
                                name="oldPassword"
                                value={data.oldPassword}
                                onChange={handleChange}
                                type={data.showPassword ? "text" : "password"}
                                fullWidth
                                InputProps={{
                                    endAdornment: <IconButton onClick={handleClickShowPassword}>
                                        {data.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="newPassword"
                                label="Enter New Password"
                                variant="outlined"
                                name="newPassword"
                                value={data.newPassword}
                                type={data.showPassword ? "text" : "password"}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: <IconButton onClick={handleClickShowPassword}>
                                        {data.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="confirmPassword"
                                label="Confirm Password"
                                variant="outlined"
                                name="confirmPassword"
                                value={data.confirmPassword}
                                type={data.showPassword ? "text" : "password"}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    endAdornment: <IconButton onClick={handleClickShowPassword}>
                                        {data.showPassword ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                    </IconButton>
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <Button color="secondary" variant="contained">
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
