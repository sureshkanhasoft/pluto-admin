import React, { useState, useEffect } from 'react';
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
    Box,Select,MenuItem
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import CreateOrganization from './CreateOrganization';
import UpdateOrganization from './UpdateOrganization';
import axios from 'axios';
import Config from '../../../src/config/config';
import Typography from '@material-ui/core/Typography';

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
    const [searchData, setSearchData] = useState({ search: "" });
    const [responseData, setResponseData] = useState([]);
    const [page, setPage] = React.useState(1);

    const handleClickOpen = (id) => {
        setOpen(true);
    };

    const handleUpdateClickOpen = (id) => {
        setOpenUpdate(true)
        setId(id);
    }

    const handleClose = () => {
        setOpen(false);
        setOpenUpdate(false)
    };

    const handleChange = (event, value) => {
        console.log("valuevalue", value)
        setPage(value);
        setTimeout(getData(value), 2000);
    };

    const handleSearchChange = (event) => {
        setSearchData({ ...searchData, [event.target.name]: event.target.value });
    }

    const handleClickSearch = (event, value) => {
        console.log("searchData", searchData.search);
        console.log("page", page);
        setTimeout(getData(page, searchData.search), 1000);
    };

    const getData = async (pageNo = 1, search = '', status = "Active") => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        axios.get(`${Config.API_URL}api/organization/organization-list?search=${search}&status=${status}&page=${pageNo}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data;
            setResponseData(response.data.data);
        }).catch(error => {
            console.log("error.message", error.message);
        });
    }

    useEffect(() => {
        getData();
    }, []);

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
                    <div onClick={handleClickSearch} className="icon">
                        <i className="fa fa-play" />Search
                    </div>
                    <div className={classes.search} >
                        <div onClick={handleClickSearch} className={classes.searchIcon}>
                            <SearchIcon onClick={handleClickSearch} />
                        </div>
                        <InputBase name="search"
                            placeholder="Search…" onChange={handleSearchChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className="ml-5">
                        <Button><FilterListIcon />
                        {/* <Select
                                label="Trust Name"
                                name="trust"
                            >
                                <MenuItem value="">
                                    Select  Status
                                </MenuItem>
                                <MenuItem value="Ana Care Hospital">Ana Care Hospital</MenuItem>
                                <MenuItem value="Apex Care Hospital">Apex Care Hospital</MenuItem>
                            </Select> */}
                            </Button>
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
                        {responseData?.data?.map(row => (
                            <TableRow key={row.id}>
                                <TableCell scope="row">{row.id}</TableCell>
                                <TableCell align="left">{row.first_name} {row.lsst_name}</TableCell>
                                <TableCell align="left">{row.contact_person_name}</TableCell>
                                <TableCell align="left">{row.email}</TableCell>
                                <TableCell align="left">{row.contact_no}</TableCell>
                                <TableCell align="left">{row.status} </TableCell>
                                <TableCell align="right"><Button variant="contained" color="secondary" onClick={() => handleUpdateClickOpen(row.id)}>View</Button></TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>

                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    {/* <Typography>Page: {page}</Typography> */}
                    <Pagination onChange={handleChange} page={page} showFirstButton showLastButton count={responseData?.last_page} />
                </Box>
            </Paper>

        </div>
    )
}

export default Organization
