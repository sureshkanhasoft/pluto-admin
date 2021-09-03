import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    InputBase,
    // Button,
    Box,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import { Link, NavLink } from "react-router-dom";
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { getBooking } from '../../store/action';
import history from '../../utils/HistoryUtils';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
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

    statusButton: {
        display: "flex",
        alignItems: "center",
        background: " #184a7b",
        borderRadius: 4,
        overflow: "hidden",
        marginBottom: 16,
        '& > .btn': {
            margin: theme.spacing(0),
            width: 140,
            background: "transparent",
            color: "#8dbef0",
            height: "47px",
            boxShadow: "none",
            borderRadius: 0,
            "&.active": {
                background: "#ff8b46",
                color: "#fff",
            },
            "&:hover": {
                background: "#f69d68",
                color: "#fff",
            }
        },
    },
}))


const ViewBooking = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [searchData, setSearchData] = useState({ search: "" });

    const { bookingItem, loading } = useSelector(state => state.booking)

    const getBookingList = (pageNo = 1, search = '') => {
        dispatch(getBooking({ pageNo, search }))
    }

    const onhandlClick = (id) => {
        history.push(`${match.url}/${id}/detail`)
    }

    const handleChangePage = (event, value) => {
        setPage(value);
        setTimeout(getBookingList(value), 2000);
    };

    const handleSearchChange = (event) => {
        const d1 = event.target.value
        if (d1) {
            setTimeout(getBookingList(page, d1), 100);
        } else {
            setTimeout(getBookingList(page, ""), 100);
        }
        setSearchData({ ...searchData, [event.target.name]: event.target.value });

    }

    const handleClickSearch = (event, value) => {
        setTimeout(getBookingList(page, searchData.search), 1000);
    };

    useEffect(() => {
        getBookingList()
    }, [])
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>
            <Paper className={`${classes.root} mb-6`}>
                <Box className="mb-5" display="flex" alignItems="center">
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
                        <Link to={`${match.url}/create`} className="btn btn-secondary">
                            <AddIcon className="mr-2" />Add Booking
                        </Link>
                    </div>
                </Box>
                <Box className={classes.statusButton}>
                    <NavLink to="/" className="btn active">Created</NavLink>
                    {/* <NavLink to="/admin/bookings/1" className="btn">Confirmed</NavLink>
                    <NavLink to="/admin/bookings/1" className="btn">Cancel</NavLink> */}
                </Box>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Trust name</TableCell>
                            <TableCell align="left">Ward Name</TableCell>
                            <TableCell align="left">Grade</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Shift time</TableCell>
                            <TableCell align="left">Status</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bookingItem?.data?.data && bookingItem?.data?.data.map((row, index) => (
                                <TableRow key={index}>
                                    <TableCell scope="row">{row.id}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.ward_name}</TableCell>
                                    <TableCell align="left">{row.grade_name}</TableCell>
                                    <TableCell align="left">{row.date}</TableCell>
                                    <TableCell align="left">{row.start_time} - {row.end_time}</TableCell>
                                    <TableCell align="left">{row.status} </TableCell>
                                    <TableCell align="right">
                                        <Link to="#" onClick={() => onhandlClick(row.id)} className="btn btn-secondary" >View</Link>
                                    </TableCell>
                                </TableRow>
                            ))}
                        {
                            !bookingItem?.data &&
                            <TableRow>
                                <TableCell scope="row" colSpan="8">
                                    <div className="" align="center">Sorry, booking  not available!</div>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination onChange={handleChangePage} page={page} count={bookingItem?.last_page} showFirstButton showLastButton />
                </Box>

            </Paper>
        </>
    )
}

export default ViewBooking
