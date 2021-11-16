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
import { useDispatch, useSelector } from 'react-redux';
import { updateOrganization } from '../../store/action';
import Notification from "../../components/Notification/Notification"

const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    }
}))

const UpdateOrganization = ({ openUpdate, handleClose, id }) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const [updateMsg, setUpdateMsg]=useState(false)
    const { updateOrgSuccess, updateOrgError } = useSelector(state => state.organizationReducer)
    const [data, setData] = useState({
        organization_name: "",
        contact_person_name: "",
        contact_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postcode: "",
        status:"",
        user_id:id
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
                setData(response.data.data)
            }).catch(error => {
                console.log("error.message", error.message);
            });
        }
    }
    useEffect(() => {
        setData("")
        getData(id);
    }, [id]);

    const handleChange = (event) => {
        // setData({ ...data, [event.target.name]: event.target.value });
        if (event.target.name === 'contact_number') {
            const re = /^[0-9 \b]+$/; 
            if (event.target.value === '' || re.test(event.target.value)) {
                setData({ ...data, [event.target.name]: event.target.value });
             }
        }else{
            setData({ ...data, [event.target.name]: event.target.value });
        }
    };

    const submitOrganization = () => {
        dispatch(updateOrganization(data))
        setUpdateMsg(true)
    }

    useEffect(()=>{
        if(updateMsg && updateOrgSuccess?.message) {
            handleClose('update')
        }
    },[updateOrgSuccess])


    return (
        <>
        {/* {updateMsg && updateOrgError?.message &&
            
            <Notification
                data={updateOrgError?.message}
                status="error"
            />
        } */}
        {updateMsg && updateOrgSuccess?.message &&
             <Notification
                data={updateOrgSuccess?.message}
                status="success"
             />
        }
        <Dialog open={openUpdate} onClose={(e)=>handleClose('cancel')} classes={{ paper: classes.dialogWidth }}>
            <form>
                <DialogTitle id="form-dialog-title">
                    <div>Update Organization</div>
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
                            value={data.organization_name?data.organization_name:""}
                            onChange={handleChange}
                            fullWidth
                            required
                            helperText={updateOrgError?.message?.organization_name}
                            error={
                                !!updateOrgError?.message?.organization_name
                            }
                        />
                    </div>
                    <TextField
                        margin="dense"
                        id="contact_person_name"
                        label="Contact Person"
                        variant="outlined"
                        name="contact_person_name"
                        value={data.contact_person_name?data.contact_person_name:""}
                        onChange={handleChange}
                        fullWidth
                        required
                        helperText={updateOrgError.message?.contact_person_name}
                        error={
                            !!updateOrgError.message?.contact_person_name
                        }
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={data.email? data.email:""}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="contact_number"
                                label="Contact Number"
                                variant="outlined"
                                name="contact_number"
                                // type="number"
                                required
                                value={data.contact_number?data.contact_number:""}
                                onChange={handleChange}
                                fullWidth
                                helperText={ updateOrgError.message?.contact_number}
                                error={
                                    !!updateOrgError.message?.contact_number
                                }
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="dense"
                        id="address_line_1"
                        label="Address line 1"
                        variant="outlined"
                        name="address_line_1"
                        value={data.address_line_1?data.address_line_1:""}
                        onChange={handleChange}
                        fullWidth
                        required
                        helperText={updateOrgError.message?.address_line_1}
                        error={
                            !!updateOrgError.message?.address_line_1
                        }
                    />
                    <TextField
                        margin="dense"
                        id="address_line_2"
                        label="Address line 2"
                        variant="outlined"
                        name="address_line_2"
                        value={data.address_line_2?data.address_line_2:""}
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
                                value={data.city?data.city:""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={updateOrgError.message?.city}
                                error={
                                    !!updateOrgError.message?.city
                                }
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="postcode"
                                label="Postcode"
                                variant="outlined"
                                name="postcode"
                                value={data.postcode?data.postcode:""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={updateOrgError.message?.postcode}
                                error={
                                    !!updateOrgError.message?.postcode
                                }
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="dense"
                                id="subscriptionPlan"
                                label="Subscription Plan"
                                variant="outlined"
                                name="subscriptionplan"
                                value={data.plan ? data.plan :""}
                                onChange={handleChange}
                                fullWidth
                                disabled
                            />
                        </Grid>

                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="dense"
                                id="subscriptionDate"
                                label="Start Date"
                                name="subscriptiondate"
                                value={data.start_date ?data.start_date:""}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                margin="dense"
                                id="subscriptionDate2"
                                label="End Date"
                                name="subscriptiondate"
                                value={data.end_date ? data.end_date  :""}
                                onChange={handleChange}
                                variant="outlined"
                                fullWidth
                                disabled
                            />
                        </Grid>
                    </Grid>
                    <Box className="mt-3">
                        <FormLabel component="legend">Status</FormLabel>
                        <RadioGroup name="status" onChange={handleChange} className={classes.radioGroup}>
                            <FormControlLabel checked={data.status === 'Active'} value="Active" control={<Radio />} label="Active" />
                            <FormControlLabel value="Inactive" checked={data.status === 'Inactive'} control={<Radio />} label="Deactive" />
                        </RadioGroup>
                    </Box>
                </DialogContent>
                <DialogActions className="pr-4 pb-2">
                    <Button onClick={(e)=>handleClose('cancel')} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={submitOrganization} color="secondary" variant="contained">
                        Update
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    )
}

export default UpdateOrganization
