import React, { useState } from 'react'
import {
    makeStyles,
    Button,
    Dialog, DialogActions, DialogContent, DialogTitle, TextField, Divider, Grid,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { createOrganization } from '../../store/action';
import { useForm } from "react-hook-form";
import Notification from '../../components/Notification/Notification';
const useStyle = makeStyles((theme) => ({
    dialogWidth: { width: "100%" },
    radioGroup: {
        flexDirection: "row"
    },
    error: {
        marginBottom: "15px",
        paddingLeft: "7px",
        color: "red"
    },
    validationError: {
        marginTop: "-14px",
        marginBottom: "10px",
        color: "red"
    },
    success: {
        marginBottom: "15px",
        paddingLeft: "7px",
        color: "green"
    },
}))


const CreateOrganization = ({ open, handleClose }) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [createMsg, setCreateMsg]=useState(false)
    const { createOrgErrors, createOrgSuccess } = useSelector(state => state.organizationReducer)
    const [data, setData] = useState({
        organization_name: "",
        contact_person_name: "",
        email: "",
        contact_number: "",
        address_line_1: "",
        address_line_2: "",
        city: "",
        postcode: "",
        // password: "12345"
    })

    const handleChange = (event) => {
        if (event.target.name === 'contact_number') {
            const re = /^[0-9 \b]+$/; 
            if (event.target.value === '' || re.test(event.target.value)) {
                setData({ ...data, [event.target.name]: event.target.value });
             }
        }else{
            setData({ ...data, [event.target.name]: event.target.value });
        }
    };

    // const submitOrganization = () => {
    //     // dispatch(createOrganization(data))
    //     // handleClose()
    // }
    
    const onSubmit = async datas => {
        dispatch(createOrganization(datas))
        setCreateMsg(true)
        handleClose();
        reset();
    };
    const dialogClose = ()=>{
        reset();
        handleClose()
    }
    return (
        <>
        {createMsg && createOrgErrors?.message &&
            <Notification
                data= {createOrgErrors?.message}
                status="error"
            />
        }
        {createMsg && createOrgSuccess?.message &&
            <Notification
                data={createOrgSuccess?.message}
                status="success"
            />
        }
        <Dialog open={open} onClose={dialogClose} classes={{ paper: classes.dialogWidth }}>
            <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
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
                        // value={data.organization_name}
                        onChange={handleChange}
                        fullWidth
                        required
                        {...register("organization_name", {
                            required: "Please enter Organization name",
                        })}
                        error={(errors.organization_name ? true : false)}
                    />
                    <TextField
                        margin="dense"
                        id="contact_person_name"
                        label="Contact Person"
                        variant="outlined"
                        name="contact_person_name"
                        // value={data.contact_person_name}
                        onChange={handleChange}
                        fullWidth
                        required
                        {...register("contact_person_name", {
                            required: "Please contact persone name",
                        })}
                        error={(errors.contact_person_name ? true : false)}
                    />
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                // value={data.email}
                                onChange={handleChange}
                                fullWidth
                                required
                                {...register("email", {
                                    required: "Please Enter email",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Enter a valid e-mail address",
                                    },
                                })}
                                error={(errors.email ? true : false)}
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
                                value={data.contact_number}
                                required
                                {...register("contact_number", {
                                    required: "Please contact number",
                                    minLength:{
                                        value:10,
                                        message: "Number must have at least 10 digit"
                                    },
                                    pattern: /[0-9]/
                                })}
                                onChange={handleChange}
                                fullWidth
                                
                                error={(errors.contact_number ? true : false)}
                            />
                        </Grid>
                    </Grid>
                    <TextField
                        margin="dense"
                        id="address_line_1"
                        label="Address line 1"
                        variant="outlined"
                        name="address_line_1"
                        // value={data.address_line_1}
                        onChange={handleChange}
                        fullWidth
                        required
                        {...register("address_line_1", {
                            required: "Please enter address line 1",
                        })}
                        error={(errors.address_line_1 ? true : false)}
                    />
                    <TextField
                        margin="dense"
                        id="address_line_2"
                        label="Address line 2"
                        variant="outlined"
                        name="address_line_2"
                        // value={data.address_line_2}
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
                                // value={data.city}
                                onChange={handleChange}
                                fullWidth
                                required
                                {...register("city", {
                                    required: "Please enter city",
                                })}
                                error={(errors.city ? true : false)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                margin="dense"
                                id="postcode"
                                label="Postcode"
                                variant="outlined"
                                name="postcode"
                                // value={data.postcode}
                                onChange={handleChange}
                                fullWidth
                                required
                                {...register("postcode", {
                                    required: "Please enter postcode",
                                    minLength:{
                                        value:5
                                    }
                                })}
                                error={(errors.postcode ? true : false)}
                            />
                        </Grid>
                    </Grid>

                </DialogContent>
                <DialogActions className="pr-4 pb-2">
                    <Button onClick={dialogClose} color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained" type="submit" formNoValidate>
                        {/* <Button color="secondary" variant="contained" onClick={submitOrganization}> */}
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
        </>
    )
}

export default CreateOrganization
