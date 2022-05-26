import React, { useEffect, useState } from 'react';
import {
    Grid, Typography, makeStyles, Chip, Paper,
    Box,
    MenuItem,
    Button,
    Backdrop,
    CircularProgress, FormControl, Select
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import axios from 'axios';
import apiConfigs from '../../config/config';
import history from '../../utils/HistoryUtils';
import AlertDialog from '../../components/Alert/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../../components/Notification/Notification';
import { changeShiftStatus, deleteBooking, } from '../../store/action';
import CandidatesList from './CandidatesList';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    desc: {
        fontSize: 16
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    heading: {
        color: "#626161",
    },
    gridItem: {
        borderBottom: "1px solid #ccc"
    },
    chipContainer: {
        paddingTop: 12,
        '& > *': {
            marginRight: theme.spacing(0.5),
            background: "#f4f4f4"
        },
    },
    menuItem: {
        fontSize: 14,
        "& svg": {
            width: 16,
            height: "auto"
        }
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

    statusContainer: {
        width: "100%",
        maxWidth: "100%",
        flex: "0 0 100%",
        padding: '6px !important',
        background: "#eaebed",
        marginBottom: 24,
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
    },
    statusLabel: {
        marginRight: 16,
        fontWeight: "500",
        color: "#184a7b",
    },
    formControl1: {
        width: 140,
        display: "flex",
        border: "none",
        background: "#184a7b",
        color: "#fff",
        padding: '4px 8px',
        paddingLeft: 12,
        borderRadius: 6,
        "& .MuiInputBase-root": {
            color: "#fff",
            "&:before": {
                border: "none !important"
            }
        },
        "& svg": {
            fill: "#fff"
        }
    }
}))


const DetailBooking = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const booking_id = match.params.id;
    const [Id, setId] = useState(false);
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
    const [bookingDetail, setBookingDetail] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [staffNotify, setStaffNotify] = useState(false)
    const [bookingNotify, setBookingNotify] = useState(false);
    const [confirmBtn, setConfirmBtn] = useState(false);

    const { deleteBookingSuccess, deleteBookingError, shiftStatusSuccess } = useSelector(state => state.booking)
    // const { deleteBookingSuccess, deleteBookingError, confirmBookingSuccess, confirmBookingError, invitationSuccess, shiftStatusSuccess } = useSelector(state => state.booking)

    const [bookingStatus, setBookingStatus] = useState({
        booking_id: "",
        status: ""
    });

    const upadateLink = () => {
        history.push(`update`)
    }

    const getBookingDetail = async () => {
        setLoading(true)
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-booking/${booking_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setBookingDetail(response.data)
            setLoading(false)
        }).catch(error => {
            console.log("error.message", error.message);
            setLoading(false)
        });
    }
    useEffect(() => {
        getBookingDetail()
    }, [])

    const deleteBookingClose = () => {
        setDeleteOpen(false)
    }

    const deleteStaffItem = (id) => {
        setDeleteOpen(true)
        setId(id)
    }
    const alertResponse = (id) => {
        dispatch(deleteBooking(id))
        setStaffNotify(true)
    }
    const backPage = () => {
        history.go(-2)
    }

    const handleBookingStatus = (event, id) => {
        setBookingStatus({ ...bookingStatus, [event.target.name]: event.target.value, booking_id: id });
    };

    useEffect(() => {
        if (bookingStatus.booking_id !== "") {
            dispatch(changeShiftStatus(bookingStatus))
            setBookingNotify(true)
            setTimeout(() => {
                getBookingDetail()
            }, 4000);
        }

    }, [bookingStatus])
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {
                staffNotify && deleteBookingSuccess?.message &&
                <Notification
                    data={deleteBookingSuccess?.message}
                    status="success"
                />
            }
            {
                staffNotify && deleteBookingError?.message &&
                <Notification
                    data={deleteBookingError?.message}
                    status="error"
                />
            }

            {bookingNotify && shiftStatusSuccess?.message &&
                <Notification
                    data={shiftStatusSuccess?.message}
                    status="success"
                />
            }
            
            <Paper className={`${classes.root} mb-6`}>
                <Grid item xs={12}>
                    <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                        <Button color="primary" onClick={backPage}>
                            Back
                        </Button>
                    </Box>
                </Grid>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Reference ID:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.reference_id}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Name:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Hospital Name:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.hospital_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Ward Name:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.ward_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Band Required:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.grade_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Date:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.date.toString().split("-").reverse().join("-")}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={2} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Shift Time:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.start_time} - {bookingDetail?.data?.end_time}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={2} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Shift Type :</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.shift_type}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Rate:</Typography>
                        <Typography variant="h6" className={classes.desc}><span className="symbol">£</span> {bookingDetail?.data?.rate}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" className={classes.heading}>Speciality:</Typography>
                        <div className={classes.chipContainer}>

                            {
                                bookingDetail?.data?.speciality && bookingDetail?.data?.speciality.map((list, index) => {
                                    return (
                                        <Chip label={list.speciality_name} key={index} />
                                    )
                                })
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                           
                            {
                                bookingDetail?.data?.status === "CREATED" &&
                                <Button variant="contained" color="primary" onClick={upadateLink}>
                                    <EditIcon className="mr-2" />Edit
                                </Button>
                            }

                            {
                                (staffDetail !== "Finance" && bookingDetail?.data?.status === "CREATED") &&
                                <Button variant="contained" color="secondary" onClick={(e) => deleteStaffItem(bookingDetail?.data?.id)}>
                                    <DeleteIcon className="mr-2" />Delete
                                </Button>

                            }

                        </Box>
                    </Grid>
                </Grid>
            </Paper>


            {
                bookingDetail?.data?.status !== "CANCEL" &&
                <CandidatesList
                    bookingDetail={bookingDetail}
                    booking_id={booking_id}
                    getBookingDetail={getBookingDetail}
                    setConfirmBtn={setConfirmBtn}
                />
            }


            <AlertDialog
                id={Id}
                open={deleteOpen}
                close={deleteBookingClose}
                response={alertResponse}
                title="Delete Booking"
                description="Are you sure you want to delete?"
                buttonName="Delete"
            />
        </>
    )
}

export default DetailBooking
