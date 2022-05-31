import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField, Select, FormControl, MenuItem, InputLabel,
    FormGroup, FormControlLabel, Checkbox, FormHelperText, FormLabel,
    Backdrop, CircularProgress
} from '@material-ui/core';
import axios from 'axios';
import apiConfigs from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { updateBooking } from '../../store/action';
import history from '../../utils/HistoryUtils';
import Notification from '../../components/Notification/Notification';
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
        background:'rgba(0, 0, 0, 0.01)'
    },
}))

const UpdateBooking = ({ match }) => {
    const classes = useStyle();
    const booking_id = match.params.id;
    const dispatch = useDispatch()
    const [speciality, setSpeciality] = useState([])
    const [trust, setTrust] = useState([])
    const [getTrustId, setgetTrustId] = useState()
    const [getHospitalId, setGetHospitalId] = useState()
    const [hospitalList, setHospitalList] = useState([])
    const [wardList, setWardList] = useState([])
    const [shiftTypeList, setShiftTypeList] = useState([])
    const [gradeList, setGradeList] = useState([])
    const [shiftTime, setShiftTime] = useState([])
    const [trustNotify, setTrustNotify] = useState(false)
    const [hours, setHours] = useState([]);
    const { updateBookingSuccess, updateBookingError, loading } = useSelector(state => state.booking)
    const disPastDate = UtilService.disabledPastDate()
    const [data, setData] = useState({
        reference_id: "",
        trust_id: "",
        ward_id: "",
        grade_id: "",
        date: "",
        shift_id: "",
        rate: "",
        start_time: "",
        end_time: "",
        shift_type_id: "",
        hospital_id: "",
        commission: "",
        speciality: []
    })
    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
        if(event.target.name == 'date'){
            data.date = event.target.value;
            getCharge()
          }
          if(event.target.name == 'start_time'){
            data.start_time = event.target.value;
            getCharge()
          }
    };

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
        }).catch(error => {
            console.log('error: ', error);
        })
    }
    const trustHandleChange = (event) => {
        data.hospital_id=""
        data.ward_id=""
        setgetTrustId(event.target.value)
        setData({ ...data, [event.target.name]: event.target.value });
        getCharge()
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
                setHospitalList(response.data)
            }).catch(error => {
                console.log('error: ', error);
            })
        }
    }
    const hospitalHandleChange = (event) => {
        data.ward_id=""
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

    const getBookingDetail = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-booking/${booking_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            let speciality = [];
            response.data.data.speciality.map(val => {
                speciality.push(val.speciality_id);
            })
            response.data.data.speciality = speciality;
            setData(response.data.data)

            setTimeout(() => {
                setgetTrustId(response.data.data.trust_id)
            }, 500);
            setTimeout(() => {
                setGetHospitalId(response.data.data.hospital_id)
            }, 1000);
        }).catch(error => {
            console.log("error.message", error.message);
        });
    }
    useEffect(() => {
        getCharge()
        getHoursList();
        getBookingDetail()
    }, [])


    const submitData = (e) => {
        e.preventDefault();
        dispatch(updateBooking(data))
        setTrustNotify(true)
    }
    const backPage = () => {
        history.goBack()
    }

    const commissionHandleChange = (event) => {
        if(event.target.value < parseInt(data.rate)){
            setData({ ...data, [event.target.name]: event.target.value});
        } 
    }
    
    const handleEndTime = async (event) => {
        data.end_time = event.target.value;
        getCharge();
      };
    
    const getCharge = async () => {
        if (data.start_time && data.end_time && data.trust_id) {
          const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, "");
          await axios
            .post(`${apiConfigs.API_URL}api/organization/get-rate`, data, {
              headers: {
                "content-type": "application/json",
                Authorization: `Bearer ${loggedInUser}`,
              },
            })
            .then((response) => {
              console.log("response: ", response.data.data);
              const output = response.data.data;
              data.commission = output.chargebleAmount;
              data.rate = output.payableAmount;
              console.log(data, "datadatadata")
              setData({ ...data });
            })
            .catch((error) => {
              console.log("error: ", error);
            });
        }
    };

    const handleStartTime = async (event) =>{
        data.start_time = event.target.value;
        console.log(data, " datadata")
        getCharge();
    }
    
    const getHoursList = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, "");
        await axios
          .get(`${apiConfigs.API_URL}api/organization/get-hours`, {
            headers: {
              "content-type": "application/json",
              Authorization: `Bearer ${loggedInUser}`,
            },
          })
          .then((response) => {
            setHours(response.data);
            const output = response.data.data;
          })
          .catch((error) => {
            console.log("error: ", error);
          });
      };
      
    return (
        <>
            {trustNotify && updateBookingSuccess?.message &&
                <Notification
                    data={updateBookingSuccess?.message}
                    status="success"
                />
            }
             {trustNotify && updateBookingError?.message && (
                <Notification data={updateBookingError?.message} status="error" />
            )}
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        {/* <CircularProgress color="inherit" /> */}
                    </Backdrop> : ""
            }
            <Paper className={classes.root}>

                <form>
                    {/* <form onSubmit={(e) => submitData(e)}> */}
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
                                disabled
                            // InputProps={{
                            //     readOnly: true,
                            // }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} required error={!!updateBookingError?.message?.trust_id}>
                                <InputLabel>Trust Name</InputLabel>
                                <Select
                                    value={data?.trust_id}
                                    label="Trust Name"
                                    name="trust_id"
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
                                <FormHelperText>{updateBookingError?.message?.trust_id ? "The trust field is required." :""}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} required error={!!updateBookingError?.message?.hospital_id}>
                                <InputLabel>Hospital Name</InputLabel>
                                <Select
                                    value={data?.hospital_id ? data?.hospital_id : ""}
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
                                <FormHelperText>{updateBookingError?.message?.hospital_id ? "The hospital field is required." :""}</FormHelperText>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} required error={!!updateBookingError?.message?.ward_id}>
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
                                                <MenuItem value={list.id} key={index}>{list.ward_name}</MenuItem>
                                            )
                                        })
                                    }
                                    {/* <MenuItem value="ward number one">ward number one</MenuItem>
                                <MenuItem value="ward number two">ward number two</MenuItem> */}
                                </Select>
                                <FormHelperText>{updateBookingError?.message?.ward_id ? "The ward field is required." :""}</FormHelperText>
                            </FormControl>
                        </Grid>

                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl variant="outlined" className={classes.formControl} required error={!!updateBookingError?.message?.grade_id}>
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
                                <FormHelperText>{updateBookingError?.message?.grade_id ? "The grade field is required." :""}</FormHelperText>
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
                                value={data?.date}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                required
                                inputProps ={{
                                    min:disPastDate
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            {/* <TextField
                                id="start_time"
                                label="start time"
                                type="time"
                                name="start_time"
                                value={data?.start_time}
                                // defaultValue="2017-05-24"
                                className={classes.textField}
                                variant="outlined"
                                onChange={handleChange}
                                onSelect={handleStartTime}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                required
                             
                            /> */}
                <FormControl variant="outlined" className={classes.formControl} required error={!!updateBookingError?.message?.start_time}>
                <InputLabel>Start Time</InputLabel>
                <Select
                  value={data?.start_time}
                  label="Start Time Required"
                  name="start_time"
                  onChange={handleChange}
                  //   onChange={handleStartTime}
                >
                <MenuItem value="">Start Time</MenuItem>
                  {hours?.data &&
                    hours?.data.map((hoursList, index) => {
                      return (
                        <MenuItem value={hoursList} key={index}>
                          {hoursList}
                        </MenuItem>
                      );
                    })}
                </Select>
              </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6} lg={4}>
                            <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            required error={!!updateBookingError?.message?.end_time}
                        >
                            <InputLabel>End Time</InputLabel>
                            <Select
                            value={data?.end_time}
                            label="End Time"
                            name="end_time"
                            onChange={handleEndTime}
                            >
                            {
                                        hours?.data && hours?.data.map((hoursList, index) => {
                                            return (
                                                <MenuItem value={hoursList} key={index}>{hoursList}</MenuItem>
                                            )
                                        })
                            }
                            </Select>
                            </FormControl>
                        </Grid>
                        {/* <Grid item xs={12} sm={6} lg={2}>
                            <FormControl variant="outlined" className={classes.formControl} required error={!!updateBookingError?.message?.shift_id}>
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
                                <FormHelperText>{updateBookingError?.message?.shift_id ? "The shift time field is required." :""}</FormHelperText>
                            </FormControl>
                        </Grid> */}
                        {/* <Grid item xs={12} sm={6} lg={2}>
                            <FormControl variant="outlined" className={classes.formControl} required error={!!updateBookingError?.message?.shift_type_id}>
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
                                <FormHelperText>{updateBookingError?.message?.shift_type_id ? "The shift type field is required." :""}</FormHelperText>
                            </FormControl>
                        </Grid> */}

                        {/* <Grid item xs={12} sm={6} lg={2}>
                            <div className="rate-symbol">
                                <span className="symbol">£</span>
                                <TextField
                                    id="rate"
                                    label="Payable"
                                    variant="outlined"
                                    type="number"
                                    name="rate"
                                    value={data.rate}
                                    onChange={handleChange}
                                    fullWidth
                                    required
                                />
                            </div>
                        </Grid> */}
                        <Grid item xs={12} sm={6} lg={4}>
                            <div className="rate-symbol">
                                <span className="symbol">£</span>
                                    <TextField
                                        id="commission"
                                        label="Chargeable"
                                        variant="outlined"
                                        name="commission"
                                        type="number"
                                        value={data.commission}
                                        onChange={handleChange}
                                        // onChange={commissionHandleChange}
                                        fullWidth
                                        InputProps={{
                                            readOnly: true,
                                          }}
                                        // required
                                    />
                            </div>
                        </Grid>

                        <Grid item xs={12}>
                            <FormControl required
                                error={updateBookingError?.message?.speciality}
                                component="fieldset" className={classes.formControl}>
                                <FormLabel component="legend">Specialities</FormLabel>
                                <Grid container>
                                    {
                                        speciality?.data && speciality?.data.map((items, index) => {
                                            // console.log('items: ', items);
                                            return (
                                                <Grid item xs={12} sm={6} md={4} lg={3} key={items.id}>
                                                    <FormControlLabel
                                                        control={<Checkbox color="primary" value={items.id} checked={data.speciality.includes(items.id)} onChange={handleChangeCheck} name="speciality" />}
                                                        label={items.speciality_name}
                                                    />
                                                </Grid>
                                            )
                                            
                                        })
                                    }
                                </Grid>
                                    <FormHelperText>{updateBookingError?.message?.speciality ? "The specialities field is required." :""}</FormHelperText>
                            </FormControl>
                        </Grid>
                    </Grid>

                    <Box className={classes.footerBtn}>
                        <Button color="primary" onClick={backPage}>
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" onClick={submitData} formNoValidate>
                            Update {loading=== true? <CircularProgress style={{width: 16, height:16, marginLeft:10}} color="inherit" />:""}
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    )
}

export default UpdateBooking
