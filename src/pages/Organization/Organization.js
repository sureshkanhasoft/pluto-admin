import React, { useState } from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Paper,
    makeStyles,
    InputBase,
    Button,
    Box,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import CreateOrganization from './CreateOrganization';
import UpdateOrganization from './UpdateOrganization';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    table: {
        minWidth: 700,
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
}))

const oraganizationList = [
    {
        id: 1,
        organization: "United Nations Organization",
        person: "David",
        email: "david123@gmail.com",
        number: "999 999 0000",
        status: "Active",
    },
    {
        id: 2,
        organization: "United Nations Organization",
        person: "David",
        email: "david123@gmail.com",
        number: "999 999 0000",
        status: "Active",
    },
    {
        id: 3,
        organization: "United Nations Organization",
        person: "David",
        email: "david123@gmail.com",
        number: "999 999 0000",
        status: "Active",
    },
    {
        id: 4,
        organization: "United Nations Organization",
        person: "David",
        email: "david123@gmail.com",
        number: "999 999 0000",
        status: "Active",
    },
    {
        id: 5,
        organization: "United Nations Organization",
        person: "David",
        email: "david123@gmail.com",
        number: "999 999 0000",
        status: "Active",
    }
]

const Organization = () => {
    const classes = useStyle();
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [Id, setId] = useState(false);

    const handleClickOpen = (id) => {
        setOpen(true);
        // setId(id);
    };

    const handleUpdateClickOpen = (id) => {
        setOpenUpdate(true)
        setId(id);
    }

    const handleClose = () => {
        setOpen(false);
        setOpenUpdate(false)
    };

    return (
        <div>
            <CreateOrganization
                open={open}
                handleClose={handleClose}
                id={Id}
                // oraganization={oraganizationList}
                
            />

            <UpdateOrganization 
                 openUpdate={openUpdate}
                 handleClose={handleClose}
                 id={Id}
            />
            <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>

            <Paper className={classes.root}>
                <Box className="mt-3 mb-5" display="flex" alignItems="center">
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
                        <Button><FilterListIcon /></Button>
                        <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                            <AddIcon className="mr-2" />Add Organization
                        </Button>
                    </div>
                </Box>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Organization</TableCell>
                            <TableCell align="left">Contact Person</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Number</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {oraganizationList.map(row => (
                            <TableRow key={row.id}>
                                <TableCell scope="row">{row.id}</TableCell>
                                <TableCell align="left">{row.organization}</TableCell>
                                <TableCell align="left">{row.person}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.number}</TableCell>
                                <TableCell align="left">{row.status} </TableCell>
                                <TableCell align="right"><Button variant="contained" color="secondary" onClick={() => handleUpdateClickOpen(row.id)}>View</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination count={10} />
                </Box>
            </Paper>

        </div>
    )
}

export default Organization
