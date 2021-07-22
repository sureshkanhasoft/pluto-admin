import React, { Fragment, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField,
    RadioGroup, FormControlLabel, Radio, Typography, Divider,
    FormControl, InputLabel, Select, MenuItem
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

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
    },
    radioGroup: {
        flexDirection: "row"
    }
}))

const CreateTrust = () => {
    const classes = useStyle();
    const [inputFields, setInputFields] = useState([]);
    const [wardsFields, setWardsFields] = useState([]);
    const [data, setData] = useState({
        trustName: "",
        trustCode: "",
        invoiceMethod: "",
        trustEmail: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        portalurl: "",
        emailAddress: "",
        password: "",
        wardType: "",
        wardName: ""
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };
    const handleAddFields = () => {
        const values = [...inputFields];
        values.push({ firstName: '' });
        setInputFields(values);
    }
    const handleAddFieldsWard = () => {
        const values = [...wardsFields];
        values.push({ wards: '' });
        setWardsFields(values);
    }
    return (
        <>
            <Paper className={classes.root}>
                <form>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="trustName"
                                label="Trust Name"
                                variant="outlined"
                                name="trustName"
                                value={data.trustName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="trustCode"
                                label="Trust Code"
                                variant="outlined"
                                name="trustCode"
                                value={data.trustCode}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box className="mt-3">
                                <Typography>Preferred Invoice Method</Typography>
                                <RadioGroup name="invoiceMethod" value={data.invoiceMethod} onChange={handleChange} className={classes.radioGroup}>
                                    <FormControlLabel value="byPost" control={<Radio />} label="By Post" />
                                    <FormControlLabel value="byEmail" control={<Radio />} label="By Email" />
                                </RadioGroup>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                            <TextField
                                id="trustEmail"
                                label="Trust Email"
                                variant="outlined"
                                name="trustEmail"
                                value={data.trustEmail}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        {/* <Grid item xs={12} >
                            <div className="pt-5 pb-4">
                                <Divider />
                            </div>
                        </Grid> */}
                        <Grid item xs={12}>
                            <Typography>Trust Address</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address1"
                                label="Address line 1"
                                variant="outlined"
                                name="address1"
                                value={data.address1}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address2"
                                label="Address line 2"
                                variant="outlined"
                                name="address2"
                                value={data.address2}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="city"
                                label="Town / City"
                                variant="outlined"
                                name="city"
                                value={data.city}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="postcode"
                                label="Postcode"
                                variant="outlined"
                                name="postcode"
                                value={data.postcode}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} >
                            <div className="pt-5 pb-4">
                                <Divider />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Portal Login Detail</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="portalurl"
                                label="Trust Portal URl"
                                variant="outlined"
                                name="portalurl"
                                value={data.portalurl}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="emailAddress"
                                label="Email Address"
                                variant="outlined"
                                name="emailAddress"
                                value={data.emailAddress}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                name="password"
                                value={data.password}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <div className="pt-5 pb-4">
                                <Divider />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Training</Typography>
                        </Grid>

                        {
                            inputFields && inputFields.map((inputField, index) => {
                                return (
                                    <Grid item xs={12} sm={6} key={`${inputField}~${index}`}>
                                        <TextField
                                            id="trianing"
                                            label="Training example type"
                                            variant="outlined"
                                            name="trianing"
                                            value={data.trianing}
                                            onChange={handleChange}
                                            fullWidth
                                        />
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12} sm={6} lg={4}>
                            <Button onClick={() => handleAddFields()} color="secondary">
                                <AddCircleOutlineIcon className="mr-3" />
                                <Typography >Add Training </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} >
                            <div className="pt-5 pb-4">
                                <Divider />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Wards</Typography>
                        </Grid>

                        {
                            wardsFields && wardsFields.map((wardsField, index) => {
                                return (
                                    <Fragment key={`${wardsField}~${index}`}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                id="wardName"
                                                label="Ward Name"
                                                variant="outlined"
                                                name="wardName"
                                                value={data.wardName}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel>Type</InputLabel>
                                                <Select
                                                    value={data.wardType}
                                                    onChange={handleChange}
                                                    label="Trust Name"
                                                    name="wardType"
                                                >
                                                    <MenuItem value="">
                                                        Select Type
                                                    </MenuItem>
                                                    <MenuItem value="Hospital">Hospital</MenuItem>
                                                    <MenuItem value="GPClinic">GP Clinic</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <TextField
                                                id="wardNumber"
                                                label="Ward Number"
                                                variant="outlined"
                                                name="wardNumber"
                                                value={data.wardNumber}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                    </Fragment>
                                )
                            })
                        }
                        <Grid item xs={12} sm={6} lg={4}>
                            <Button onClick={() => handleAddFieldsWard()} color="secondary">
                                <AddCircleOutlineIcon className="mr-3" />
                                <Typography >Add Another Wards</Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} >
                            <div className="pt-5 pb-4">
                                <Divider />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <Typography>Contact Information</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="firstName"
                                label="First Name"
                                variant="outlined"
                                name="firstName"
                                value={data.firstName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="lastName"
                                label="Last Name"
                                variant="outlined"
                                name="lastName"
                                value={data.lastName}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="contactEmail"
                                label="Email"
                                variant="outlined"
                                name="contactEmail"
                                value={data.contactEmail}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="number"
                                label="Contact Number"
                                variant="outlined"
                                name="number"
                                value={data.number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="client"
                                label="Client"
                                variant="outlined"
                                name="client"
                                value={data.client}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="department"
                                label="Department"
                                variant="outlined"
                                name="department"
                                value={data.department}
                                onChange={handleChange}
                                fullWidth
                            />
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
        </>
    )
}

export default CreateTrust