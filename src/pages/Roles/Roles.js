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
// import { Pagination } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateRoles from './CreateRoles';
import AlertDialog from '../../components/Alert/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoles, getRoles } from '../../store/action';
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

const Roles = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteNotify, SetDeleteNotify] = useState(false);
    const [Id, setId] = useState(false);
    // const [deleteConfirm, SetDeleteConfim] = useState(false);

    const { getRolesItem, loading, deleteSuccess, deleteError } = useSelector(state => state.roles)

    const handleClickOpen = (id) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteRole = (role_id) => {
        setId(role_id)
        setDeleteOpen(true)
        // dispatch(deleteRoles(role_id))
        
    }
    const deleteRoleClose = () => {
        setDeleteOpen(false)
    }
    const alertResponse = (id) => {
        dispatch(deleteRoles(id))
        SetDeleteNotify(true)
    }

    useEffect(() => {
        dispatch(getRoles())
    }, [dispatch])

    return (
        <>
            {deleteNotify && deleteSuccess?.message &&
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
            }

            <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>
            <Paper className={`${classes.root} mb-6`}>
                <Box className="mb-5" display="flex" alignItems="center" justifyContent="flex-end">
                    <div className="ml-5">
                        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                            <AddIcon className="mr-2" />Add Role
                        </Button>
                    </div>
                </Box>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 130 }}>Id</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getRolesItem?.data && getRolesItem.data.map((row, index) => {
                            return (
                                <TableRow key={index} >
                                    <TableCell scope="row">{index + 1}</TableCell>
                                    <TableCell align="left">{row.role_name}</TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                                            <IconButton onClick={() => deleteRole(row.id)}><DeleteIcon color="secondary" /></IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )

                        })}
                    </TableBody>
                </Table>
                {/* <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination count={5} />
                </Box> */}

            </Paper>

            <CreateRoles
                open={open}
                handleClose={handleClose}
            />

            <AlertDialog
                id={Id}
                response={alertResponse}
                open={deleteOpen}
                close={deleteRoleClose}
                title="Delete Role"
                description="Are you sure you want to delete role?"
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

export default Roles
