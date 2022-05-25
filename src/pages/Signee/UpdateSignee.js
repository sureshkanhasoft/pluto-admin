import React, { useEffect, useState } from 'react';
import { 
    Grid,
    makeStyles, Paper, TextField, FormControl, InputLabel, Select, MenuItem,
    Box,Button, 
    Backdrop,CircularProgress, FormHelperText
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { getCandidateReferredFrom, getSingleSignee, updateSignee } from '../../store/action';
import history from '../../utils/HistoryUtils';
import Notification from '../../components/Notification/Notification';
import UtilService from '../../helper/service';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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

const UpdateSignee = ({match}) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const user_id = match.params.id;
    const [signeeNotify, setSigneeNotify] = useState(false)
    const {getCandidateReferrredForm, loading, getSingleSigneeItem, updateSigneeSuccess, updateSigneeError} = useSelector(state => state.signee)
    const disFutureDate = UtilService.disabledPastDate()
    const [bdate, setBdate] = useState(null)
    
    const [data, setData] = useState({
        password:"",
        mobile_number:"",
        first_name:"",
        last_name:"",
        phone_number:"",
        date_of_birth:"",
        candidate_id:"",
        address_line_1:"",
        address_line_2:"",
        address_line_3:"",
        city:"",
        postcode:"",
        email:"",
        // candidate_referred_from:"",
        nationality:"",
        date_registered:"",
        organization_id:"",
        nmc_dmc_pin:"",
        speciality:[]
    })

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    }
    const handleChangeDate = (event) => {
        let tempBdate = (event.target.value)
        setData({ ...data, [event.target.name]: tempBdate });
        setBdate(tempBdate)
    }
    useEffect(() => {
        dispatch(getCandidateReferredFrom());
    }, [])
    useEffect(()=> {
        dispatch(getSingleSignee(user_id))
    },[user_id])

    useEffect(()=>{
        // let speciality = [];
        //     response.data.data.speciality.map(val => {
        //         speciality.push(val.speciality_id);
        //     })
        //     response.data.data.speciality = speciality;
        setData(getSingleSigneeItem?.data)
        setBdate(getSingleSigneeItem?.data?.date_of_birth?.split('-').reverse().join('-'))
    }, [getSingleSigneeItem])

    

    const signeeSubmitData = (e) => {
        e.preventDefault()
        let requestData={
            ...data,
            id:data.user_id,
            speciality:data.speciality.speciality_id
        }
        delete requestData.user_id
        dispatch(updateSignee(requestData))
        setSigneeNotify(true)
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
            {
                signeeNotify && updateSigneeSuccess?.message &&
                <Notification
                    data={updateSigneeSuccess?.message}
                    status="success"
                />
            }
            <Paper className={classes.root}>
                <form onSubmit={(e) => signeeSubmitData(e)} autoComplete="off">
                    <Grid container spacing={2}>
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                                id="candidate_id"
                                label="Candidate Id"
                                variant="outlined"
                                name="candidate_id"
                                value={data?.candidate_id}
                                onChange={handleChange}
                                fullWidth
                                required
                                InputProps={{
                                    readOnly: true,
                                }}
                            />
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="first_name"
                                label="First name"
                                variant="outlined"
                                name="first_name"
                                value={data?.first_name || ''}
                                helperText={updateSigneeError?.message?.first_name}
                                error={!!updateSigneeError?.message?.first_name}
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
                                value={data?.last_name || ''}
                                onChange={handleChange}
                                helperText={updateSigneeError.message?.last_name}
                                error={!!updateSigneeError.message?.last_name}
                                fullWidth
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="email"
                                label="Email"
                                variant="outlined"
                                name="email"
                                value={data?.email || ''}
                                onChange={handleChange}
                                helperText={updateSigneeError.message?.email}
                                error={!!updateSigneeError.message?.email}
                                fullWidth
                                disabled
                                // required
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <TextField
                                id="password"
                                label="Password"
                                type="password"
                                variant="outlined"
                                name="password"
                                value={data?.password}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        </Grid> */}
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="contact_number"
                                label="Contact number"
                                variant="outlined"
                                name="contact_number"
                                type="text"
                                value={data?.contact_number || ''}
                                // helperText={updateSigneeError.message?.contact_number}
                                // error={!!updateSigneeError.message?.contact_number}
                                onChange={handleChange}
                                fullWidth
                                // required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date_of_birth"
                                label="Date of birth"
                                name="date_of_birth"
                                variant="outlined"
                                value={bdate || ''}
                                type="date"
                                // helperText={updateSigneeError.message?.date_of_birth}
                                // error={!!updateSigneeError.message?.date_of_birth}
                                onChange={handleChangeDate}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                fullWidth
                                inputProps = {{
                                    max:disFutureDate
                                }}
                                // required
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="date_registered"
                                label="Date Registered"
                                name="date_registered"
                                variant="outlined"
                                value={data?.date_registered || ''}
                                onChange={handleChange}
                                // helperText={updateSigneeError.message?.date_of_birth}
                                // error={!!updateSigneeError.message?.date_of_birth}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                InputProps={{
                                    readOnly: true,
                                }}
                                fullWidth
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={12}>
                            <TextField
                                id="address_line_1"
                                label="Address line 1"
                                variant="outlined"
                                name="address_line_1"
                                value={data?.address_line_1 || ''}
                                // helperText={updateSigneeError.message?.address_line_1}
                                // error={!!updateSigneeError.message?.address_line_1}
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
                                value={data?.address_line_2 || ''}
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
                                value={data?.city || ''}
                                // helperText={updateSigneeError.message?.city}
                                // error={!!updateSigneeError.message?.city}
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
                                value={data?.postcode || ''}
                                // helperText={updateSigneeError.message?.postcode}
                                // error={!!updateSigneeError.message?.postcode}
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
                                value={data?.nationality || ''}
                                onChange={handleChange}
                                // helperText={updateSigneeError.message?.nationality}
                                // error={!!updateSigneeError.message?.nationality}
                                fullWidth
                                // required
                            />
                        </Grid>
                        
                        <Grid item xs={12} sm={6}>
                            <TextField
                                id="nmc_dmc_pin"
                                label="NMC/DMC Pin"
                                variant="outlined"
                                name="nmc_dmc_pin"
                                value={data?.nmc_dmc_pin || ''}
                                onChange={handleChange}
                                // helperText={updateSigneeError.message?.nmc_dmc_pin}
                                // error={!!updateSigneeError.message?.nmc_dmc_pin}
                                fullWidth
                                // required
                            />
                        </Grid>
                        {/* <Grid item xs={12} sm={6}>
                            <FormControl variant="outlined" className={classes.formControl} 
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
                                <FormHelperText>{updateSigneeError.message?.candidate_referred_from ? updateSigneeError.message?.candidate_referred_from :""}</FormHelperText>
                            </FormControl>
                        </Grid> */}
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

export default UpdateSignee;