import React, { useState, useEffect } from 'react'
import {
    makeStyles,
    Button,
    Box,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider, Grid,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';
import axios from 'axios';
import Config from '../../../src/config/config';
import { useDispatch } from 'react-redux';
const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    }
}))




const UpdateOrganization = ({ openUpdate, handleClose, id }) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    // const [data, setData] = useState([]);
    const [data, setData] = useState({
        organization_name: "",
        contact_person_name: "",
        email: "",
        contact_no: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postcode: "",
        status:"",
    })

    const getData = async (id) => {
        if (id > 0) {
            const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
            axios.get(`${Config.API_URL}api/superadmin/get-organization-detail/${id}`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser}`
                }
            }).then(response => {
                // console.log("datadata", response.data.data)
                setData(response.data.data)
            }).catch(error => {
                console.log("error.message", error.message);
            });
        }
    }
    useEffect(() => {
        getData(id);
    }, [id]);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitOrganization = () => {
        console.log('data1111: ', data);
        // dispatch(createOrganization(data))
        handleClose()
    }


    return (
        <Dialog open={openUpdate} onClose={handleClose} classes={{ paper: classes.dialogWidth }}>
            <form>
                <DialogTitle id="form-dialog-title">
                    <div>Update Organization {data.first_name}</div>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="organization_name"
                            label="Organization Name"
                            variant="outlined"
                            name="organization_name"
                            value={data?.organization_name}
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>
                    <TextField
                        margin="dense"
                        id="contact_person_name"
                        label="Contact Person"
                        variant="outlined"
                        name="contact_person_name"
                        value={data?.organization?.contact_person_name}
                        onChange={handleChange}
                        fullWidth
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={data?.email}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="number"
                                label="Contact Number"
                                variant="outlined"
                                name="number"
                                value={data?.organization?.contact_no}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="dense"
                        id="address1"
                        label="Address line 1"
                        variant="outlined"
                        name="address1"
                        value={data?.organization?.address_line_1}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="address2"
                        label="Address line 2"
                        variant="outlined"
                        name="address2"
                        value={data?.organization?.address_line_2}
                        onChange={handleChange}
                        fullWidth
                    />

                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="city"
                                label="City"
                                variant="outlined"
                                name="city"
                                value={data?.organization?.city}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="postcode"
                                label="Postcode"
                                variant="outlined"
                                name="postcode"
                                value={data?.organization?.postcode}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="subscriptionPlan"
                                label="Subscription Plan"
                                variant="outlined"
                                name="subscriptionplan"
                                value={data?.organization?.plan}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="subscriptionDate"
                                label="Subscription Date"
                                name="subscriptiondate"
                                value={data?.organization?.start_date}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <Box className="mt-3">
                        <FormLabel component="legend">Status</FormLabel>
                        <RadioGroup name="status" value={data.status} onChange={handleChange} className={classes.radioGroup}>
                            <FormControlLabel checked={data.status === 'Active'} value="Active" control={<Radio />} label="Active" />
                            <FormControlLabel value="Inactive" checked={data.status === 'Inactive'} control={<Radio />} label="Deactive" />
                        </RadioGroup>
                    </Box>
                </DialogContent>
                <DialogActions className="pr-4 pb-2">
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitOrganization} color="secondary" variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default UpdateOrganization
