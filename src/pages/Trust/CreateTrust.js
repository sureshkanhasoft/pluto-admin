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
        name: "",
        code: "",
        preference_invoive_method: "",
        email_address: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        post_code: "",
        trust_portal_url: "",
        portal_email: "",
        portal_password: "",
        first_name: "",
        last_name: "",
        contact_email_address: "",
        phone_number: "",
        client: "",
        department: "",
        ward: [
            {
                ward_name: "",
                ward_type: "",
                ward_number: "",
            }
        ],

        traning: [
            {
                traning_name: ""
            }
        ],
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

    const submitData = (e) => {
        e.preventDefault();
    }

    return (
        <>
            <Paper className={classes.root}>
                <form onSubmit={(e) => submitData(e)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="name"
                                label="Trust Name"
                                variant="outlined"
                                name="name"
                                value={data?.name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="code"
                                label="Trust Code"
                                variant="outlined"
                                name="code"
                                value={data?.code}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Box className="mt-3">
                                <Typography>Preferred Invoice Method</Typography>
                                <RadioGroup name="preference_invoive_method" value={data?.preference_invoive_method} onChange={handleChange} className={classes.radioGroup}>
                                    <FormControlLabel value="byPost" control={<Radio />} label="By Post" />
                                    <FormControlLabel value="byEmail" control={<Radio />} label="By Email" />
                                </RadioGroup>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                            <TextField
                                id="email_address"
                                label="Trust Email"
                                variant="outlined"
                                name="email_address"
                                value={data?.email_address}
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
                                id="address_line_1"
                                label="Address line 1"
                                variant="outlined"
                                name="address_line_1"
                                value={data.address_line_1}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address_line_2"
                                label="Address line 2"
                                variant="outlined"
                                name="address_line_2"
                                value={data.address_line_2}
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
                                id="post_code"
                                label="Postcode"
                                variant="outlined"
                                name="post_code"
                                value={data.post_code}
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
                                id="trust_portal_url"
                                label="Trust Portal URl"
                                variant="outlined"
                                name="trust_portal_url"
                                value={data.trust_portal_url}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="portal_email"
                                label="Email Address"
                                variant="outlined"
                                name="portal_email"
                                value={data.portal_email}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="portal_password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                name="portal_password"
                                value={data.portal_password}
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
                                            id="traning_name"
                                            label="Training example type"
                                            variant="outlined"
                                            name="traning_name"
                                            value={data.traning_name}
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
                                                id="ward_name"
                                                label="Ward Name"
                                                variant="outlined"
                                                name="ward_name"
                                                value={data.ward_name}
                                                onChange={handleChange}
                                                fullWidth
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={4}>
                                            <FormControl variant="outlined" className={classes.formControl}>
                                                <InputLabel>Type</InputLabel>
                                                <Select
                                                    value={data.ward_type}
                                                    onChange={handleChange}
                                                    label="Trust Name"
                                                    name="ward_type"
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
                                                id="ward_number"
                                                label="Ward Number"
                                                variant="outlined"
                                                name="ward_number"
                                                value={data.ward_number}
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
                                id="first_name"
                                label="First Name"
                                variant="outlined"
                                name="first_name"
                                value={data.first_name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="last_name"
                                label="Last Name"
                                variant="outlined"
                                name="last_name"
                                value={data.last_name}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="contact_email_address"
                                label="Email"
                                variant="outlined"
                                name="contact_email_address"
                                value={data.contact_email_address}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="phone_number"
                                label="Contact Number"
                                variant="outlined"
                                name="phone_number"
                                value={data.phone_number}
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
                        <Button color="secondary" variant="contained" type="submit">
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