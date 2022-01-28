import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField, Select, FormControl, MenuItem, InputLabel,
    FormGroup, FormControlLabel, Checkbox, FormLabel, Backdrop,
    CircularProgress
} from '@material-ui/core';
import axios from 'axios';
import apiConfigs from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { createBooking } from '../../store/action';
import { useForm } from 'react-hook-form';
import Notification from '../../components/Notification/Notification';
import history from '../../utils/HistoryUtils';
import UtilService from '../../helper/service';

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
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))

const CreateBooking = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const [speciality, setSpeciality] = useState([])
    const [trust, setTrust] = useState([])
    const [getTrustId, setTrustId] = useState()
    const [getHospitalId, setHospitalId] = useState()
    const [hospitalList, setHospitalList] = useState()
    const [wardList, setWardList] = useState([])
    const [shiftTypeList, setShiftTypeList] = useState([])
    const [gradeList, setGradeList] = useState([])
    const [shiftTime, setShiftTime] = useState([])
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [addAnother, setAddAnother] = useState(false)
    const [trustNotify, setTrustNotify] = useState(false)
    const [specError, setSpecError] = useState(false)
    const [referenceId, setReferenceId] = useState([])
    const { createBookingSuccess, createBookingError, loading } = useSelector(state => state.booking)
    const disPastDate = UtilService.disabledPastDate()
    const [data, setData] = useState({
        reference_id: "",
        trust_id: "",
        ward_id: "",
        grade_id: "",
        date: "",
        shift_id: "",
        rate: "",
        shift_type_id: "",
        hospital_id: "",
        speciality: []
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    // const handleChangeCheck = (event) => {
    //     const specialityData = JSON.parse(JSON.stringify(data));
    //     specialityData.speciality.push(event.target.value);
    //     setData(specialityData)
    // };
    const handleChangeCheck = (event) => {
        const specialityData = JSON.parse(JSON.stringify(data));
        const isChecked = (event.target.checked);
        if (isChecked) {
            specialityData.speciality.push(parseFloat(event.target.value));
            setData(specialityData)
        } else {
            const newData = (specialityData.speciality).filter(item => item !== parseFloat(event.target.value));
            specialityData.speciality = newData;
            setData(specialityData)
        }

    };

    const getSpecialities = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-spec-shift-create`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setSpeciality(response.data)
        }).catch(error => {
            console.log('error: ', error);
        })
    }

    useEffect(() => {
        getSpecialities()
    }, [])

    const getTrust = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        // await axios.get(`${apiConfigs.API_URL}api/organization/get-trust`, {
            await axios.get(`${apiConfigs.API_URL}api/organization/get-trusts`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setTrust(response.data)
            // setTrust(response.data.data)
        }).catch(error => {
            console.log('error: ', error);
        })
    }
    const trustHandleChange = (event) => {
        data.hospital_id = "";
        data.ward_id = "";
        setTrustId(event.target.value)
        setData({ ...data, [event.target.name]: event.target.value });
    }
    useEffect(() => {
        getTrust()
    }, [])

    const gethospital = async () => {
        if (getTrustId) {
            const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
            await axios.get(`${apiConfigs.API_URL}api/organization/get-hospitallist/${getTrustId}`, {
                headers: {
                    'content-type': 'application/json',
                    'Authorization': `Bearer ${loggedInUser}`
                }
            }).then(response => {
                console.log('response: ', response);
                setHospitalList(response.data)
            }).catch(error => {
                console.log('error: ', error);
            })
        }
    }
    const hospitalHandleChange = (event) => {
        data.ward_id = "";
        setHospitalId(event.target.value)
        setData({ ...data, [event.target.name]: event.target.value });
        getWardType(event.target.value);
    }
    useEffect(() => {
        gethospital()
    }, [getTrustId])

    const getWardType = async (hospitalId) => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        console.log(getHospitalId, "getHospitalId")
        console.log(getTrustId , "getTrustId")
        await axios.get(`${apiConfigs.API_URL}api/organization/get-ward-by-hospital?hospitalId=${hospitalId}&trustId=${getTrustId}`, {
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
        // getWardType()
    }, [getHospitalId])

    const getShiftType = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-all-shift-type`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setShiftTypeList(response.data)
        }).catch(error => {
            console.log("error.message", error.message);
        });
    }
    useEffect(() => {
        getShiftType()
    }, [])

    const getGradeList = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-gradelist`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setGradeList(response.data)
        }).catch(error => {
            console.log("error.message", error.message);
        });
    }
    useEffect(() => {
        getGradeList()
    }, [])

    const getShift = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-shifts`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setShiftTime(response.data)
        }).catch(error => {
            console.log("error.message", error.message);
        });
    }
    useEffect(() => {
        getShift()
    }, [])

    const getReference = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-reference`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setData({ ...data, reference_id: parseFloat(response.data.data.reference_id) })
            setReferenceId(response.data.data.reference_id)
        }).catch(error => {
            console.log("error.message", error.message);
        });
    }
    useEffect(() => {
        getReference()
    }, [])


    const submitData = async (e) => {
        // e.preventDefault();
        // console.log('data ward_id: ', typeof data.ward_id);
        if (data.speciality.length > 0) {

            if (addAnother === true) {
                dispatch(createBooking(data, addAnother))
            } else {
                dispatch(createBooking(data, addAnother))
            }
            setTrustNotify(true)
            reset();
        } else {
            setSpecError(true)
        }
    }
    const backPage = () => {
        history.goBack()
    }

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {trustNotify && createBookingSuccess?.message &&
                <Notification
                    data={createBookingSuccess?.message}
                    status="success"
                />
            }

            <Paper className={classes.root}>
                <form onSubmit={handleSubmit(submitData)}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="reference_id"
                                label="Reference Id"
                                variant="outlined"
                                name="reference_id"
                                value={referenceId || ""}
                                // {...register('reference_id', {
                                //     required: "The reference id field is required.",
                                // })}
                                // error={(errors.reference_id ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} required
                                error={(errors.trust_id ? true : false)}
                            >
                                <InputLabel>Trust Name</InputLabel>
                                <Select
                                    value={data.trust_id}
                                    label="Trust Name"
                                    name="trust_id"
                                    {...register('trust_id', {
                                        required: "The trust field is required.",
                                    })}
                                    // error={(errors.trust_id ? true : false)}
                                    onChange={trustHandleChange}
                                >
                                    <MenuItem value="">
                                        Select Trust
                                    </MenuItem>
                                    {
                                        trust?.data && trust?.data.map((trustList, index) => {
                                            return (
                                                <MenuItem value={trustList.id} key={index}>{trustList.name}</MenuItem>
                                            )
                                        })
                                    }

                                    {/* <MenuItem value="Apex Care Hospital">Apex Care Hospital</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} required
                                error={(errors.hospital_id ? true : createBookingError?.message?.hospital_id ? true : false)}
                            >
                                <InputLabel>Hospital Name</InputLabel>
                                <Select
                                    value={data.hospital_id}
                                    label="Hospital Name"
                                    name="hospital_id"
                                    {...register('hospital_id', {
                                        required: "The hospital field is required.",
                                    })}
                                    // error={(errors.hospital_id ? true : createBookingError?.message?.hospital_id ? true : false)}
                                    onChange={hospitalHandleChange}
                                >
                                    <MenuItem value="">
                                        Select Hospital
                                    </MenuItem>
                                    {
                                        hospitalList?.data && hospitalList?.data.map((List, index) => {
                                            return (
                                                <MenuItem value={List.id} key={index}>{List.hospital_name}</MenuItem>
                                            )
                                        })
                                    }

                                    {/* <MenuItem value="Apex Care Hospital">Apex Care Hospital</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} required
                                error={(errors.ward_id ? true : createBookingError?.message?.ward_id ? true : false)}
                            >
                                <InputLabel>Ward Name</InputLabel>
                                <Select
                                    value={data?.ward_id}
                                    name="ward_id"
                                    label="Ward Name"
                                    {...register('ward_id', {
                                        required: "The ward field is required.",
                                    })}
                                    // error={(errors.ward_id ? true : createBookingError?.message?.ward_id ? true : false)}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        Select a ward
                                    </MenuItem>
                                    {
                                        wardList?.data && wardList?.data.map((list, index) => {
                                            return (
                                                <MenuItem value={list.id} key={index}>{list.ward_name}</MenuItem>
                                            )
                                        })
                                    }
                                    {/* <MenuItem value="ward number one">ward number one</MenuItem>
                                <MenuItem value="ward number two">ward number two</MenuItem> */}
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} required
                                error={(errors.grade_id ? true : false)}
                            >
                                <InputLabel>Grade Required</InputLabel>
                                <Select
                                    value={data.grade_id}
                                    name="grade_id"
                                    label="Grade Required"
                                    {...register('grade_id', {
                                        required: "The grade field is required.",
                                    })}
                                    // error={(errors.grade_id ? true : false)}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        Select a grade
                                    </MenuItem>
                                    {
                                        gradeList?.data && gradeList?.data.map((list, index) => {
                                            return (
                                                <MenuItem value={list.id} key={index}>{list.grade_name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <TextField
                                id="date"
                                label="Date"
                                type="date"
                                name="date"
                                // defaultValue="2017-05-24"
                                className={classes.textField}
                                variant="outlined"
                                {...register('date', {
                                    required: "The date field is required.",
                                })}
                                error={(errors.date ? true : false)}
                                onChange={handleChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                required
                                inputProps={{
                                    min: disPastDate
                                }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={2}>
                            <FormControl variant="outlined" className={classes.formControl} required
                                error={(errors.shift_id ? true : false)}
                            >
                                <InputLabel>Shift Time</InputLabel>
                                <Select
                                    value={data.shift_id}
                                    label="Grade Required"
                                    name="shift_id"
                                    {...register('shift_id', {
                                        required: "The shift time field is required.",
                                    })}
                                    // error={(errors.shift_id ? true : false)}
                                    onChange={handleChange}
                                // onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        Select a shift time
                                    </MenuItem>
                                    {
                                        shiftTime?.data && shiftTime?.data.map((list, index) => {
                                            return (
                                                <MenuItem value={list.id} key={index}>{list.start_time} - {list.end_time}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={2}>
                            <FormControl variant="outlined" className={classes.formControl} required
                                error={(errors.shift_type_id ? true : false)}
                            >
                                <InputLabel>Shift Type</InputLabel>
                                <Select
                                    value={data.shift_type_id}
                                    label="Grade Required"
                                    name="shift_type_id"
                                    {...register('shift_type_id', {
                                        required: "The shift type field is required.",
                                    })}
                                    // error={(errors.shift_type_id ? true : false)}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        Select a shift type
                                    </MenuItem>
                                    {
                                        shiftTypeList?.data && shiftTypeList?.data.map((typeList, index) => {
                                            return (
                                                <MenuItem value={typeList.id} key={index}>{typeList.shift_type}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <div className="rate-symbol">
                                <span className="symbol">£</span>
                                <TextField
                                    id="rate"
                                    label="Rate"
                                    variant="outlined"
                                    name="rate"
                                    type="number"
                                    value={data?.rate}
                                    {...register('rate', {
                                        required: "The rate field is required.",
                                    })}
                                    error={(errors.rate ? true : false)}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </div>
                        </Grid>



                        <Grid item xs={12}>
                            <FormControl required
                                {...register('speciality', {
                                    required: "The speciality field is required.",
                                })}
                                error={(errors.speciality ? true : false || specError === true ? true : false)}
                                component="fieldset" className={classes.formControl}>
                                {
                                    speciality?.data && speciality?.data.length > 0 && <FormLabel component="legend">Specialities</FormLabel>
                                }

                                <Grid container>
                                    {
                                        speciality?.data && speciality?.data.map((items, index) => {
                                            return (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={items.id}>
                                                    <FormControlLabel
                                                        control={<Checkbox color="primary" value={items.id} checked={data.checkedG} onChange={handleChangeCheck} name="speciality" />}
                                                        label={items.speciality_name}
                                                    />
                                                </Grid>
                                            )

                                        })
                                    }
                                </Grid>
                                {/* <FormHelperText>{updateBookingError?.message?.speciality ? "The specialities field is required." :""}</FormHelperText> */}
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box className={classes.footerBtn}>
                        <Button color="primary" onClick={backPage}>
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" formNoValidate onClick={() => setAddAnother(false)}>
                            Save & Confirm
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" formNoValidate onClick={() => setAddAnother(true)}>
                            Save & Add another
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default CreateBooking
