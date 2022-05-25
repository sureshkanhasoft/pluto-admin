import React, { Fragment, useEffect, useState } from 'react';
import {
    Grid, Typography, makeStyles, Paper, Box,
    Button,
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiConfigs from '../../config/config';
import history from '../../utils/HistoryUtils';
import AlertDialog from '../../components/Alert/AlertDialog';
import Notification from '../../components/Notification/Notification';
import { deleteTrust } from '../../store/action';

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
    descBreak: {
        fontSize: 16,
        wordBreak:'break-word'
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
    },
    hospitalBox: {
        background: "#f8fafc",
        margin: "30px 0",
        // padding:"16px",
        borderRadius: 8,
        width: "100%"
    }
}))

const DetailTrust = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const id = match.params.id;
    const [Id, setId] = useState(false);
    const [loading, setLoading] = useState(false)
    const [trustItems, setTrustItems] = useState([])
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [staffNotify, setStaffNotify] = useState(false)
    const { deleteTrustSuccess, deleteTrustError } = useSelector(state => state.trust)
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));

    const getSingleTrust = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        setLoading(true)
        await axios.get(`${apiConfigs.API_URL}api/organization/get-trust/${id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setTrustItems(response.data.data)
            setLoading(false)
        }).catch(error => {
            console.log("error.message", error.message);
            setLoading(false)
        });
    }

    const upadateLink = () => {
        history.push(`update`)
    }
    const backPage = () => {
        history.go(-2)
    }

    const deleteTrustClose = () => {
        setDeleteOpen(false)
    }

    const alertResponse = (id) => {
        dispatch(deleteTrust(id))
        setStaffNotify(true)
    }

    const deleteStaffItem = (id) => {
        setDeleteOpen(true)
        setId(id)
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

            {
                staffNotify && deleteTrustSuccess?.message &&
                <Notification
                    data={deleteTrustSuccess?.message}
                    status="success"
                />
            }  {
                staffNotify && deleteTrustError?.message &&
                <Notification
                    data={deleteTrustError?.message}
                    status="error"
                />
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

                </Grid>

                {
                    trustItems?.hospital && trustItems?.hospital.map((items, index) => {
                        return (
                            <Grid container spacing={4} key={index} className={classes.hospitalBox}>
                                <Grid item xs={12} className="mb-4">
                                    <Typography className={classes.mainTitle}>{`${index + 1}.`} Hospital</Typography>
                                </Grid>
                                <Grid item xs={12} className={classes.gridItem}>
                                    <Typography variant="body2" className={classes.heading}>Hospital Name</Typography>
                                    <Typography variant="h6" className={classes.desc}>{items.hospital_name}</Typography>
                                </Grid>

                                {
                                    items?.ward && items?.ward.map((warditem, wIndex) => {
                                        return (
                                            <Fragment key={wIndex}>
                                                <Grid item xs={12} className={classes.mainWrapper}>
                                                    <Typography className={classes.subTitle}>{`${wIndex + 1}.`} Wards</Typography>
                                                </Grid>
                                                <Grid item xs={12} sm={6} lg={6} className={classes.gridItem}>
                                                    <Typography variant="body2" className={classes.heading}>Ward Name</Typography>
                                                    <Typography variant="h6" className={classes.desc}>{warditem.ward_name}</Typography>
                                                </Grid>

                                                <Grid item xs={12} sm={6} lg={3} className={classes.gridItem}>
                                                    <Typography variant="body2" className={classes.heading}>Type</Typography>
                                                    <Typography variant="h6" className={classes.desc}>{warditem.ward_type}</Typography>
                                                </Grid>

                                                {/* <Grid item xs={12} sm={6} lg={3} className={classes.gridItem}>
                                                    <Typography variant="body2" className={classes.heading}>Number</Typography>
                                                    <Typography variant="h6" className={classes.desc}>{warditem.ward_number}</Typography>
                                                </Grid> */}
                                            </Fragment>
                                        )
                                    })
                                }
                            </Grid>
                        )
                    })
                }
                <Grid container spacing={4}>

                    <Grid item xs={12} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Preferred Invoice Method</Typography>
                        <Typography variant="h6" className={classes.desc}>{trustItems.preference_invoice_method}</Typography>
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
                        <Typography variant="h6" className={classes.descBreak}>{trustItems.trust_portal_url}</Typography>
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
                        <Typography className={classes.mainTitle}>Notes</Typography>
                    </Grid>

                    {/* <Grid item xs={12} sm={12} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Training Example Type</Typography>
                        <Typography variant="h6" className={classes.desc}></Typography>
                    </Grid> */}

                    {
                        trustItems?.training && trustItems?.training.map((items, index) => {
                            return (
                                <Grid item xs={12} sm={12} className={classes.gridItem} key={index}>
                                    <Typography variant="body2" className={classes.heading}>{++index}. Notes </Typography>
                                    <Typography variant="h6" className={classes.desc}>{items.training_name}</Typography>
                                </Grid>
                            )
                        })
                    }

                    {/* <Grid item xs={12} className={classes.mainWrapper}>
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
                    </Grid> */}


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
                            <Button color="primary" onClick={backPage}>
                                Back
                            </Button>
                            {
                                (staffDetail !== "Booking" && staffDetail !== "Finance") && 
                                <>
                                <Button variant="contained" color="primary" onClick={upadateLink}>
                                    <EditIcon className="mr-2" />Edit
                                </Button>
                                <Button variant="contained" color="secondary" onClick={(e) => deleteStaffItem(trustItems.id)}>
                                    <DeleteIcon className="mr-2" />Delete
                                </Button>
                                </>
                            }
                            
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <AlertDialog
                id={Id}
                open={deleteOpen}
                close={deleteTrustClose}
                response={alertResponse}
                title="Delete Trust"
                description="Are you sure you want to delete?"
                buttonName="Delete"
            />
        </>
    )
}

export default DetailTrust