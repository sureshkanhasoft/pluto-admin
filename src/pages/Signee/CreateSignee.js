import React, { useEffect, useState } from 'react';
import { 
    Grid,
    makeStyles, Paper, TextField, FormControl, InputLabel, Select, MenuItem,
    Box,Button, 
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { createSignee, getCandidateReferredFrom } from '../../store/action';
import Notification from '../../components/Notification/Notification';
import axios from 'axios';
import apiConfigs from '../../config/config';
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
    }
}))

const CreateSignee = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const {getCandidateReferrredForm, loading, createSigneeSuccess, createSigneeError} = useSelector(state => state.signee)
    const [signeeNotify, setSigneeNotify] = useState(false)

    // for today date selection
    const dateNow = new Date();
    const year = dateNow.getFullYear();
    const monthWithOffset = dateNow.getUTCMonth() + 1;
    const month = monthWithOffset.toString().length < 2 ? `0${monthWithOffset}`: monthWithOffset;
    const date = dateNow.getUTCDate().toString().length < 2 ? `0${dateNow.getUTCDate()}`: dateNow.getUTCDate();
    const materialDateInput = `${year}-${month}-${date}`;
    // for today date selection

    const [data, setData] = useState({
        first_name:"",
        last_name:"",
        contact_number:"",
        date_of_birth:"",
        candidate_id:"",
        address_line_1:"",
        address_line_2:"",
        address_line_3:"",
        city:"",
        postcode:"",
        email:"",
        candidate_referred_from:"",
        nationality:"",
        date_registered:materialDateInput,
        organization_id:"",
        nmc_dmc_pin:"",
        speciality:[]
    })


    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const handleChangeDate = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }

    const getCandidateId= async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-candidate`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setData({ ...data, candidate_id: parseFloat(response.data.data.candidate_id) })
        }).catch(error => {
            console.log("error.message", error.message);
        });
    }
    useEffect(() => {
        getCandidateId()
    }, [])

    useEffect(() => {
        dispatch(getCandidateReferredFrom());
    }, [])

    const signeeSubmitData = () => {
        console.log('data', data);
        dispatch(createSignee(data))
        setSigneeNotify(true)
    }

    const backPage = () => {
        history.goBack()
    }

    return (
        <>
            {
                signeeNotify && createSigneeSuccess?.message &&
                <Notification
                    data={createSigneeSuccess?.message}
                    status="success"
                />
            }
            {signeeNotify && createSigneeError?.message &&
                <Notification
                    data={createSigneeError?.message}
                    status="error"
                />
            }
            <Paper className={classes.root}>
                <form onSubmit={handleSubmit(signeeSubmitData)} autoComplete="off">
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="candidate_id"
                                label="Candidate Id"
                                variant="outlined"
                                name="candidate_id"
                                value={data?.candidate_id}
                                onChange={handleChange}
                                fullWidth
                                // required
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="first_name"
                                label="First name"
                                variant="outlined"
                                name="first_name"
                                // value={data?.first_name}
                                {...register('first_name', {
                                    required: "Please enter first name",
                                })}
                                error={(errors.first_name ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="last_name"
                                label="Last name"
                                variant="outlined"
                                name="last_name"
                                // value={data?.last_name}
                                {...register('last_name', {
                                    required: "Please enter last name",
                                })}
                                error={(errors.last_name ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="email"
                                label="email"
                                variant="outlined"
                                name="email"
                                // value={data?.email}
                                {...register('email', {
                                    required: "Please enter email",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                        message: "Enter a valid e-mail address",
                                    },
                                })}
                                error={(errors.email ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="contact_number"
                                label="Contact number"
                                variant="outlined"
                                name="contact_number"
                                type="number"
                                value={data?.contact_number}
                                // {...register('contact_number', {
                                //     required: "Please enter contact number",
                                //     minLength:{
                                //         value:10,
                                //         message: "Number must have at least 10 digit"
                                //     },
                                //     pattern: /[0-9]/
                                // })}
                                // error={(errors.contact_number ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                // required
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date_of_birth"
                                label="Date of birth"
                                type="date"
                                name="date_of_birth"
                                variant="outlined"
                                // {...register('date_of_birth', {
                                //     required: "Please enter DOB",
                                // })}
                                // error={(errors.date_of_birth ? true : false)}
                                onChange={handleChangeDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                // required
                            />
                        </Grid>
                        
                        
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                                id="phone_number"
                                label="Phone number"
                                variant="outlined"
                                name="phone_number"
                                type="number"
                                value={data?.phone_number}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid> */}
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="address_line_1"
                                label="Address line 1"
                                variant="outlined"
                                name="address_line_1"
                                value={data?.address_line_1}
                                // {...register('address_line_1', {
                                //     required: "Please enter address",
                                // })}
                                // error={(errors.address_line_1 ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="address_line_2"
                                label="Address line 2"
                                variant="outlined"
                                name="address_line_2"
                                value={data?.address_line_2}
                                onChange={handleChange}
                                fullWidth
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="city"
                                label="City"
                                variant="outlined"
                                name="city"
                                value={data?.city}
                                // {...register('city', {
                                //     required: "Please enter city",
                                // })}
                                // error={(errors.city ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="postcode"
                                label="Postcode"
                                variant="outlined"
                                name="postcode"
                                value={data?.postcode}
                                // {...register('postcode', {
                                //     required: "Please enter postcode",
                                //     minLength:{
                                //         value:5
                                //     }
                                // })}
                                // error={(errors.postcode ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="nationality"
                                label="Nationality"
                                variant="outlined"
                                name="nationality"
                                value={data?.nationality}
                                // {...register('nationality', {
                                //     required: "Please enter nationality",
                                // })}
                                // error={(errors.nationality ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date_registered"
                                label="Date Registered"
                                type="date"
                                name="date_registered"
                                variant="outlined"
                                defaultValue={materialDateInput}
                                // value={data?.date_registered}
                                onChange={handleChange}
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="nmc_dmc_pin"
                                label="Nmc Dmc Pin"
                                variant="outlined"
                                name="nmc_dmc_pin"
                                value={data?.nmc_dmc_pin}
                                // {...register('nmc_dmc_pin', {
                                //     required: "Please enter nmc dmc pin",
                                // })}
                                // error={(errors.nmc_dmc_pin ? true : false)}
                                onChange={handleChange}
                                fullWidth
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" className={classes.formControl} 
                            // required 
                            // {...register('candidate_referred_from', {
                            //     required: "Please enter candidate referred from",
                            // })}
                            // error={(errors.candidate_referred_from ? true : false)}
                            >
                                <InputLabel>Candidate Referred From</InputLabel>
                                <Select
                                    value={data?.candidate_referred_from || ''}
                                    name="candidate_referred_from"
                                    label="Candidate Referred From"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        Select a ward
                                    </MenuItem>
                                    {
                                        getCandidateReferrredForm?.data && getCandidateReferrredForm?.data.map((list, index) => {
                                            return (
                                                <MenuItem value={list.id} key={index}>{list.name}</MenuItem>
                                            )
                                        })
                                    }
                                </Select>
                            </FormControl>
                        </Grid>
                    </Grid>
                    <Box className={classes.footerBtn}>
                        <Button color="primary" onClick={backPage}>
                            Cancel
                        </Button>
                        <Button color="secondary" variant="contained" type="submit" formNoValidate>
                            Submit
                        </Button>
                    </Box>
                </form>
            </Paper>
        </>
    );
};

export default CreateSignee;