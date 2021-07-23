import React, { useState } from 'react'
import {
    makeStyles,
    Button,
    Box,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider, Grid,
    FormLabel, RadioGroup, FormControlLabel, Radio
} from '@material-ui/core';

const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    }
}))



const CreateOrganization = ({ open, handleClose, id }) => {
    const classes = useStyle();

    const [data, setData] = useState({
        organization: "",
        person: "",
        email: "",
        number: "",
        address1: "",
        address2: "",
        city: "",
        postcode: "",
        status: "active",
        subscriptionplan: "",
        subscriptiondate: ""
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    return (
        <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogWidth }}>
            <form>
                <DialogTitle id="form-dialog-title">
                    {
                        id && id > 0 ?
                            <div>Update Organization</div>
                            :
                            <div>Create Organization</div>
                    }
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <div>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="organization"
                            label="Organization"
                            variant="outlined"
                            name="organization"
                            value={data.organization}
                            onChange={handleChange}
                            fullWidth
                        />
                    </div>
                    <TextField
                        margin="dense"
                        id="person"
                        label="Contact Person"
                        variant="outlined"
                        name="person"
                        value={data.person}
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
                                value={data.email}
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
                                value={data.number}
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
                        value={data.address1}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="address2"
                        label="Address line 2"
                        variant="outlined"
                        name="address2"
                        value={data.address2}
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
                                value={data.city}
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
                                value={data.postcode}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    {
                        id && id > 0 &&
                        <>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        margin="dense"
                                        id="subscriptionPlan"
                                        label="Subscription Plan"
                                        variant="outlined"
                                        name="subscriptionplan"
                                        value={data.subscriptionplan}
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
                                        value={data.subscriptiondate}
                                        onChange={handleChange}
                                        variant="outlined"
                                        fullWidth
                                    />
                                </Grid>
                            </Grid>
                            <Box className="mt-3">
                                <FormLabel component="legend">Status</FormLabel>
                                <RadioGroup name="status" value={data.status} onChange={handleChange} className={classes.radioGroup}>
                                    <FormControlLabel value="active" control={<Radio />} label="Active" />
                                    <FormControlLabel value="deactive" control={<Radio />} label="Deactive" />
                                </RadioGroup>
                            </Box>
                        </>
                    }
                </DialogContent>
                <DialogActions className="pr-4 pb-2">
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    {
                        id && id > 0 ?
                            <Button onClick={handleClose} color="secondary" variant="contained">
                                Update
                            </Button>
                            :
                            <Button onClick={handleClose} color="secondary" variant="contained">
                                Add
                            </Button>
                    }

                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CreateOrganization
