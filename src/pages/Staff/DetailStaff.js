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
import history from '../../utils/HistoryUtils';
import axios from 'axios';
import apiConfigs from '../../config/config';
import { useDispatch, useSelector } from 'react-redux';
import { deleteStaff } from '../../store/action'
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

const DetailStaff = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch()
    const user_id = match.params.id;
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [staffNotify, setStaffNotify] = useState(false)
    const { staffDeleteSuccess, staffDeleteError } = useSelector(state => state.staff)
    const upadateLink = () => {
        // let dir = match.path;
        // const updateLink = dir.substring(0, dir.lastIndexOf('/'));
        // console.log('updateLink: ', updateLink);
        // history.push(`${updateLink}/update`)
        history.push(`update`)
    }

    const getSingleStaff = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        setLoading(true)
        await axios.get(`${apiConfigs.API_URL}api/organization/user/get-user/${user_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setItems(response.data.data)
            setLoading(false)
        }).catch(error => {
            console.log("error.message", error.message);
            setLoading(false)
        });
    }

    const deleteStaffItem = (id) => {
        dispatch(deleteStaff(id))
        setStaffNotify(true)
    }

    useEffect(() => {
        getSingleStaff()
    }, [user_id])

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {
                staffNotify && staffDeleteSuccess?.message &&
                <Notification
                    data={staffDeleteSuccess?.message}
                    status="success"
                />
            }

            {
                staffNotify && staffDeleteError?.message &&
                <Notification
                    data={staffDeleteError?.message}
                    status="error"
                />
            }
            <Paper className={`${classes.root} mb-6`}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>First Name</Typography>
                        <Typography variant="h6" className={classes.desc}>{items.first_name} </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Last Name</Typography>
                        <Typography variant="h6" className={classes.desc}>{items.last_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Email Address</Typography>
                        <Typography variant="h6" className={classes.desc}>{items.email}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Contact Number</Typography>
                        <Typography variant="h6" className={classes.desc}>{items.contact_number}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Select Role:</Typography>
                        <Typography variant="h6" className={classes.desc}>{items.role_name ? items.role_name : "-"}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Select Designation</Typography>
                        <Typography variant="h6" className={classes.desc}>{items.designation_name}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                            <Button variant="contained" color="primary" onClick={upadateLink}>
                                <EditIcon className="mr-2" />Edit
                            </Button>
                            <Button variant="contained" color="secondary" onClick={(e) => deleteStaffItem(items.user_id)}>
                                <DeleteIcon className="mr-2" />Delete
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </Paper>
        </>
    )
}

export default DetailStaff
