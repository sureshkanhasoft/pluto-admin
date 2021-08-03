import React, { useState } from 'react'
import {
    makeStyles,
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider, Grid,
} from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { createOrganization } from '../../store/action';

const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    }
}))


const CreateOrganization = ({ open, handleClose }) => {
    const classes = useStyle();
    const dispatch = useDispatch()

    const [data, setData] = useState({
        organization_name: "",
        contact_person_name: "",
        email: "",
        contact_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postcode: "",
        password:"12345"
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const submitOrganization = () => {
        dispatch(createOrganization(data))
        handleClose()
    }

    return (
        <Dialog open={open} onClose={handleClose} classes={{ paper: classes.dialogWidth }}>
            <form>
                <DialogTitle id="form-dialog-title">
                    <div>Create Organization</div>
                </DialogTitle>
                <Divider />
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="organization_name"
                        label="Organization"
                        variant="outlined"
                        name="organization_name"
                        value={data.organization_name}
                        onChange={handleChange}
                        fullWidth
                        required
                    />
                    <TextField
                        margin="dense"
                        id="contact_person_name"
                        label="Contact Person"
                        variant="outlined"
                        name="contact_person_name"
                        value={data.contact_person_name}
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
                                id="contact_number"
                                label="Contact Number"
                                variant="outlined"
                                name="contact_number"
                                value={data.contact_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="dense"
                        id="address_line_1"
                        label="Address line 1"
                        variant="outlined"
                        name="address_line_1"
                        value={data.address_line_1}
                        onChange={handleChange}
                        fullWidth
                    />
                    <TextField
                        margin="dense"
                        id="address_line_2"
                        label="Address line 2"
                        variant="outlined"
                        name="address_line_2"
                        value={data.address_line_2}
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

                </DialogContent>
                <DialogActions className="pr-4 pb-2">
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained" onClick={submitOrganization}>
                        Add
                    </Button>

                </DialogActions>
            </form>
        </Dialog>
    )
}

export default CreateOrganization
