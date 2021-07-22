import React, { useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField, Select, FormControl, MenuItem, InputLabel,
    FormGroup, FormControlLabel, Checkbox
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },

    formControl: {
        width: "100%"
    },
    footerBtn:{
        display:"flex",
        justifyContent:"flex-end",
        marginTop:"24px",
        '& > *': {
            margin: theme.spacing(1),
        },
    }
}))

const CreateBooking = () => {
    const classes = useStyle();
    const [data, setData] = useState({
        referenceId: "12345",
        trust: "",
        ward: "",
        grade: "",
        date: "",
        shiftTime: "",
        rate:""
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    console.log('data: ', data);
    return (
        <Paper className={classes.root}>

            <form>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="referenceId"
                            label="Reference Id"
                            variant="outlined"
                            name="referenceId"
                            value={data.referenceId}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Trust Name</InputLabel>
                            <Select
                                value={data.trust}
                                onChange={handleChange}
                                label="Trust Name"
                                name="trust"
                            >
                                <MenuItem value="">
                                    Select Trust Hospital
                                </MenuItem>
                                <MenuItem value="Ana Care Hospital">Ana Care Hospital</MenuItem>
                                <MenuItem value="Apex Care Hospital">Apex Care Hospital</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Ward Name</InputLabel>
                            <Select
                                value={data.ward}
                                onChange={handleChange}
                                name="ward"
                                label="Ward Name"
                            >
                                <MenuItem value="">
                                    Select a ward
                                </MenuItem>
                                <MenuItem value="ward number one">ward number one</MenuItem>
                                <MenuItem value="ward number two">ward number two</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Grade Required</InputLabel>
                            <Select
                                value={data.grade}
                                onChange={handleChange}
                                name="grade"
                                label="Grade Required"
                            >
                                <MenuItem value="">
                                    Select a grade
                                </MenuItem>
                                <MenuItem value="Critical Sector Band 4">Critical Sector Band 4</MenuItem>
                                <MenuItem value="Mental Health Sector Band 4">Mental Health Sector Band 4</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="date"
                            label="Date"
                            type="date"
                            name="date"
                            defaultValue="2017-05-24"
                            className={classes.textField}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Shift Time</InputLabel>
                            <Select
                                value={data.shiftTime}
                                onChange={handleChange}
                                label="Grade Required"
                                name="shiftTime"
                            >
                                <MenuItem value="">
                                    Select a shift time
                                </MenuItem>
                                <MenuItem value="07:30 - 13:00">07:30 - 13:00</MenuItem>
                                <MenuItem value="15:30 - 20:00">15:30 - 20:00</MenuItem>
                                <MenuItem value="07:30 - 19:30">07:30 - 19:30</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="rate"
                            label="Rate"
                            variant="outlined"
                            name="rate"
                            value={data.rate}
                            onChange={handleChange}
                            fullWidth
                            InputProps={{
                                readOnly: true,
                            }}
                        />
                    </Grid>

                    

                    <Grid item xs={12}>
                        <p className="mt-6">Specialities</p>
                        <FormGroup aria-label="position" row>
                            <Grid container>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={data.checkedG} onChange={handleChange} name="checkedB" />}
                                        label="Acute Assessment"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={data.checkedG} onChange={handleChange} name="checkedB" />}
                                        label="Allocation On Arrival"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={data.checkedG} onChange={handleChange} name="checkedB" />}
                                        label="Cardiology"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={data.checkedG} onChange={handleChange} name="checkedB" />}
                                        label="Emergency"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={data.checkedG} onChange={handleChange} name="checkedB" />}
                                        label="Endoscopy"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={data.checkedG} onChange={handleChange} name="checkedB" />}
                                        label="Isolation"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={data.checkedG} onChange={handleChange} name="checkedB" />}
                                        label="Respiratory"
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6} md={4} lg={3}>
                                    <FormControlLabel
                                        control={<Checkbox color="primary" checked={data.checkedG} onChange={handleChange} name="checkedB" />}
                                        label="Surgical"
                                    />
                                </Grid>
                            </Grid>
                        </FormGroup>
                    </Grid>
                </Grid>

                <Box className={classes.footerBtn}>
                    <Button color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained">
                        Save & Confirm
                    </Button>
                    <Button color="secondary" variant="contained">
                        Save & Add another
                    </Button>
                </Box>
            </form>
        </Paper>
    )
}

export default CreateBooking
