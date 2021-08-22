import React, { useEffect, useState } from 'react';
import {
    Grid, Typography, makeStyles, Paper, Box,
    Button,
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import apiConfigs from '../../config/config';

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
    desc: {
        fontSize: 16
    },
    heading: {
        color: "#626161",
    },
    gridItem: {
        borderBottom: "1px solid #ccc"
    },

    mainWrapper: {
        paddingBottom: "0 !important",
        paddingTop: "24px !important"
    },

    mainTitle: {
        fontSize: 18,
        color: "#ff8b46",
        fontWeight: "500",
    },

    btnContainer: {
        '& > *': {
            marginLeft: theme.spacing(2),
            "& svg": {
                width: 20,
                height: "auto"
            }
        },
    }
}))

const DetailTrust = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const id = match.params.id;
    const [loading, setLoading] = useState(false)
    const [trustItems, setTrustItems] = useState([])

    const getSingleTrust = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        setLoading(true)
        await axios.get(`${apiConfigs.API_URL}api/organization/get-trust/${id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            console.log('response: ', response);
            setTrustItems(response.data.data)
            setLoading(false)
        }).catch(error => {
            console.log("error.message", error.message);
            setLoading(false)
        });
    }

    useEffect(() => {
        getSingleTrust()
    }, [id])

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            <Paper className={`${classes.root} mb-6`}>
                <Grid container spacing={4}>
                    <Grid item xs={12}>
                        <Typography className={classes.mainTitle}>Trust Details</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Name</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Code:</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.code}</Typography>
                    </Grid>
                    <Grid item xs={12} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Preferred Invoice Method</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.preference_invoive_method}</Typography>
                    </Grid>


                    <Grid item xs={12} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.email_address}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={7} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Address</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.address_line_1}, {trustItems.address_line_2}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>City</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.city}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={2} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Postal Code</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.post_code}</Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.mainWrapper}>
                        <Typography className={classes.mainTitle}>Portal Login Details</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Portal URL</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.trust_portal_url}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.portal_email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Password</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.portal_password}</Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.mainWrapper}>
                        <Typography className={classes.mainTitle}>Training</Typography>
                    </Grid>

                    <Grid item xs={12} sm={12} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Training Example Type</Typography>
                        <Typography variant="h6" className={classes.desc}>Test training</Typography>
                    </Grid>

                    <Grid item xs={12} className={classes.mainWrapper}>
                        <Typography className={classes.mainTitle}>Wards</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={6} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Ward Name</Typography>
                        <Typography variant="h6" className={classes.desc}>Test Ward</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Type</Typography>
                        <Typography variant="h6" className={classes.desc}>Hospital</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={3} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Number</Typography>
                        <Typography variant="h6" className={classes.desc}>1001</Typography>
                    </Grid>


                    <Grid item xs={12} className={classes.mainWrapper}>
                        <Typography className={classes.mainTitle}>Contact Information</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>First Name</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.first_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Last Name</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.last_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.contact_email_address}</Typography>
                    </Grid>

                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Phone Number</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.phone_number}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Client</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.client}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Department</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.department}</Typography>
                    </Grid>

                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                            <Button variant="contained" color="primary">
                                <EditIcon className="mr-2" />Edit
                            </Button>
                            <Button variant="contained" color="secondary">
                                <DeleteIcon className="mr-2" />Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default DetailTrust