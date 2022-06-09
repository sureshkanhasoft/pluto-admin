import React, { useEffect, useState } from 'react'

import {
    Paper,
    makeStyles,
    Button,
    Box,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    IconButton,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Pagination } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateHoliday from './CreateHoliday';
import AlertDialog from '../../components/Alert/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHoliday, getHoliday } from '../../store/action';
import Notification from '../../components/Notification/Notification';

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
    viewBtn: {
        display: "flex",
        alignItems: "center",
    },
}))

const Holiday = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [Id, setId] = useState(false);
    const [disabled, setDisabled]= useState(false)
    const [page, setPage] = React.useState(1);

    const { getHolidayItem, loading } = useSelector(state => state.holiday)

    const handleClickOpen = (id) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteHolidays = (holiday_id) => {
        setDisabled(true)
        setId(holiday_id)
        setDeleteOpen(true)
        // dispatch(deleteHoliday(holiday_id))
        
    }
    const deleteHolidayClose = () => {
        setDeleteOpen(false)
    }
    const alertResponse = (id) => {
        if(disabled === true ) {
            dispatch(deleteHoliday(id))
        }
        setDisabled(false)
        // SetDeleteNotify(true)
    }

    const handleChangePage = (pageNo,value) => {
        setPage(value);
        // setTimeout(getBookingList(value,searchData.search,status), 2000);
    };

    useEffect(() => {
        dispatch(getHoliday())
    }, [dispatch])

    return (
        <>
            {/* {deleteNotify && deleteSuccess?.message &&
                <Notification
                    data={deleteSuccess?.message}
                    status="success"
                />
            }

            {deleteNotify && deleteError?.message &&
                <Notification
                    data={deleteError?.message}
                    status="error"
                />
            } */}

            <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>
            <Paper className={`${classes.root} mb-6`}>
                <Box className="mb-5" display="flex" alignItems="center" justifyContent="flex-end">
                    <div className="ml-5">
                        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                            <AddIcon className="mr-2" />Add Holiday
                        </Button>
                    </div>
                </Box>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 130 }}>#</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Title</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getHolidayItem?.data && getHolidayItem.data.map((row, index) => {
                            return (
                                <TableRow key={index} >
                                    <TableCell scope="row">{index + 1}</TableCell>
                                    <TableCell align="left">{row.holiday_date}</TableCell>
                                    <TableCell align="left">{row.holiday_title}</TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                                            <IconButton onClick={() => deleteHolidays(row.id)} style={{padding:6}}><DeleteIcon color="secondary" /></IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )

                        })}
                    </TableBody>
                </Table>
                {/* <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination onChange={handleChangePage} page={page} count={getHolidayItem?.data?.last_page} showFirstButton showLastButton />
                </Box> */}

            </Paper>

            <CreateHoliday
                open={open}
                handleClose={handleClose}
            />

            <AlertDialog
                id={Id}
                response={alertResponse}
                open={deleteOpen}
                close={deleteHolidayClose}
                title="Delete Holiday"
                description="Are you sure you want to delete Holiday?"
                buttonName="Delete"
            />

            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
        </>
    )
}

export default Holiday
