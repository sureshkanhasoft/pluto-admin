import React, { useState } from 'react'

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
} from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { Pagination } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateRoles from './CreateRoles';
import AlertDialog from '../../components/Alert/AlertDialog';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    viewBtn: {
        display: "flex",
        alignItems: "center",
    },
}))

const roleList = [
    {
        name: "Manager",
    },
    {
        name: "Clinical Manager",
    },
    {
        name: "Nurse Manager",
    },
]

const Roles = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const handleClickOpen = (id) => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const deleteRole = () => {
        setDeleteOpen(true)
    }
    const deleteRoleClose = () => {
        setDeleteOpen(false)
    }
    return (
        <>

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
                            <TableCell style={{ width: 80 }}>Id</TableCell>
                            <TableCell align="left">Role</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {roleList.map((row, index) => {
                            return (
                                <TableRow key={index} >
                                    <TableCell scope="row">{index + 1}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="right">
                                        <Box display="flex" alignItems="center" justifyContent="flex-end">
                                            <IconButton onClick={deleteRole}><DeleteIcon color="secondary" /></IconButton>
                                        </Box>
                                    </TableCell>
                                </TableRow>
                            )

                        })}
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination count={5} />
                </Box>

            </Paper>

            <CreateRoles
                open={open}
                handleClose={handleClose}
            />

            <AlertDialog
                open={deleteOpen}
                close={deleteRoleClose}
                title="Delete Role"
                description="Are you sure you want to delete role?"
                buttonName="Delete"
            />
        </>
    )
}

export default Roles
