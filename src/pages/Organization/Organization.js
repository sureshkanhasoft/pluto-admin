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
    Box,
    Menu,
    RadioGroup,
    FormControlLabel,
    Radio,
    FormLabel
} from '@material-ui/core';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import FilterListIcon from '@material-ui/icons/FilterList';
import CreateOrganization from './CreateOrganization';
import UpdateOrganization from './UpdateOrganization';
import { useDispatch, useSelector } from 'react-redux';
import { getOrganization } from '../../store/action';
// import Typography from '@material-ui/core/Typography';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    filterBox:{
        padding:12
    },
    radioGroup: {
        flexDirection: "row",
    },
    table: {
        minWidth: 700,
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
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
        zIndex: 99,
        cursor: "pointer"
    },
    searchIcondet: {
        cursor: "pointer"
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing(),
        paddingRight: theme.spacing(),
        paddingBottom: theme.spacing(),
        paddingLeft: theme.spacing(1),
        transition: theme.transitions.create('width'),
        width: '100%',
        borderBottom: "1px solid #ccc",
        [theme.breakpoints.up('md')]: {
            width: 200,
        },
    },
}))

const Organization = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [Id, setId] = useState(false);
    const [searchData, setSearchData] = useState({ search: "" });
    // const [responseData, setResponseData] = useState([]);
    const [page, setPage] = React.useState(1);
    const { organizationList, loading } = useSelector(state => state.createOrganization)
    console.log('organizationList: ', organizationList);
    // const { createOrgErrors, createOrgSuccess } = useSelector(state => state.organizationReducer)

    const [anchorEl, setAnchorEl] = React.useState(null);
    const openMenu = Boolean(anchorEl);

    const handleClickOpen = (id) => {
        setOpen(true);
    };

    const handleUpdateClickOpen = (id) => {
        setOpenUpdate(true)
        setId(id);
    }

    const handleClose = () => {
        setOpen(false);
        getData();
        setOpenUpdate(false)
    };

    const handleChange = (event, value) => {
        setPage(value);
        setTimeout(getData(value), 2000);
    };

    const handleSearchChange = (event) => {
        setSearchData({ ...searchData, [event.target.name]: event.target.value });
    }

    const handleClickSearch = (event, value) => {
        setTimeout(getData(page, searchData.search), 1000);
    };

    const getData = (pageNo = 1, search = '', status = "") => {
        dispatch(getOrganization({ pageNo, search, status }))
    }

    useEffect(() => {
        getData();
    }, []);

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleMenuClose = () => {
        setAnchorEl(null);
      };

    return (
        <div>
            <CreateOrganization
                open={open}
                handleClose={handleClose}
            />

            <UpdateOrganization
                openUpdate={openUpdate}
                handleClose={handleClose}
                id={Id}
            />
            <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>
            <Paper className={classes.root}>
                <Box className="mt-3 mb-5" display="flex" alignItems="center">
                    <SearchIcon className={classes.searchIcondet} onClick={handleClickSearch} />
                    <div className={classes.search} >
                        <InputBase name="search"
                            placeholder="Search…" onChange={handleSearchChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className="ml-5">
                        <Button onClick={handleMenu}>
                            <FilterListIcon />
                        </Button>
                        <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                getContentAnchorEl={null}
                                anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                                open={openMenu}
                                onClose={handleMenuClose}
                            >
                                <div>
                                <Box className={classes.filterBox} >
                                    <FormLabel component="legend">Status</FormLabel>
                                    <RadioGroup name="status" className={classes.radioGroup}>
                                        <FormControlLabel value="Active" control={<Radio />} label="Active" />
                                        <FormControlLabel value="Inactive" control={<Radio />} label="Deactive" />
                                    </RadioGroup>
                                    <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                        Filter
                                    </Button>
                                </Box>
                                </div>
                            </Menu>
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
                        {
                            organizationList.data && organizationList.data.map(row => {
                                return (<TableRow key={row.id}>
                                    <TableCell scope="row">{row.id}</TableCell>
                                    <TableCell align="left">{row.organization_name}</TableCell>
                                    <TableCell align="left">{row.contact_person_name}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.contact_number}</TableCell>
                                    <TableCell align="left">{row.status} </TableCell>
                                    <TableCell align="right"><Button variant="contained" color="secondary" onClick={() => handleUpdateClickOpen(row.id)}>View</Button></TableCell>
                                </TableRow>
                                )

                            })
                        }
                    </TableBody>
                </Table>

                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination onChange={handleChange} page={page} showFirstButton showLastButton count={organizationList?.last_page} />
                </Box>
            </Paper>

            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }

        </div>
    )
}

export default Organization
