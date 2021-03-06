import React, { Fragment, useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField,
    RadioGroup, FormControlLabel, Radio, Typography, Divider,
    FormControl, InputLabel, Select, MenuItem, FormLabel
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { createTrust } from '../../store/action';
import Notification from '../../components/Notification/Notification';
import axios from 'axios';
import apiConfigs from '../../config/config';
import CloseIcon from '@material-ui/icons/Close';
import history from '../../utils/HistoryUtils';

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
    },
    hospitalBox: {
        padding: 8,
        width: "100%",
    },
    lightGray: {
        background: "#f4f5f6",
        width: "100%",
        margin: 0,
        padding: "16px 12px"
    },
    wardBox: {
        margin: 0,
        width: "100%",
        position: "relative"
    },

    addWards: {
        fontSize: 12,
        display: "flex",
        alignItems: "center",
        marginLeft: 'auto',
        '& .MuiButton-label': {
            display: "flex",
            alignItems: "center",
        },
        '& .MuiSvgIcon-root': {
            width: 18,
            height: "auto"
        }
    },
    removeWard: {
        position: "absolute",
        top: 24,
        right: 24,
        cursor: "pointer"
    },
    removeTraining: {
        position: "absolute",
        top: 24,
        right: "20px",
        cursor: "pointer"
    }
}))

