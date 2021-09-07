import React, { useEffect, useState } from 'react';
import {
    Grid,
    Typography,
    makeStyles,
    Paper,
    Box,
    Button,
    Backdrop,
    CircularProgress,
} from "@material-ui/core";
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import AlertDialog from '../../components/Alert/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import history from '../../utils/HistoryUtils';
import { deleteSignee, getSingleSignee } from '../../store/action';
import Notification from '../../components/Notification/Notification';

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

const DetailSignee = ({match}) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const user_id = match.params.id;
    const [Id, setId] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [signeeNotify, setSigneeNotify] = useState(false)

    const {getSingleSigneeItem, loading, deleteSigneeSuccess, deleteSigneeError} = useSelector(state => state.signee)

    const deleteStaffItem = (id) => {
        setDeleteOpen(true)
        setId(id)
    }

    const alertResponse = (id) => {
        dispatch(deleteSignee(id))
        setSigneeNotify(true)
    }

    const deleteRoleClose = () => {
        setDeleteOpen(false)
    }
    useEffect(() => {
        dispatch(getSingleSignee(user_id))
        
    }, [user_id])

    const backPage = () => {
        history.go(-2)
    }
    const upadateLink = () => {
        history.push(`update`)
    }
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {signeeNotify && deleteSigneeSuccess?.message &&
                <Notification
                    data={deleteSigneeSuccess?.message}
                    status="success"
                />
            }
            {signeeNotify && deleteSigneeError?.message &&
                <Notification
                    data={deleteSigneeError?.message}
                    status="error"
                />
            }
           <Paper className={`${classes.root} mb-6`}>
                <Grid container spacing={4}>
                    {/* <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Candidate Id</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.candidate_id} </Typography>
                    </Grid> */}
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>First Name</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.first_name} </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Last Name</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.last_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.email}</Typography>
                    </Grid>
                    {/* <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Password</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.candidate_id}</Typography>
                    </Grid> */}
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Date of birth</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.date_of_birth}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Mobile Number</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.mobile_number}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Phone Number</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.phone_number}</Typography>
                    </Grid>
                   
                    
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Address</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.address_line_1} {getSingleSigneeItem?.data?.address_line_2}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>City</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.city}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Postcode</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.postcode}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Date Registration</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.date_registered}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Nationality</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.nationality}</Typography>
                    </Grid>
                    
                   
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>NMC DMC pin</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.nmc_dmc_pin}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Candidate Referred from</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.candidate_referred_name ? getSingleSigneeItem?.data?.candidate_referred_name : "-"}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                            <Button color="primary" onClick={backPage}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={upadateLink}>
                                <EditIcon className="mr-2" />Edit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={(e) => deleteStaffItem(getSingleSigneeItem?.data?.id)}>
                                <DeleteIcon className="mr-2" />Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <AlertDialog
                id={Id}
                open={deleteOpen}
                close={deleteRoleClose}
                response={alertResponse}
                title="Delete Signee Member"
                description="Are you sure you want to delete?"
                buttonName="Delete"
            />
        </>
    );
};

export default DetailSignee;