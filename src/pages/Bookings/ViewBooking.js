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
    FormControl, Select, MenuItem
} from '@material-ui/core';
import { Link, NavLink } from "react-router-dom";
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { changeShiftStatus, getBooking } from '../../store/action';
import history from '../../utils/HistoryUtils';
import Notification from '../../components/Notification/Notification';

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
    const tabList = ['CREATED', 'CONFIRMED', 'CANCEL'];
    const [page, setPage] = React.useState(1);
    const [searchData, setSearchData] = useState({ search: "" });
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
    const [activeIndex, setActiveIndex] = useState(0);
    const [bookingNotify, setBookingNotify] = useState(false);

    const { bookingItem, loading, shiftStatusSuccess } = useSelector(state => state.booking)

    const [bookingStatus, setBookingStatus] = useState({
        booking_id: "",
        status: ""
    });

    const getBookingList = (pageNo = 1, search = '', status) => {
        dispatch(getBooking({ pageNo, search, status }))
    }

    const onhandlClick = (id) => {
        history.push(`${match.url}/${id}/detail`)
    }

    const handleChangePage = (pageNo) => {
        let status = tabList[activeIndex];
        setPage(page);
        setTimeout(getBookingList(pageNo,searchData.search,status), 2000);
    };

    const handleSearchChange = (event) => {
        const d1 = event.target.value
        let status = tabList[activeIndex];
        if (d1) {
            setTimeout(getBookingList(page, d1, status), 100);
        } else {
            setTimeout(getBookingList(page, "", status), 100);
        }
        setSearchData({ ...searchData, [event.target.name]: event.target.value });

    }

    const handleClickSearch = (event, value) => {
        setTimeout(getBookingList(page, searchData.search), 1000);
    };

    useEffect(() => {
        getBookingList()
    }, [])

    const tabChange = (index, list) => {
        setSearchData({ ...searchData, search: '' });
        setActiveIndex(index)
        getBookingList(page, "", list)

    }

    const handleBookingStatus = (event, id) => {
        setBookingStatus({ ...bookingStatus, [event.target.name]: event.target.value, booking_id: id });
    };

    useEffect(() => {
        if (bookingStatus.booking_id !== "") {
            dispatch(changeShiftStatus(bookingStatus))
            setBookingNotify(true)
            setTimeout(() => {
                getBookingList()
            }, 4000);
        }

    }, [bookingStatus])

    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {bookingNotify && shiftStatusSuccess?.message &&
                <Notification
                    data={shiftStatusSuccess?.message}
                    status="success"
                />
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
                            value={searchData.search}
                        />
                    </div>
                    {
                        (staffDetail !== "Finance") &&
                        <div className="ml-5">
                            <Link to={`${match.url}/create`} className="btn btn-secondary">
                                <AddIcon className="mr-2" />Add Booking
                            </Link>
                        </div>
                    }
                </Box>
                <Box className={classes.statusButton}>
                    {
                        tabList.map((list, index) => (
                            <span style={{textTransform:"capitalize"}} className={`btn ${activeIndex === index ? "active" : ""}`} key={index} onClick={() => tabChange(index, list)}>{list.toLowerCase()}</span>
                        ))
                    }
                    {/* <NavLink to="/admin/bookings/1" className="btn">Confirmed</NavLink>
                    <NavLink to="/admin/bookings/1" className="btn">Cancel</NavLink> */}
                </Box>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Trust Name</TableCell>
                            <TableCell align="left">Hospital Name</TableCell>
                            <TableCell align="left">Ward Name</TableCell>
                            <TableCell align="left">Grade</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Shift Time</TableCell>
                            {/* <TableCell align="left">Status</TableCell> */}
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bookingItem?.data?.data && bookingItem?.data?.data.map((row, index) => {
                                const dateFormate =  row.date.toString().split("-").reverse().join("-")
                                return (
                                    <TableRow key={index}>
                                    <TableCell scope="row">{bookingItem?.data?.from + index}</TableCell>
                                    <TableCell align="left">{row.name}</TableCell>
                                    <TableCell align="left">{row.hospital_name}</TableCell>
                                    <TableCell align="left">{row.ward_name}</TableCell>
                                    <TableCell align="left">{row.grade_name}</TableCell>
                                    <TableCell align="left" style={{whiteSpace: "nowrap"}}>{dateFormate}</TableCell>
                                    <TableCell align="left">{row.start_time} <br/> {row.end_time}</TableCell>
                                    {/* <TableCell align="left">
                                        <FormControl variant="outlined" className={classes.formControl1} fullWidth>
                                            <Select
                                                value={row?.status || ""}
                                                name="status"
                                                onChange={(e) => handleBookingStatus(e, row.id)}
                                                disabled = {row.status === "CANCEL"? true: false}
                                            >
                                                {
                                                    row.status === "CREATED" && <MenuItem value="CREATED" disabled>Created</MenuItem>
                                                }
                                                {
                                                    row.status === "CONFIRMED" && <MenuItem value="CONFIRMED" disabled >Confirmed</MenuItem>
                                                }
                                                <MenuItem value="CANCEL">Cancel</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </TableCell> */}
                                    <TableCell align="right">
                                        <Link to="#" onClick={() => onhandlClick(row.id)} className="btn btn-secondary" >View</Link>
                                    </TableCell>
                                </TableRow>
                                )
                               
                                })}
                        {
                            !bookingItem?.data &&
                            <TableRow>
                                <TableCell scope="row" colSpan="8">
                                    <div className="" align="center">Sorry, booking not available!</div>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination onChange={()=>handleChangePage(bookingItem?.data?.current_page)} page={page} count={bookingItem?.last_page} showFirstButton showLastButton />
                </Box>
            </Paper>
        </>
    )
}

export default ViewBooking
