import React, { Fragment, useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField,
    RadioGroup, FormControlLabel, Radio, Typography, Divider,
    FormControl, InputLabel, Select, MenuItem, FormHelperText
} from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import { useDispatch, useSelector } from 'react-redux';
import { updateTrust } from '../../store/action';
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

const UpdateTrust = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const id = match.params.id;
    const { updateTrustError, updateTrustSuccess } = useSelector(state => state.trust)
    const [trustNotify, setTrustNotify] = useState(false)
    const [wardList, setWardList] = useState([])
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

    const getSingleTrust = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        // setLoading(true)
        await axios.get(`${apiConfigs.API_URL}api/organization/get-trust/${id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setData(response.data.data)
            // setLoading(false)
        }).catch(error => {
            console.log("error.message", error.message);
            // setLoading(false)
        });
    }


    useEffect(() => {
        getSingleTrust()
    }, [id])


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

    // const validation = () => {
    //     data.training.map(item => {
    //         console.log('item1111: ', item);
    //         if(item.training_name === ""){
    //             console.log('sdfsdf')
    //             setEr(true)
    //         } else {
    //             setEr(false)
    //         }
    //     })
    // }

    const submitData = async (e) => {
        e.preventDefault();
        // console.log('data: ', data);
        // validation();
        dispatch(updateTrust(data))
        setTrustNotify(true)
        // reset();
    }

    const backPage = () => {
        history.goBack()
    }

    return (
        <>
            {trustNotify && updateTrustSuccess?.message &&
                <Notification
                    data={updateTrustSuccess?.message}
                    status="success"
                />
            }

            {/* {trustNotify && updateTrustError?.message &&
                <Notification
                    data={updateTrustError?.message}
                    status="error"
                />
            } */}
            <Paper className={classes.root}>
                <form onSubmit={submitData}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="name"
                                label="Trust Name"
                                variant="outlined"
                                name="name"
                                value={data?.name || ""}
                                onChange={handleChange}
                                fullWidth
                                required
                                helperText={updateTrustError.message?.name}
                                error={
                                    !!updateTrustError.message?.name
                                }
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="code"
                                label="Trust Code"
                                variant="outlined"
                                name="code"
                                value={data?.code || ""}
                                helperText={updateTrustError.message?.code}
                                error={
                                    !!updateTrustError.message?.code
                                }
                                onChange={handleChange}
                                fullWidth
                                required

                            />
                        </Grid>

                        {
                            data?.hospital && data?.hospital.map((item, index) => {

                                return (
                                    <div className={classes.hospitalBox} key={index}>
                                        <Grid container spacing={2} className={classes.lightGray}>
                                            <Grid item xs={12}>
                                                <TextField
                                                    id="hospital_name"
                                                    label="Hospital name"
                                                    variant="outlined"
                                                    name="hospital_name"
                                                    value={item?.hospital_name || ""}
                                                    helperText={
                                                        updateTrustError?.message ? (updateTrustError?.message[`hospital.${index}.hospital_name`] ? "The hospital name field is required." :false) : false
                                                    }
                                                    error={
                                                        updateTrustError?.message ? (updateTrustError?.message[`hospital.${index}.hospital_name`] ? true :false) : false
                                                    }
                                                    onChange={(e) => handleChangeHospital(index, e, 'hospital')}

                                                    fullWidth
                                                    required
                                                />
                                            </Grid>
                                            {
                                                item.ward.map((wardsField, wIndex) => {
                                                    // console.log('wardsField: ', wardsField);
                                                    return (
                                                        <Grid container spacing={2} key={wIndex} className={classes.wardBox}>
                                                            <Grid item xs={12} sm={4}>
                                                                <TextField
                                                                    id="ward_name"
                                                                    label="Ward Name"
                                                                    variant="outlined"
                                                                    name="ward_name"
                                                                    value={wardsField?.ward_name || ""}
                                                                    helperText={updateTrustError.message?.hospital_name}
                                                                    helperText={
                                                                        updateTrustError?.message ? (updateTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_name`] ? "The ward number field is required." :false) : false
                                                                    }
                                                                    error={
                                                                        updateTrustError?.message ? (updateTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_name`] ? true :false) : false
                                                                    }
                                                                    onChange={(e) => handleChangeWardOFHospital(index, wIndex, e)}
                                                                    fullWidth
                                                                    required
                                                                />
                                                            </Grid>
                                                            <Grid item xs={12} sm={4}>
                                                                <FormControl variant="outlined" required className={classes.formControl}
                                                                    error={
                                                                        updateTrustError?.message ? (updateTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_type_id`] ? true :false) : false
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
                                                                    <FormHelperText>{updateTrustError?.message ? (updateTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_type_id`] ? "The ward type field is required." :false) : false}</FormHelperText>
                                                                </FormControl>
                                                            </Grid>
                                                            <Grid item xs={12} sm={3}>
                                                                <TextField
                                                                    id="ward_number"
                                                                    label="Ward Number"
                                                                    variant="outlined"
                                                                    name="ward_number"
                                                                    value={wardsField?.ward_number || ""}
                                                                    helperText={
                                                                        updateTrustError?.message ? (updateTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_number`] ? "The ward number field is required." :false) : false
                                                                    }
                                                                    error={
                                                                        updateTrustError?.message ? (updateTrustError?.message[`hospital.${index}.ward.${wIndex}.ward_number`] ? true :false) : false
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
                        <Grid item xs={12}>
                            <Button onClick={() => addHospital()} color="secondary">
                                <AddCircleOutlineIcon className="mr-3" />
                                <Typography >Add Hospital</Typography>
                            </Button>
                        </Grid>

                        <Grid item xs={12}>
                            <Box className="mt-3">
                                <Typography>Preferred Invoice Method</Typography>
                                <RadioGroup
                                    name="preference_invoice_method"
                                    value={data?.preference_invoice_method || ""}
                                    onChange={handleChange} className={classes.radioGroup}>
                                    <FormControlLabel value="BYPost" control={<Radio />} label="By Post" />
                                    <FormControlLabel value="BYEmail" control={<Radio />} label="By Email" />
                                </RadioGroup>
                            </Box>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={6}>
                            <TextField
                                id="email_address"
                                label="Trust Email"
                                variant="outlined"
                                name="email_address"
                                value={data?.email_address || ""}
                                helperText={updateTrustError.message?.email_address}
                                error={
                                    !!updateTrustError.message?.email_address
                                }
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Typography>Trust Address</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                id="address_line_1"
                                label="Address line 1"
                                variant="outlined"
                                name="address_line_1"
                                value={data?.address_line_1 || ""}
                                helperText={updateTrustError.message?.address_line_1}
                                error={
                                    !!updateTrustError.message?.address_line_1
                                }
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
                                value={data?.address_line_2 || ""}
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
                                value={data?.city || ""}
                                helperText={updateTrustError.message?.city}
                                error={
                                    !!updateTrustError.message?.city
                                }
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
                                value={data?.post_code || ""}
                                helperText={updateTrustError.message?.post_code}
                                error={
                                    !!updateTrustError.message?.post_code
                                }
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
                                value={data?.trust_portal_url || ""}
                                helperText={updateTrustError.message?.trust_portal_url}
                                error={
                                    !!updateTrustError.message?.trust_portal_url
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
                                value={data?.portal_email || ""}
                                helperText={updateTrustError.message?.portal_email}
                                error={
                                    !!updateTrustError.message?.portal_email
                                }
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
                                value={data?.portal_password || ""}
                                helperText={updateTrustError.message?.portal_password}
                                error={
                                    !!updateTrustError.message?.portal_password
                                }
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
                            data?.training && data?.training.map((item, index) => {
                                // console.log('item: ', item);
                                return (
                                    <Grid item xs={12} sm={6} key={index} style={{position:"relative"}}>
                                        <TextField
                                            id="training_name"
                                            label="Training example type"
                                            variant="outlined"
                                            name="training_name"
                                            value={item?.training_name || ""}
                                            helperText={updateTrustError?.message ? (updateTrustError?.message[`training.${index}.training_name`] ? "The training field is required." :false) : false}
                                            error={
                                                updateTrustError?.message ? (updateTrustError?.message[`training.${index}.training_name`] ? true :false) : false
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

                        <Grid item xs={12}>
                            <Typography>Contact Information</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="first_name"
                                label="First Name"
                                variant="outlined"
                                name="first_name"
                                value={data?.first_name || ""}
                                helperText={updateTrustError.message?.first_name}
                                error={
                                    !!updateTrustError.message?.first_name
                                }
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
                                value={data?.last_name || ""}
                                helperText={updateTrustError.message?.last_name}
                                error={
                                    !!updateTrustError.message?.last_name
                                }
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
                                value={data?.contact_email_address || ""}
                                helperText={updateTrustError.message?.contact_email_address}
                                error={
                                    !!updateTrustError.message?.contact_email_address
                                }
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
                                value={data?.phone_number || ""}
                                helperText={updateTrustError.message?.phone_number}
                                error={
                                    !!updateTrustError.message?.phone_number
                                }
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
                                value={data?.client || ""}
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
                                value={data?.department || ""}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                    </Grid>

                    <Box className={classes.footerBtn}>
                        <Button color="primary" onClick={backPage}>
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" formNoValidate>
                            Update
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default UpdateTrust