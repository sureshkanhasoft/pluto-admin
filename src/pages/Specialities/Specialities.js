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
    InputBase
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import { Pagination } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AlertDialog from '../../components/Alert/AlertDialog';
import CreateSpeciality from './CreateSpeciality';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },

    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        flexGrow: 1,
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(),
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing(6),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing(),
        paddingRight: theme.spacing(),
        paddingBottom: theme.spacing(),
        paddingLeft: theme.spacing(6),
        transition: theme.transitions.create('width'),
        width: '100%',
        borderBottom: "1px solid #ccc",
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
    viewBtn: {
        display: "flex",
        alignItems: "center",
    },
}))

const specialityList = [
    {
        name: "Aerospace Medicine",
    },
    {
        name: "General Surgery",
    },
    {
        name: "Plastic Surgery",
    },
    {
        name: "Neurosurgery",
    },
    {
        name: "Physiotherapy",
    },
    {
        name: "Psychiatry",
    },
]

const Specialities = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);

    const handleClickOpen = () => {
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
                <Box className="mb-5" display="flex" alignItems="center">
                    <div className={classes.search} >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className="ml-5">
                        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                            <AddIcon className="mr-2" />Add Speciality
                        </Button>
                    </div>
                </Box>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 80 }}>Id</TableCell>
                            <TableCell align="left">Specialities</TableCell>
                            <TableCell align="right">Action</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            specialityList.map((row, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="right">
                                            <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                <IconButton onClick={handleClickOpen}><EditIcon color="primary" /></IconButton>
                                                <IconButton onClick={deleteRole}><DeleteIcon color="secondary" /></IconButton>
                                            </Box>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination count={5} />
                </Box>
            </Paper>

            <CreateSpeciality
                open={open}
                handleClose={handleClose}
            />

            <AlertDialog
                open={deleteOpen}
                close={deleteRoleClose}
                title="Delete Speciality"
                description="Are you sure you want to delete?"
                buttonName="Delete"
            />
        </>
    )
}

export default Specialities
