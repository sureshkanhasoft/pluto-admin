import React, { useEffect, useState } from 'react';
import {
    makeStyles, Chip, Paper, Tab, Tabs, Box,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    IconButton,
    MenuItem,
    Button,
    Checkbox, FormControl, Select, Menu,
} from "@material-ui/core";
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import apiConfigs from '../../config/config';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import RemoveIcon from '@material-ui/icons/Remove';
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import { changePaymentStatus, confirmBooking, userInvitation } from '../../store/action';
import history from '../../utils/HistoryUtils';
import Notification from '../../components/Notification/Notification';

const useStyle = makeStyles((theme) => ({

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    table: {
        minWidth: 700,
    },
    menuItem: {
        fontSize: 14,
        "& svg": {
            width: 16,
            height: "auto"
        }
    },
    viewBtn: {
        display: "flex",
        alignItems: "center",
        width: "max-content",
        cursor: "pointer"
    },

    tabChip: {
        padding: 0,
        height: 26,
        '& .MuiChip-label': {
            padding: '0 8px',
            minWidth: 26,
        }
    },
    downloadButton: {
        position: "absolute",
        right: 16,
        top: 16
    },
    invitationButton: {
        position: "absolute",
        right: 200,
        top: 16
    },
    formControl1: {
        width: 140,
        display: "flex",
        border: "none",
        background: "#184a7b",
        color: "#fff",
        padding: '4px 8px',
        paddingLeft: 12,
        borderRadius: 6,
        "& .MuiInputBase-root": {
            color: "#fff",
            "&:before": {
                border: "none !important"
            }
        },
        "& svg": {
            fill: "#fff"
        }
    }
}))

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`simple-tabpanel-${index}`}
            aria-labelledby={`simple-tab-${index}`}
            {...other}
        >
            {value === index && (
                <Box p={3}>
                    <div>{children}</div>
                </Box>
            )}
        </div>
    );
}

