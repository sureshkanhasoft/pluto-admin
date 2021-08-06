import React, { useState, useEffect } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Grid, TextField
} from '@material-ui/core';
import { getOrgProfile, updateOrgProfile } from '../../store/action';
import { useDispatch, useSelector } from 'react-redux';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Notification from '../../components/Notification/Notification';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
        marginBottom: 24
    },
    title: {
        fontWeight: "500",
        fontSize: 16,
        margin: "0 0 24px 0"
    },

    formControl: {
        width: "100%"
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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

const OrgProfile = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [profileNotify, setProfileNotify]= useState(false)
    const [data, setData] = useState({
        organization_name:"",
        first_name: "",
        last_name: "",
        email: '',
        contact_number: '',
        address_line_1: '',
        address_line_2: '',
        city:'',
        postcode: '',
    })
    const { profile, loading } = useSelector(state => state.orgProfile)
    const {profileOrgErrors, profileOrgSuccess} = useSelector(state => state.orgProfile)
    console.log('profileOrgErrors: ', profileOrgErrors);

    const handleChange = (event) => {
        setData({ ...data, [event.target.name]: event.target.value });
    };

    const getProfileDetail =() => {
        dispatch(getOrgProfile())
    }
    
    useEffect(() => {
        getProfileDetail()
    }, [])

    useEffect(()=>{
        if(profile.data){
            setData(profile.data)
        }
    },[profile.data])

    const profileSubmit = () => {
        dispatch(updateOrgProfile(data))
        setProfileNotify(true)
    }

    
    return (
        <>
            {
                loading ?
                <Backdrop className={classes.backdrop} open={loading}>
                    <CircularProgress color="inherit" />
                </Backdrop> : ""
            }
            {profileNotify && profileOrgSuccess?.message &&
                <Notification
                    data={profileOrgSuccess?.message}
                    status="success"
                />
            }
            <Paper className={classes.root}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="organization_name"
                            label="Organization Name"
                            variant="outlined"
                            name="organization_name"
                            value={data.organization_name ? data.organization_name:""}
                            onChange={handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="email"
                            label="Email"
                            variant="outlined"
                            name="email"
                            value={data.email}
                            onChange={handleChange}
                            fullWidth
                            disabled
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="contact_person_name"
                            label="Contact Person Name"
                            variant="outlined"
                            name="contact_person_name"
                            value={data.contact_person_name? data.contact_person_name:""}
                            onChange={handleChange}
                            fullWidth
                            helperText={profileOrgErrors.message==="The contact person name field is required."?profileOrgErrors.message:null}
                            error={
                                profileOrgErrors.message==="The contact person name field is required."?profileOrgErrors.message:null
                            }
                        />
                    </Grid>
                   
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="contact_number"
                            label="Contact Number"
                            variant="outlined"
                            name="contact_number"
                            value={data.contact_number ? data.contact_number:""}
                            onChange={handleChange}
                            fullWidth
                            helperText={profileOrgErrors.message==="The contact number field is required." || profileOrgErrors.message==="The contact number must be at least 6 characters."?profileOrgErrors.message:""}
                            error={
                                profileOrgErrors.message==="The contact number field is required." || profileOrgErrors.message==="The contact number must be at least 6 characters."?profileOrgErrors.message:""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="address_line_1"
                            label="Address line 1"
                            variant="outlined"
                            name="address_line_1"
                            value={data.address_line_1 ?data.address_line_1:""}
                            onChange={handleChange}
                            fullWidth
                            helperText={profileOrgErrors.message==="The address line 1 field is required."?profileOrgErrors.message:""}
                            error={profileOrgErrors.message==="The address line 1 field is required."?profileOrgErrors.message:""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="address_line_2"
                            label="Address line 2"
                            variant="outlined"
                            name="address_line_2"
                            value={data.address_line_2? data.address_line_2:""}
                            onChange={handleChange}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="city"
                            label="City"
                            variant="outlined"
                            name="city"
                            value={data.city?data.city:""}
                            onChange={handleChange}
                            fullWidth
                            helperText={profileOrgErrors.message==="The city field is required."?profileOrgErrors.message:""}
                            error={profileOrgErrors.message==="The city field is required."?profileOrgErrors.message:""}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4}>
                        <TextField
                            id="postcode"
                            label="Postcode"
                            variant="outlined"
                            name="postcode"
                            value={data.postcode?data.postcode:""}
                            onChange={handleChange}
                            fullWidth
                            type="text"
                            helperText={profileOrgErrors.message==="The postcode field is required."?profileOrgErrors.message:""}
                            error={profileOrgErrors.message==="The postcode field is required."?profileOrgErrors.message:""}
                        />
                    </Grid>
                </Grid>
                <Box className={classes.footerBtn}>
                    <Button color="primary">
                        Cancel
                    </Button>
                    <Button color="secondary" variant="contained" onClick={profileSubmit}>
                        Save
                    </Button>
                </Box>


            </Paper>

            
        </>
    )
}

export default OrgProfile