const CreateTrust = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const { createTrustError, createTrustSuccess } = useSelector(state => state.trust)
    const [trustNotify, setTrustNotify] = useState(false)
    const [wardList, setWardList] = useState([])
    const [addAnother, setAddAnother] = useState(false)

    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [data, setData] = useState({
        name: "",
        code: "",
        preference_invoice_method: "",
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
        training: [
            {
                training_name: ""
            }
        ],

        hospital: [
            {
                hospital_name: "",
                ward: [
                    {
                        ward_name: "",
                        ward_type_id: "",
                        ward_number: ""
                    }
                ]
            }
        ],
        ward: [
            {
                ward_name: "",
                ward_type_id: "",
                ward_number: ""
            }
        ],
    })


    const handleChange = (event) => {
        // console.log('event: ', event.target.value);
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleChangeHospital = (index, event, key) => {
        data[key][index][event.target.name] = event.target.value
        setData({ ...data });
    };

    const handleChangeWardOFHospital = (hIndex, wIndex, event) => {
        data.hospital[hIndex].ward[wIndex][event.target.name] = event.target.value
        setData({ ...data });
    };

    const addTraining = () => {
        const trainingData = JSON.parse(JSON.stringify(data));
        trainingData.training.push(
            {
                training_name: ""
            }
        )
        setData(trainingData)
    }

    const removeTraining = (index) => {
        const trainingData = JSON.parse(JSON.stringify(data));
        if (trainingData.training.length > 1) {
            trainingData.training.splice(index, 1)
            setData(trainingData)
        }
    }

    const addHospital = (e, index) => {
        const hos = JSON.parse(JSON.stringify(data));
        hos.hospital.push(
            {
                hospital_name: "",
                ward: [
                    {
                        ward_name: "",
                        ward_type_id: "",
                        ward_number: ""
                    }
                ]
            }
        )
        setData(hos);
    }

    const wards = (id) => {
        const wards1 = JSON.parse(JSON.stringify(data));
        wards1.hospital[id].ward.push(
            {
                ward_name: "",
                ward_type_id: "",
                ward_number: ""
            }
        )
        setData(wards1);
    }

    const removeWards = (index, wIndex) => {
        const wards1 = JSON.parse(JSON.stringify(data));
        if(wards1.hospital[index].ward.length > 1){
            wards1.hospital[index].ward.splice(wIndex, 1)
            setData(wards1)
        }
    }


    const getWardType = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-all-ward-type`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setWardList(response.data)
        }).catch(error => {
            console.log("error.message", error.message);
        });
    }

    useEffect(() => {
        getWardType()
    }, [])

    const submitData = async (e) => {
        // e.preventDefault();
        console.log('data: ', data);
        if (addAnother === true) {
            dispatch(createTrust(data, addAnother))
        } else {
            dispatch(createTrust(data, addAnother))
        }
        setTrustNotify(true)
        // reset();
    }
    const backPage = () => {
        history.goBack()
    }

    return (
        <>
            {trustNotify && createTrustSuccess?.message &&
                <Notification
                    data={createTrustSuccess?.message}
                    status="success"
                />
            }

            {/* {trustNotify && createTrustError?.message &&
                <Notification
                    data={createTrustError?.message}
                    status="error"
                />
            } */}
            <Paper className={classes.root}>
                <form onSubmit={handleSubmit(submitData)} autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="name"
                                label="Trust Name"
                                variant="outlined"
                                name="name"
                                // value={data?.name}
                                {...register('name', {
                                    required: "The name field is required.",
                                })}
                                error={(errors.name ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="code"
                                label="Trust Code"
                                variant="outlined"
                                name="code"
                                // value={data?.code}
                                {...register('code', {
                                    required: "Please enter code",
                                })}
                                error={(errors.code ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>

                        {
                            data.hospital.map((item, index) => {
                                return (
                                    <div className={classes.hospitalBox} key={index}>
                                        <Grid container spacing={2} className={classes.lightGray}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="hospital_name"
                                                    label="Hospital name"
                                                    variant="outlined"
                                                    name="hospital_name"
                                                    // value={item?.hospital_name}
                                                    {...register('hospital_name', {
                                                        required: "Please enter code",
                                                    })}
                                                    error={
                                                        (errors.hospital_name ? true : (createTrustError && createTrustError?.message) ? (createTrustError && createTrustError?.message[`hospital.${index}.hospital_name`] ? true :false) : false)
                                                        
                                                    }
                                                    onChange={(e) => handleChangeHospital(index, e, 'hospital')}

                                                    fullWidth
                                                    required
                                                />
                                            </Grid>
                                            {
                                                item.ward.map((wardsField, wIndex) => {
                                                    return (
                                                        <Grid container spacing={2} key={wIndex} className={classes.wardBox}>
                                                            <Grid item xs={12} sm={4}>
                                                                <TextField
                                                                    id="ward_name"
                                                                    label="Ward Name"
                                                                    variant="outlined"
                                                                    name="ward_name"
                                                                    value={wardsField?.ward_name}
                                                                    {...register('ward_name', {
                                                                        required: "Please enter ward name",
                                                                    })}
                                                                    error={
                                                                        (errors.ward_name ? true : (createTrustError && createTrustError?.message) ? (createTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_name`] ? true :false) : false)
                                                                    }
                                                                    onChange={(e) => handleChangeWardOFHospital(index, wIndex, e)}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <FormControl variant="outlined" required className={classes.formControl}
                                                                {...register('ward_type_id', {
                                                                    required: "Please enter ward type",
                                                                })}
                                                                    error={
                                                                        (errors.ward_type_id ? true : (createTrustError && createTrustError?.message) ? (createTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_type_id`] ? true :false) : false)
                                                                    }
                                                                >
                                                                    <InputLabel>Ward Type</InputLabel>
                                                                    <Select
                                                                        label="Trust Name"
                                                                        name="ward_type_id"
                                                                        value={wardsField?.ward_type_id || ""}
                                                                        onChange={(e) => handleChangeWardOFHospital(index, wIndex, e)}
                                                                    >
                                                                        <MenuItem value="">
                                                                            Select Type
                                                                        </MenuItem>
                                                                        {
                                                                            wardList?.data && wardList?.data.map((list, index) => {
                                                                                return (
                                                                                    <MenuItem key={index} value={list.ward_type_id}>{list.ward_type}</MenuItem>
                                                                                )
                                                                            })
                                                                        }
                                                                    </Select>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField
                                                                    id="ward_number"
                                                                    label="Ward Number"
                                                                    variant="outlined"
                                                                    name="ward_number"
                                                                    type="number"
                                                                    value={wardsField?.ward_number}
                                                                    {...register('ward_number', {
                                                                        required: "Please enter ward number",
                                                                    })}
                                                                    error={
                                                                        (errors.ward_number ? true : (createTrustError && createTrustError?.message) ? (createTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_number`] ? true :false) : false)
                                                                    }
                                                                    onChange={(e) => handleChangeWardOFHospital(index, wIndex, e)}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>
                                                            {wIndex !== 0 ? <CloseIcon className={classes.removeWard} onClick={() => removeWards(index, wIndex)} /> :""}
                                                            
                                                        </Grid>
                                                    )
                                                })
                                            }

                                            <Grid item xs={12}>
                                                <Button onClick={() => wards(index)} color="secondary" className={classes.addWards}>
                                                    <AddCircleOutlineIcon className="mr-3" />
                                                    <span>Add Wards</span>
                                                </Button>
                                            </Grid>
                                        </Grid>
                                    </div>
                                )
                            })
                        }
                        {
                            data.hospital[0].hospital_name !== "" && 
                            data.hospital[0].ward[0].ward_name !=="" && data.hospital[0].ward[0].ward_type_id !=="" && data.hospital[0].ward[0].ward_number !==""
                            ? 
                            
                            <Grid item xs={12}>
                                <Button onClick={() => addHospital()} color="secondary">
                                    <AddCircleOutlineIcon className="mr-3" />
                                    <Typography >Add Hospital</Typography>
                                </Button>
                            </Grid>
                            :''
                        }
                       
                        
                        <Grid item xs={12}>
                            <Box className="mt-3">
                                <FormControl required
                                    {...register('preference_invoice_method', {
                                        required: "Please enter code",
                                    })}
                                    error={(errors?.preference_invoice_method ? true : false)}
                                    component="fieldset" className={classes.formControl}>
                                    <FormLabel component="legend">Preferred Invoice Method</FormLabel>
                                    <RadioGroup
                                        name="preference_invoice_method"
                                        onChange={handleChange} className={classes.radioGroup}>
                                        <FormControlLabel value="BYPost" control={<Radio />} label="By Post" />
                                        <FormControlLabel value="BYEmail" control={<Radio />} label="By Email" />
                                    </RadioGroup>
                                </FormControl>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                            <TextField
                                id="email_address"
                                label="Trust Email"
                                variant="outlined"
                                name="email_address"
                                // value={data?.email_address}
                                {...register('email_address', {
                                    required: "Please enter code",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Enter a valid e-mail address",
                                    },
                                })}
                                error={(errors.email_address ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
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
                                // value={data.address_line_1}
                                {...register('address_line_1', {
                                    required: "Please enter code",
                                })}
                                error={(errors.address_line_1 ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
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
                                // value={data.city}
                                {...register('city', {
                                    required: "Please enter city",
                                })}
                                error={(errors.city ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="post_code"
                                label="Postcode"
                                variant="outlined"
                                name="post_code"
                                // value={data.post_code}
                                {...register('post_code', {
                                    required: "Please enter post code",
                                })}
                                error={(errors.post_code ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
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
                                // value={data.trust_portal_url}
                                {...register('trust_portal_url', {
                                    required: "Please enter trust portal URL",
                                })}
                                error={
                                    // (errors.trust_portal_url ? true : false)
                                    (errors.trust_portal_url ? true : (createTrustError && createTrustError?.message) ? (createTrustError?.message[`trust_portal_url`] ? true :false) : false)
                                }
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="portal_email"
                                label="Email Address"
                                variant="outlined"
                                name="portal_email"
                                autoComplete="new-password"
                                // value={data.portal_email}
                                {...register('portal_email', {
                                    required: "Please enter portal email",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Enter a valid e-mail address",
                                    },
                                })}
                                error={(errors.portal_email ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="portal_password"
                                type="password"
                                label="Password"
                                variant="outlined"
                                name="portal_password"
                                autoComplete="new-password"
                                // value={data.portal_password}
                                {...register('portal_password', {
                                    required: "Please enter portal password",
                                })}
                                error={(errors.portal_password ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
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
                            data.training.map((item, index) => {
                                return (
                                    <Grid item xs={12} sm={6} key={index} style={{position:"relative"}}>
                                        <TextField
                                            id="training_name"
                                            label="Training example type"
                                            variant="outlined"
                                            name="training_name"
                                            value={item?.training_name || ""}
                                            {...register('training_name', {
                                                required: "Please enter phone number",
                                            })}
                                            error={
                                                (errors.training_name ? true : (createTrustError && createTrustError?.message) ? (createTrustError?.message[`training.${index}.training_name`] ? true :false) : false)
                                            }
                                            onChange={(e) => handleChangeHospital(index, e, 'training')}
                                            fullWidth
                                            required
                                        />
                                        {index !== 0 ?<CloseIcon className={classes.removeTraining} onClick={() => removeTraining(index)} /> :""   }
                                        
                                    </Grid>
                                )
                            })
                        }
                        <Grid item xs={12} sm={6} lg={4}>
                            {/* <Button onClick={() => handleAddFields()} color="secondary"> */}
                            {/* <Button onClick={handleAddClick} color="secondary"> */}
                            <Button color="secondary" onClick={addTraining}>
                                <AddCircleOutlineIcon className="mr-3" />
                                <Typography >Add Training </Typography>
                            </Button>
                        </Grid>
                        <Grid item xs={12} >
                            <div className="pt-5 pb-4">
                                <Divider />
                            </div>
                        </Grid>

                        {/* <Grid item xs={12}>
                            <Typography>Wards</Typography>
                        </Grid>


                        <Grid item xs={12} >
                            <div className="pt-5 pb-4">
                                <Divider />
                            </div>
                        </Grid> */}

                        <Grid item xs={12}>
                            <Typography>Contact Information</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="first_name"
                                label="First Name"
                                variant="outlined"
                                name="first_name"
                                // value={data.first_name}
                                {...register('first_name', {
                                    required: "Please enter first name",
                                })}
                                error={(errors.first_name ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="last_name"
                                label="Last Name"
                                variant="outlined"
                                name="last_name"
                                // value={data.last_name}
                                {...register('last_name', {
                                    required: "Please enter last name",
                                })}
                                error={(errors.last_name ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="contact_email_address"
                                label="Email"
                                variant="outlined"
                                name="contact_email_address"
                                value={data.contact_email_address}
                                {...register('contact_email_address', {
                                    required: "Please enter contact email address",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Enter a valid e-mail address",
                                    },
                                })}
                                error={(errors.contact_email_address ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="phone_number"
                                label="Contact Number"
                                variant="outlined"
                                name="phone_number"
                                type="number"
                                value={data.phone_number}
                                {...register('phone_number', {
                                    required: "Please enter phone number",
                                })}
                                error={(errors.phone_number ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
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
                        <Button color="primary" onClick={backPage}>
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" name="btn1" formNoValidate onClick={() => setAddAnother(false)}>
                            Save & Confirm
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" name="btn2s" formNoValidate onClick={() => setAddAnother(true)}>
                            Save & Add another
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default CreateTrust