function a11yProps(index) {
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpanel-${index}`,
    };
}

const CandidatesList = ({ bookingDetail, booking_id, getBookingDetail, setConfirmBtn }) => {

    const classes = useStyle();
    const dispatch = useDispatch();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [anchorElRowInfo, setAnchorElRowInfo] = React.useState(null);
    const [getSigneeid, setGetSigneeid] = React.useState();
    const open = Boolean(anchorEl);
    const [signeeSizeMsg, setSigneeSize] = useState("")
    const [confirmNotify, setConfirmNotify] = useState(false);
    const [selected, setSelected] = React.useState([]);
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
    const loginDetail = JSON.parse(localStorage.getItem("loginUserInfo"));
    const { confirmBookingSuccess, confirmBookingError, invitationSuccess, shiftStatusSuccess } = useSelector(state => state.booking)
    console.log(confirmBookingSuccess , "confirmBookingSuccess")
    console.log(confirmBookingError , "confirmBookingError")

    // for confirmed past date checking
    var GivenDate = bookingDetail && bookingDetail?.data?.date;
    GivenDate = new Date(GivenDate);
    var CurrentDate = new Date();
    const pastDate = bookingDetail?.data?.is_past
    // const pastDate = GivenDate < CurrentDate ? true : false

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const handleChange = (event, newValue) => {
        setValue(newValue);
        setSigneeSize('');
    };

    const [bookingData, setBookingData] = useState({
        booking_id: booking_id,
        signee_id: "",
        status: ""
    })
    const handleMenuItem = (data, signeeId) => {
        setBookingData({ ...bookingData, status: data, signee_id: signeeId })
        setAnchorEl(null);
    };
    useEffect(() => {
        if (bookingData.status !== "") {
            dispatch(confirmBooking(bookingData))
            setConfirmNotify(true)
            setTimeout(() => {
                getBookingDetail()
            }, 4000);
        }

    }, [bookingData])

    const [pdfData, setPdfData] = useState({
        booking_id: booking_id,
        signee_id: [],
    })

    const [paymentStatus, setPaymentStatus] = useState({
        booking_id: booking_id,
        signee_id: "",
        payment_status: ""
    });

    const handlePaymentStatus = (event, sId) => {
        setPaymentStatus({ ...paymentStatus, [event.target.name]: event.target.value, signee_id: sId });
    };

    useEffect(() => {
        if (paymentStatus.payment_status !== "") {
            dispatch(changePaymentStatus(paymentStatus))
            setTimeout(() => {
                getBookingDetail()
            }, 4000);
        }
    }, [paymentStatus])

    const signeePage = (e, signeeId) => {
        e.preventDefault();
        const adminUrl = loginDetail.role === "ORGANIZATION" ? 'admin' : 'staff'
        history.push(`/${(adminUrl).toLowerCase()}/candidate/${signeeId}/detail`)
    }


    const downloadPdf = async () => {
        if (pdfData.signee_id.length === 0) {
            setSigneeSize("Please selected at least one candidate to download pdf");
            return;
        }
        const getToken = localStorage.getItem("token") ? localStorage.getItem("token").replace(/['"]+/g, '') : "";
        await axios.post(`${apiConfigs.API_URL}api/organization/user/pdf`, pdfData, {
            headers: {
                'Authorization': getToken ? `Bearer ${getToken}` : "",
            },
            responseType: 'blob',
        }).then(response => {
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', 'Candidate.pdf');
            document.body.appendChild(link);
            link.click();
        }).catch(error => {
            console.log('error: ', error);
        });
    }

    const handleClose = (data) => {
        setAnchorEl(null);
        setAnchorElRowInfo(null);
    };

    const handleMenu = (event, id, row) => {
        event.preventDefault();
        setAnchorEl(event.currentTarget);
        setAnchorElRowInfo(row);
        setGetSigneeid(id);
        setConfirmBtn((row.status === "CONFIRMED" ? true :false))
    };

    const usersInvitation = () => {
        dispatch(userInvitation(pdfData))
        setConfirmNotify(true)
        setTimeout(() => {
            window.location.reload()
        }, 4000);
    }

    const handleCheckboxClick = (event) => {
        const specialityData = JSON.parse(JSON.stringify(pdfData));
        const isChecked = (event.target.checked);
        // console.log('isChecked: ', isChecked);
        if (isChecked) {
            specialityData.signee_id.push(parseFloat(event.target.value));
            setPdfData(specialityData)
        } else {
            const newData = (specialityData.signee_id).filter(item => item !== parseFloat(event.target.value));
            specialityData.signee_id = newData;
            setPdfData(specialityData)
        }

    };

    useEffect(() => {
        bookingDetail?.data?.matching && bookingDetail?.data?.matching.filter(item => item.signee_booking_status === "CONFIRMED").map((list, index) => {
            return setConfirmBtn(true)
        })
    }, [bookingDetail?.data?.matching])

    useEffect(() => {
        bookingDetail?.data?.interested && bookingDetail?.data?.interested.filter(item => item.signee_booking_status === "CONFIRMED").map((list, index) => {
            return setConfirmBtn(true)
        })
    }, [bookingDetail?.data?.interested])


    return (
        <>
        {confirmBookingError && confirmBookingError?.message &&

                <Notification
                    data={confirmBookingError.message}
                    status="error"
                />
            }
              {signeeSizeMsg &&
                <Notification
                    data={signeeSizeMsg}
                    status="error"
                />
            }
            {confirmNotify && (invitationSuccess?.message) &&
                <Notification
                    data={invitationSuccess?.message}
                    status="success"
                />
            }

            {
                (pastDate !== true) ?
                    <Paper className={`mb-6`} style={{ position: "relative" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab
                                label={<span className={classes.tabLabel}>Matching Candidates {bookingDetail?.data?.matching.length > 0 ? <Chip label={bookingDetail?.data?.matching.filter(item => item.compliance_status === "COMPLIANT").length} color="primary" className={classes.tabChip} /> : ""}</span>}
                                {...a11yProps(0)} />
                            <Tab label=
                                {<span className={classes.tabLabel}>Interested Candidates {bookingDetail?.data?.interested.length > 0 ? <Chip label={bookingDetail?.data?.interested.length} color="primary" className={classes.tabChip} /> : ""}</span>}
                                {...a11yProps(1)} />
                        </Tabs>

                        {
                            pdfData.signee_id.length > 0 && <Button variant="contained" color="secondary" onClick={downloadPdf} className={classes.downloadButton}>
                                <span className="material-icons mr-2">download</span> Download PDF
                            </Button>
                        }

                        <TabPanel value={value} index={0}>
                            {
                                pdfData.signee_id.length > 0 && bookingDetail?.data?.status === 'CREATED' && <Button variant="contained" color="secondary" onClick={usersInvitation} className={classes.invitationButton}>
                                    <span className="material-icons mr-2">mail</span> Send invitation
                                </Button>
                            }
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: 70 }}></TableCell>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Contact Number</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Booking Status</TableCell>
                                        {
                                            (bookingDetail?.data?.status === "CONFIRMED" && pastDate === true) &&
                                            <TableCell align="left">Payment Status</TableCell>
                                        }
                                        <TableCell align="left">Detail</TableCell>
                                        {
                                            (pastDate !== true) &&
                                            <TableCell align="right">Action</TableCell>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookingDetail?.data?.matching && bookingDetail?.data?.matching.filter(item => item.compliance_status === "COMPLIANT").map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        return (
                                            <TableRow key={index}>
                                                <TableCell scope="row">
                                                    <Checkbox
                                                        value={row.signeeId}
                                                        checked={pdfData.signee_id.includes(row.signeeId)}
                                                        onClick={event =>
                                                            handleCheckboxClick(event, row.signeeId)
                                                        }
                                                        className="selectCheckbox"

                                                    />
                                                </TableCell>
                                                <TableCell scope="row">{index + 1}</TableCell>
                                                <TableCell align="left">{row.first_name} {row.last_name}</TableCell>
                                                <TableCell align="left">{row.contact_number}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.signee_booking_status}</TableCell>
                                                {
                                                    (bookingDetail?.data?.status === "CONFIRMED" && pastDate === true) &&
                                                    <TableCell align="left">
                                                        <FormControl variant="standard" className={classes.formControl1}>
                                                            <Select
                                                                value={row.payment_status || ""}
                                                                name="payment_status"
                                                                onChange={(e) => handlePaymentStatus(e, row.signeeId)}
                                                                disabled={(staffDetail === "Compliance" || staffDetail === "Booking") ? true : false}
                                                            >
                                                                <MenuItem value="PAID">Paid</MenuItem>
                                                                <MenuItem value="UNPAID">Unpaid</MenuItem>
                                                                <MenuItem value="ONHOLD">On Hold</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                }

                                                <TableCell align="right">
                                                    <span onClick={(e) => signeePage(e, row.signeeId)} className={classes.viewBtn}>
                                                        <VisibilityIcon className="mr-2" />view
                                                    </span>
                                                </TableCell>
                                                {
                                                    (row.signee_booking_status !== "REJECTED" && row.signee_booking_status !== "CANCEL") ?
                                                        (pastDate !== true) &&
                                                        <TableCell align="right">
                                                            <IconButton onClick={(event) => handleMenu(event, row.signeeId, row)}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        </TableCell> :
                                                        <TableCell align="right">
                                                            <IconButton disabled>
                                                                {/* <RemoveIcon /> */}
                                                            </IconButton>
                                                        </TableCell>
                                                }
                                            </TableRow>
                                        )

                                    })}

                                    {
                                        bookingDetail?.data?.matching.length === 0 &&
                                        <TableRow>
                                            <TableCell colSpan="9" align="center">No records found</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TabPanel>
                        <TabPanel value={value} index={1}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: 70 }}></TableCell>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Contact Number</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Booking Status</TableCell>
                                        {
                                            (bookingDetail?.data?.status === "CONFIRMED" && pastDate === true) &&
                                            <TableCell align="left">Payment Status</TableCell>
                                        }
                                        <TableCell align="left">Detail</TableCell>
                                        {
                                            (pastDate !== true) &&
                                            <TableCell align="right">Action</TableCell>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookingDetail?.data?.interested && bookingDetail?.data?.interested.map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        // const labelId = `enhanced-table-checkbox-${index}`;
                                        return (
                                            <TableRow key={index}>
                                                <TableCell scope="row">
                                                    <Checkbox
                                                        value={row.signeeId}
                                                        checked={pdfData.signee_id.includes(row.signeeId)}
                                                        onClick={event =>
                                                            handleCheckboxClick(event, row.signeeId)
                                                        }
                                                        className="selectCheckbox"
                                                        name="signee_id"

                                                    />
                                                </TableCell>
                                                <TableCell scope="row">{index + 1}</TableCell>
                                                <TableCell align="left">{row.first_name} {row.last_name}</TableCell>
                                                <TableCell align="left">{row.contact_number}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.signee_booking_status}</TableCell>
                                                {
                                                    (bookingDetail?.data?.status === "CONFIRMED" && pastDate === true) &&
                                                    <TableCell align="left">
                                                        <FormControl variant="standard" className={classes.formControl1}>
                                                            <Select
                                                                value={row.payment_status || ""}
                                                                name="payment_status"
                                                                onChange={(e) => handlePaymentStatus(e, row.signeeId)}
                                                                disabled={(staffDetail === "Compliance" || staffDetail === "Booking") ? true : false}
                                                            >
                                                                <MenuItem value="PAID">Paid</MenuItem>
                                                                <MenuItem value="UNPAID">Unpaid</MenuItem>
                                                                <MenuItem value="ONHOLD">On Hold</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                }

                                                <TableCell align="right">
                                                    <span onClick={(e) => signeePage(e, row.signeeId)} className={classes.viewBtn}>
                                                        <VisibilityIcon className="mr-2" />view
                                                    </span>
                                                </TableCell>
                                                {/* {
                                            (pastDate !== true) &&
                                            <TableCell align="right">
                                                <IconButton onClick={(event) => handleMenu(event, row.signeeId, row)}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            </TableCell>
                                        } */}
                                                {
                                                    (row.signee_booking_status !== "REJECTED" && row.signee_booking_status !== "CANCEL") ?
                                                        (pastDate !== true) &&
                                                        <TableCell align="right">
                                                            <IconButton onClick={(event) => handleMenu(event, row.signeeId, row)}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        </TableCell> :
                                                        <TableCell align="right">
                                                            <IconButton disabled>
                                                                {/* <RemoveIcon /> */}
                                                            </IconButton>
                                                        </TableCell>
                                                }

                                            </TableRow>
                                        )

                                    })}
                                    {
                                        bookingDetail?.data?.interested.length === 0 &&
                                        <TableRow>
                                            <TableCell colSpan="9" align="center">No records found</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TabPanel>
                    </Paper>
                    :

                    //for only completed tab
                    <Paper className={`mb-6`} style={{ position: "relative" }}>
                        <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                            <Tab
                                label={<span className={classes.tabLabel}>Candidates {bookingDetail?.data?.confirmed.length > 0 ? <Chip label={bookingDetail?.data?.confirmed.filter(item => item.compliance_status === "COMPLIANT").length} color="primary" className={classes.tabChip} /> : ""}</span>}
                                {...a11yProps(0)} />
                        </Tabs>

                        {
                            pdfData.signee_id.length > 0 && <Button variant="contained" color="secondary" onClick={downloadPdf} className={classes.downloadButton}>
                                <span className="material-icons mr-2">download</span> Download PDF
                            </Button>
                        }

                        <TabPanel value={value} index={0}>
                            <Table className={classes.table}>
                                <TableHead>
                                    <TableRow>
                                        <TableCell style={{ width: 70 }}></TableCell>
                                        <TableCell>Id</TableCell>
                                        <TableCell align="left">Name</TableCell>
                                        <TableCell align="left">Contact Number</TableCell>
                                        <TableCell align="left">Email</TableCell>
                                        <TableCell align="left">Booking Status</TableCell>
                                        {
                                            (bookingDetail?.data?.status === "CONFIRMED" && pastDate === true) &&
                                            <TableCell align="left">Payment Status</TableCell>
                                        }
                                        <TableCell align="left">Detail</TableCell>
                                        {
                                            (pastDate !== true) &&
                                            <TableCell align="right">Action</TableCell>
                                        }
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {bookingDetail?.data?.confirmed && bookingDetail?.data?.confirmed.filter(item => item.compliance_status === "COMPLIANT").map((row, index) => {
                                        const isItemSelected = isSelected(row.name);
                                        return (
                                            <TableRow key={index}>
                                                <TableCell scope="row">
                                                    <Checkbox
                                                        value={row.signeeId}
                                                        checked={pdfData.signee_id.includes(row.signeeId)}
                                                        onClick={event =>
                                                            handleCheckboxClick(event, row.signeeId)
                                                        }
                                                        className="selectCheckbox"

                                                    />
                                                </TableCell>
                                                <TableCell scope="row">{index + 1}</TableCell>
                                                <TableCell align="left">{row.first_name} {row.last_name}</TableCell>
                                                <TableCell align="left">{row.contact_number}</TableCell>
                                                <TableCell align="left">{row.email}</TableCell>
                                                <TableCell align="left">{row.signee_booking_status}</TableCell>
                                                {
                                                    (bookingDetail?.data?.status === "CONFIRMED" && pastDate === true) &&
                                                    <TableCell align="left">
                                                        <FormControl variant="standard" className={classes.formControl1}>
                                                            <Select
                                                                value={row.payment_status || ""}
                                                                name="payment_status"
                                                                onChange={(e) => handlePaymentStatus(e, row.signeeId)}
                                                                disabled={(staffDetail === "Compliance" || staffDetail === "Booking") ? true : false}
                                                            >
                                                                <MenuItem value="PAID">Paid</MenuItem>
                                                                <MenuItem value="UNPAID">Unpaid</MenuItem>
                                                                <MenuItem value="ONHOLD">On Hold</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                }

                                                <TableCell align="right">
                                                    <span onClick={(e) => signeePage(e, row.signeeId)} className={classes.viewBtn}>
                                                        <VisibilityIcon className="mr-2" />view
                                                    </span>
                                                </TableCell>
                                                {
                                                    (row.signee_booking_status !== "REJECTED" && row.signee_booking_status !== "CANCEL") ?
                                                        (pastDate !== true) &&
                                                        <TableCell align="right">
                                                            <IconButton onClick={(event) => handleMenu(event, row.signeeId, row)}>
                                                                <MoreVertIcon />
                                                            </IconButton>
                                                        </TableCell> :
                                                        <TableCell align="right">
                                                            <IconButton disabled>
                                                                {/* <RemoveIcon /> */}
                                                            </IconButton>
                                                        </TableCell>
                                                }
                                            </TableRow>
                                        )

                                    })}

                                    {
                                        bookingDetail?.data?.matching.length === 0 &&
                                        <TableRow>
                                            <TableCell colSpan="9" align="center">No records found</TableCell>
                                        </TableRow>
                                    }
                                </TableBody>
                            </Table>
                        </TabPanel>
                    </Paper>
            }


            {
                anchorEl &&
                <Menu
                    id="menu-appbar"
                    anchorEl={anchorEl}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                    open={open}
                    onClose={handleClose}
                >
                    {
                        anchorElRowInfo.signee_booking_status === "PENDING" &&
                        <MenuItem onClick={() => handleMenuItem('OFFER', anchorElRowInfo.signeeId)} className={classes.menuItem}><CheckIcon className="mr-2" />Offer</MenuItem>
                    }
                    {
                        anchorElRowInfo.signee_booking_status !== "CONFIRMED" && anchorElRowInfo.signee_booking_status === "ACCEPT" &&
                        <MenuItem onClick={() => handleMenuItem('CONFIRMED', anchorElRowInfo.signeeId)} className={classes.menuItem}><CheckIcon className="mr-2" />Confirm</MenuItem>
                    }
                    {
                        anchorElRowInfo.signee_booking_status !== "APPLY" &&
                        // anchorElRowInfo.signee_booking_status !== "OFFER" &&
                        anchorElRowInfo.signee_booking_status !== "CONFIRMED" &&
                        anchorElRowInfo.signee_booking_status !== "REJECTED" &&
                        <MenuItem onClick={() => handleMenuItem('CONFIRMED', anchorElRowInfo.signeeId)} className={classes.menuItem}><StarIcon className="mr-2" />Super Assign</MenuItem>
                    }
                    {
                        anchorElRowInfo.signee_booking_status !== "CONFIRMED" && anchorElRowInfo.signee_booking_status === "APPLY" &&
                        <MenuItem onClick={() => handleMenuItem('CONFIRMED', anchorElRowInfo.signeeId)} className={classes.menuItem}><StarIcon className="mr-2" />Accept</MenuItem>
                    }
                    {
                        anchorElRowInfo.signee_booking_status !== "REJECTED" &&
                        <MenuItem onClick={() => handleMenuItem('REJECTED', anchorElRowInfo.signeeId)} className={classes.menuItem}><CloseIcon className="mr-2" />Reject</MenuItem>
                    }
                </Menu>
            }

        </>
    )
}

export default CandidatesList
