import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Box, InputBase,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Backdrop,
    CircularProgress, TextField,
    Button,
    Grid, Select, FormControl, MenuItem, InputLabel,
    FormGroup, FormControlLabel, Checkbox, FormLabel,
} from '@material-ui/core';
import axios from 'axios';
import apiConfigs from '../../config/config';
import { Link, NavLink } from "react-router-dom";
import { Pagination } from '@material-ui/lab';
import SearchIcon from '@material-ui/icons/Search';
import CloudDownload from '@material-ui/icons/CloudDownload';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import { useDispatch, useSelector } from 'react-redux';
import { changeShiftStatus, getReport } from '../../store/action';
import history from '../../utils/HistoryUtils';
import Notification from '../../components/Notification/Notification';
import DetailBooking from './DetailBooking';
import ViewBooking from './ViewBooking';

import {
    Switch,
    Route,
    Redirect
} from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    formControl: {
        width: "20%"
    },
    table: {
        minWidth: 700,
    },
    searchIcondet: {
        margin: "14px",
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


const ViewReports = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const tabList = ["COMPLETED"];
    const [page, setPage] = React.useState(1);
    const [searchData, setSearchData] = useState({ search: "" });
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
    const [activeIndex, setActiveIndex] = useState(0);
    const [bookingNotify, setBookingNotify] = useState(false);

    const { bookingItem, loading, shiftStatusSuccess } = useSelector(state => state.booking)


    const [trust, setTrust] = useState([])

    const [data, setData] = useState({
        start_date: "",
        end_date: "",
        trust_id: "",
    })

    const getBookingList = (pageNo = 1) => {
        dispatch(getReport({ pageNo, data }))
    }

    const getBookingDownload = (pageNo = 1) => {
        dispatch(getReport({ pageNo, data }))
    }

    const onhandlClick = (id) => {
        history.push(`${match.url}/${id}/detail`)
    }

    const handleChangePage = (pageNo, value) => {
        let status = tabList[activeIndex];
        setPage(value);
        setTimeout(getBookingList(value, searchData.search, status), 2000);
        // setTimeout(getBookingList(value, searchData.search, status), 2000);
    };


    const getTrust = async () => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-trusts`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setTrust(response.data)
            setTimeout(function () {
            }, 2000)
        }).catch(error => {
            console.log('error: ', error);
        })
    }
    const handleClickSearch = (event, value) => {
        setTimeout(getBookingList(page, searchData.search), 1000);
    };

    const handleClickDownload = async (event, value) => {
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/download-report-completed-booking?start_date=${data.start_date}&end_date=${data.end_date}&trust_id=${data.trust_id}&act=export_csv`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const url = response.data.data;
            var link = document.createElement("a");
            link.download = "Candidate.csv";
            link.href = url;
            link.target = "_blank";
            link.click();
        }).catch(error => {
            console.log('error: ', error);
        })

        setTimeout(getBookingDownload(searchData.search), 1000);
    };

    const handleReset = () => {
        let data = {
            start_date: "",
            end_date: "",
            trust_id: "",
        }
        setData(data)
        dispatch(getReport({ pageNo:1, data }))
    }
    
    useEffect(() => {
        getBookingList()
        getTrust();
    }, [])


    const trustHandleChange = (event) => {
        // console.log(event.target.value, " event.target.value")
        // console.log(event.target.name, " event.target.name")
        setData({ ...data, [event.target.name]: event.target.value });
    }
    return (
        <>
         <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>
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
            {/* <Switch>
                 <Route exact path={`${match.path}`} component={ViewBooking} />
                <Route exact path={`${match.url}/:id/detail`} key={uniqId} component={DetailBooking} />
                <Redirect from="" to={`${match.url}`} />
            </Switch> */}
           
            <Paper className={`${classes.root} mb-6`}>
<Box className="mb-5" display="flex" alignItems="center">

    <div className={classes.search} >
        <TextField
            id="date"
            label="Start Date"
            type="date"
            name="start_date"
            value={data.start_date}
            className={classes.textField}
            variant="outlined"
            onChange={trustHandleChange}
            InputLabelProps={{
                shrink: true,
            }}
        />
        <TextField
            id="date"
            value={data.end_date}
            label="End Date"
            type="date"
            name="end_date"
            className={classes.textField}
            variant="outlined"
            onChange={trustHandleChange}
            InputLabelProps={{
                shrink: true,
            }}
        />

        <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Trust Name</InputLabel>
            <Select
                value={data.trust_id}
                label="Trust Name"
                name="trust_id"
                onChange={trustHandleChange}
            >
                <MenuItem value="">
                    Select Trust
                </MenuItem>
                {
                    trust?.data && trust?.data?.map((trustList, index) => {
                        return (
                            <MenuItem value={trustList.id} key={index}>{trustList.name}</MenuItem>
                        )
                    })
                }
            </Select>
        </FormControl>

        <Button variant="contained" color="secondary" className={classes.searchIcondet} onClick={handleClickSearch} >Search</Button>
        <Button variant="contained" color="secondary" onClick={handleReset} >Reset</Button>
        <Button variant="contained" color="secondary" className={classes.searchIcondet} onClick={handleClickDownload}>
                                <span className="material-icons mr-2">download</span> Download
                            </Button>
    </div>
   
    {/* {
        (staffDetail !== "Finance") &&
        <div className="ml-5">
            <Link to={`${match.url}/create`} className="btn btn-secondary">
                <AddIcon className="mr-2" />Add Booking
            </Link>
        </div>
    } */}
</Box>
{/* <Box className={classes.statusButton}>
    {
        tabList.map((list, index) => (
            <span style={{textTransform:"capitalize"}} className={`btn ${activeIndex === index ? "active" : ""}`} key={index} onClick={() => tabChange(index, list)}>{list.toLowerCase()}</span>
        ))
    }
</Box> */}
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
            <TableCell align="right"></TableCell>
        </TableRow>
    </TableHead>
    <TableBody>
        {
            bookingItem?.data?.data && bookingItem?.data?.data.map((row, index) => {
                const dateFormate = row.date.toString().split("-").reverse().join("-")
                return (
                    <TableRow key={index}>
                        <TableCell scope="row">{bookingItem?.data?.from + index}</TableCell>
                        <TableCell align="left">{row.name}</TableCell>
                        <TableCell align="left">{row.hospital_name}</TableCell>
                        <TableCell align="left">{row.ward_name}</TableCell>
                        <TableCell align="left">{row.grade_name}</TableCell>
                        <TableCell align="left" style={{ whiteSpace: "nowrap" }}>{dateFormate}</TableCell>
                        <TableCell align="left">{row.start_time} <br /> {row.end_time}</TableCell>
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
    <Pagination onChange={handleChangePage} page={page} count={bookingItem?.data?.last_page} showFirstButton showLastButton />
</Box>
</Paper>
        </>
    )
}

export default ViewReports
