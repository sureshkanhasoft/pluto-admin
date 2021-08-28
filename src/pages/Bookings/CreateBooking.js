import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField, Select, FormControl, MenuItem, InputLabel,
    FormGroup, FormControlLabel, Checkbox
} from '@material-ui/core';
import axios from 'axios';
import apiConfigs from '../../config/config';
import { useDispatch } from 'react-redux';
import { createBooking } from '../../store/action';

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
    }
}))

const CreateBooking = () => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const [speciality, setSpeciality] = useState([])
    const [trust, setTrust] = useState([])
    const [getTrustId, setgetTrustId] = useState([])
    const [getHospitalId, setGetHospitalId] = useState([])
    const [hospitalList, setHospitalList] = useState([])
    const [wardList, setWardList] = useState([])
    const [shiftTypeList, setShiftTypeList] = useState([])
    const [gradeList, setGradeList] = useState([])
    const [shiftTime, setShiftTime] = useState([])
    const [data, setData] = useState({
        reference_id: "12345",
        trust_id: "",
        ward_id: "",
        grade_id: "",
        date: "",
        shift_id: "",
        rate: "",
        shift_type_id: "",
        hospital_id:"",
        speciality: []
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const handleChangeCheck = (event) => {
        const specialityData = JSON.parse(JSON.stringify(data));
        specialityData.speciality.push(event.target.value);
        setData(specialityData)
    };

    const getSpecialities = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-all-speciality`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setSpeciality(response.data.data)
        }).catch(error => {
            console.log('error: ', error);
        })
    }

    useEffect(() => {
        getSpecialities()
    }, [])

    const getTrust = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-trust`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setTrust(response.data)
        }).catch(error => {
            console.log('error: ', error);
        })
    }
    const trustHandleChange = (event) => {
        setgetTrustId(event.target.value)
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
        setGetHospitalId(event.target.value)
        setData({ ...data, [event.target.name]: event.target.value });
    }
    useEffect(() => {
        gethospital()
    }, [getTrustId])

    const getWardType = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-ward-by-hospital?hospitalId=${getHospitalId}&trustId=${getTrustId}`, {
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


    const submitData = (e) => {
        e.preventDefault();
        console.log('data', data)
        dispatch(createBooking(data))
    }

    return (
        <Paper className={classes.root}>

            <form onSubmit={(e) => submitData(e)}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="reference_id"
                            label="Reference Id"
                            variant="outlined"
                            name="reference_id"
                            value={data?.reference_id}
                            onChange={handleChange}
                            fullWidth
                            // InputProps={{
                            //     readOnly: true,
                            // }}
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Trust Name</InputLabel>
                            <Select
                                value={data.trust_id}
                                onChange={trustHandleChange}
                                label="Trust Name"
                                name="trust_id"
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
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Hospital Name</InputLabel>
                            <Select
                                value={data.hospital_id}
                                onChange={hospitalHandleChange}
                                label="Hospital Name"
                                name="hospital_id"
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
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Ward Name</InputLabel>
                            <Select
                                value={data?.ward_id}
                                onChange={handleChange}
                                name="ward_id"
                                label="Ward Name"
                            >
                                <MenuItem value="">
                                    Select a ward
                                </MenuItem>
                                {
                                    wardList?.data && wardList?.data.map((list, index) => {
                                        return (
                                            <MenuItem value={list.ward_type_id} key={index}>{list.ward_name}</MenuItem>
                                        )
                                    })
                                }
                                {/* <MenuItem value="ward number one">ward number one</MenuItem>
                                <MenuItem value="ward number two">ward number two</MenuItem> */}
                            </Select>
                        </FormControl>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Grade Required</InputLabel>
                            <Select
                                value={data.grade_id}
                                onChange={handleChange}
                                name="grade_id"
                                label="Grade Required"
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
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />
                    </Grid>

                    <Grid item xs={12} sm={6} lg={2}>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Shift Time</InputLabel>
                            <Select
                                value={data.shift_id}
                                onChange={handleChange}
                                label="Grade Required"
                                name="shift_id"
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
                        <FormControl variant="outlined" className={classes.formControl}>
                            <InputLabel>Shift Type</InputLabel>
                            <Select
                                value={data.shift_type_id}
                                onChange={handleChange}
                                label="Grade Required"
                                name="shift_type_id"
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
                        <TextField
                            id="rate"
                            label="Rate"
                            variant="outlined"
                            name="rate"
                            value={data.rate}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>



                    <Grid item xs={12}>
                        <p className="mt-6">Specialities</p>
                        <FormGroup aria-label="position" row>
                            <Grid container>
                                {
                                    speciality?.data && speciality?.data.map((items, index) => {
                                        // console.log('items: ', items);
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
                        </FormGroup>
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
    )
}

export default CreateBooking
