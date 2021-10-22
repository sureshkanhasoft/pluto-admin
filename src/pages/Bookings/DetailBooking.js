import React, { useEffect, useState } from 'react';
import {
    Grid, Typography, makeStyles, Chip, Paper, Tab, Tabs, Box,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    IconButton,
    Menu,
    MenuItem,
    Button,
    Checkbox,
    Backdrop,
    CircularProgress
} from "@material-ui/core";
import { Link } from "react-router-dom"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import axios from 'axios';
import apiConfigs from '../../config/config';
import history from '../../utils/HistoryUtils';
import AlertDialog from '../../components/Alert/AlertDialog';
import { useDispatch, useSelector } from 'react-redux';
import Notification from '../../components/Notification/Notification';
import { confirmBooking, deleteBooking } from '../../store/action';
import { apiClient } from '../../config/apiClient';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    desc: {
        fontSize: 16
    },
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
    heading: {
        color: "#626161",
    },
    gridItem: {
        borderBottom: "1px solid #ccc"
    },
    chipContainer: {
        paddingTop: 12,
        '& > *': {
            marginRight: theme.spacing(0.5),
            background: "#f4f4f4"
        },
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
    btnContainer: {
        '& > *': {
            marginLeft: theme.spacing(2),
            "& svg": {
                width: 20,
                height: "auto"
            }
        },
    },
    tabChip: {
        padding: 0,
        height: 26,
        '& .MuiChip-label': {
            padding: '0 8px',
            minWidth: 26,
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

const DetailBooking = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const booking_id = match.params.id;
    const [Id, setId] = useState(false);
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [selected, setSelected] = React.useState([]);
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
    const loginDetail = JSON.parse(localStorage.getItem("loginUserInfo"));

    const [bookingDetail, setBookingDetail] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [staffNotify, setStaffNotify] = useState(false)
    const [confirmNotify, setConfirmNotify] = useState(false);

    const { deleteBookingSuccess, deleteBookingError, confirmBookingSuccess, confirmBookingError } = useSelector(state => state.booking)

    const [bookingData, setBookingData] = useState({
        booking_id: booking_id,
        signee_id: "",
        status: ""
    })

    const [pdfData, setPdfData] = useState({
        booking_id: booking_id,
        signee_id: [138, 256],
    })

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const upadateLink = () => {
        history.push(`update`)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = (data) => {
        setAnchorEl(null);
    };
    const handleClose1 = (data, signeeId) => {
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

    const handleCheckboxClick = (event, name) => {
        // console.log('event: ', event.target);
        // console.log('name: ', name);

        // setPdfData({...pdfData, [event.target.name]:event.target.value})
        // const selectedIndex = selected.indexOf(name);
        // let newSelected = [];

        // if (selectedIndex === -1) {
        //     newSelected = newSelected.concat(selected, name);
        // } else if (selectedIndex === 0) {
        //     newSelected = newSelected.concat(selected.slice(1));
        // } else if (selectedIndex === selected.length - 1) {
        //     newSelected = newSelected.concat(selected.slice(0, -1));
        // } else if (selectedIndex > 0) {
        //     newSelected = newSelected.concat(
        //         selected.slice(0, selectedIndex),
        //         selected.slice(selectedIndex + 1),
        //     );
        // }

        // setSelected(newSelected);
    };

    const isSelected = (name) => selected.indexOf(name) !== -1;

    const getBookingDetail = async () => {
        setLoading(true)
        const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
        await axios.get(`${apiConfigs.API_URL}api/organization/get-booking/${booking_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            setBookingDetail(response.data)
            setLoading(false)
        }).catch(error => {
            console.log("error.message", error.message);
            setLoading(false)
        });
    }
    useEffect(() => {
        getBookingDetail()
    }, [])

    const deleteBookingClose = () => {
        setDeleteOpen(false)
    }

    const deleteStaffItem = (id) => {
        setDeleteOpen(true)
        setId(id)
    }
    const alertResponse = (id) => {
        dispatch(deleteBooking(id))
        setStaffNotify(true)
    }
    const backPage = () => {
        history.go(-2)
    }

    const signeePage = (e, signeeId) => {
        e.preventDefault();
        const adminUrl = loginDetail.role === "ORGANIZATION" ? 'admin' : 'staff'
        // console.log(`/${(adminUrl).toLowerCase()}/signee/${signeeId}/detail`)
        history.push(`/${(adminUrl).toLowerCase()}/signee/${signeeId}/detail`)
    }
    const downloadPdf = async () => {
        // await apiClient(true).post(`api/organization/user/pdf`, pdfData)\
        const getToken = localStorage.getItem("token") ? localStorage.getItem("token").replace(/['"]+/g, '') : "";
        await axios.post(`${apiConfigs.API_URL}api/organization/user/pdf`, pdfData,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': getToken ? `Bearer ${getToken}` : "",
                'Accept': 'application/pdf',
            },
            //  responseType: 'json', 
            //  headers: headers
        })
        .then(response => {
            console.log('response: ', response);
            const dataItem = response.data.data.pdf_path.blob();
            // const file = new Blob([dataItem],{ type: 'application/pdf' });
            
            const fileURL = URL.createObjectURL(dataItem);
            const link = document.createElement('a');
            link.href = fileURL;
            link.download = "FileName" + new Date() + ".pdf";
            document.body.appendChild(link);
            link.click();
            // var element = document.createElement("a");
            // element.download = "image.pdf";
            // document.body.appendChild(element);
            // element.click();
        }).catch(error => {
            console.log('error: ', error);
        });


        // var element = document.createElement("a");
        // var file = new Blob(
        //     [
        //         "http://backendbooking.kanhasoftdev.com/public/uploads/signee_docs/sample-pdf_9359_1633007406.pdf"
        //     ],
        //     { type: 'application/pdf' }
        // );
        // var file = "http://backendbooking.kanhasoftdev.com/public/uploads/signee_docs/sample-pdf_9359_1633007406.pdf";
        // element.href = URL.createObjectURL(file);
        // element.download = "image.pdf";
        // document.body.appendChild(element);
        // element.click();


        
           
    }
    return (
        <>
            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
            {
                staffNotify && deleteBookingSuccess?.message &&
                <Notification
                    data={deleteBookingSuccess?.message}
                    status="success"
                />
            }
            {
                staffNotify && deleteBookingError?.message &&
                <Notification
                    data={deleteBookingError?.message}
                    status="error"
                />
            }
            {confirmNotify && confirmBookingSuccess?.message &&
                <Notification
                    data={confirmBookingSuccess?.message}
                    status="success"
                />
            }
            <Paper className={`${classes.root} mb-6`}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Reference ID:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.reference_id}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Name:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Hospital Name:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.hospital_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Ward Name:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.ward_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Band Required:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.grade_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Date:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.date}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={2} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Shift Time:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.start_time} - {bookingDetail?.data?.end_time}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={2} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Shift Type :</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.shift_type}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Rate:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.rate}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" className={classes.heading}>Speciality:</Typography>
                        <div className={classes.chipContainer}>

                            {
                                bookingDetail?.data?.speciality && bookingDetail?.data?.speciality.map((list, index) => {
                                    return (
                                        <Chip label={list.speciality_name} key={index} />
                                    )
                                })
                            }
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                            <Button color="primary" onClick={backPage}>
                                Back
                            </Button>
                            <Button variant="contained" color="primary" onClick={upadateLink}>
                                <EditIcon className="mr-2" />Edit
                            </Button>
                            {
                                (staffDetail !== "Finance") &&
                                <Button variant="contained" color="secondary" onClick={(e) => deleteStaffItem(bookingDetail?.data?.id)}>
                                    <DeleteIcon className="mr-2" />Delete
                                </Button>

                            }

                        </Box>
                    </Grid>
                </Grid>
            </Paper>

            <Paper className={`mb-6`}>
                <Tabs value={value} onChange={handleChange} aria-label="simple tabs example">
                    <Tab
                        label={<span className={classes.tabLabel}>Matching Candidates {bookingDetail?.data?.matching.length > 0 ? <Chip label={bookingDetail?.data?.matching.length} color="primary" className={classes.tabChip} /> : ""}</span>}
                        {...a11yProps(0)} />
                    <Tab label=
                        {<span className={classes.tabLabel}>Interested Candidates {bookingDetail?.data?.interested.length > 0 ? <Chip label={bookingDetail?.data?.interested.length} color="primary" className={classes.tabChip} /> : ""}</span>}
                        {...a11yProps(1)} />
                </Tabs>
                {/* <span onClick={downloadPdf}>Download</span> */}
                <TabPanel value={value} index={0}>
                    <Table className={classes.table}>
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ width: 70 }}></TableCell>
                                <TableCell>Id</TableCell>
                                <TableCell align="left">Name</TableCell>
                                <TableCell align="left">Contact Number</TableCell>
                                <TableCell align="left">Email</TableCell>
                                <TableCell align="left">Detail</TableCell>
                                <TableCell align="right">Action</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bookingDetail?.data?.matching && bookingDetail?.data?.matching.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                // const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow key={index}>
                                        <TableCell scope="row">
                                            <Checkbox
                                                onClick={event =>
                                                    handleCheckboxClick(event, row.signeeId)
                                                }
                                                className="selectCheckbox"
                                                checked={isItemSelected}
                                            // inputProps={{ 'aria-labelledby': labelId }}

                                            />
                                        </TableCell>
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{row.first_name} {row.last_name}</TableCell>
                                        <TableCell align="left">{row.contact_number}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="right">
                                            <span onClick={(e) => signeePage(e, row.signeeId)} className={classes.viewBtn}>
                                                <VisibilityIcon className="mr-2" />view
                                            </span>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={handleMenu}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                getContentAnchorEl={null}
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                {
                                                    bookingDetail?.data?.status !== "CONFIRMED" &&
                                                    <MenuItem onClick={() => handleClose1('OFFER', row.signeeId)} className={classes.menuItem}><CheckIcon className="mr-2" />Offer</MenuItem>
                                                }
                                                {
                                                    bookingDetail?.data?.status !== "CONFIRMED" &&
                                                    <MenuItem onClick={() => handleClose1('CONFIRMED', row.signeeId)} className={classes.menuItem}><StarIcon className="mr-2" />Super Assign</MenuItem>
                                                }

                                                <MenuItem onClick={() => handleClose1('CANCEL', row.signeeId)} className={classes.menuItem}><CloseIcon className="mr-2" />Reject</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                )

                            })}

                            {
                                bookingDetail?.data?.matching.length === 0 &&
                                <TableRow>
                                    <TableCell colSpan="7" align="center">No records found</TableCell>
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
                                <TableCell align="left">Detail</TableCell>
                                <TableCell align="right">Action</TableCell>
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
                                                onClick={event =>
                                                    handleCheckboxClick(event, row.signeeId)
                                                }
                                                className="selectCheckbox"
                                                checked={pdfData?.signee_id ? true : false}
                                                name="signee_id"
                                            // inputProps={{ 'aria-labelledby': labelId }}

                                            />
                                        </TableCell>
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{row.first_name} {row.last_name}</TableCell>
                                        <TableCell align="left">{row.contact_number}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="right">
                                            <span onClick={(e) => signeePage(e, row.signeeId)} className={classes.viewBtn}>
                                                <VisibilityIcon className="mr-2" />view
                                            </span>
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton onClick={handleMenu}>
                                                <MoreVertIcon />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                getContentAnchorEl={null}
                                                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                                                open={open}
                                                onClose={handleClose}
                                            >
                                                {
                                                    bookingDetail?.data?.status !== "CONFIRMED" &&
                                                    <MenuItem onClick={() => handleClose1('OFFER', row.signeeId)} className={classes.menuItem}><CheckIcon className="mr-2" />Offer</MenuItem>
                                                }
                                                {
                                                    bookingDetail?.data?.status !== "CONFIRMED" &&
                                                    <MenuItem onClick={() => handleClose1('CONFIRMED', row.signeeId)} className={classes.menuItem}><StarIcon className="mr-2" />Super Assign</MenuItem>
                                                }
                                                <MenuItem onClick={() => handleClose1('CANCEL', row.signeeId)} className={classes.menuItem}><CloseIcon className="mr-2" />Reject</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                )

                            })}
                            {
                                bookingDetail?.data?.interested.length === 0 &&
                                <TableRow>
                                    <TableCell colSpan="7" align="center">No records found</TableCell>
                                </TableRow>
                            }
                        </TableBody>
                    </Table>
                </TabPanel>
            </Paper>

            <AlertDialog
                id={Id}
                open={deleteOpen}
                close={deleteBookingClose}
                response={alertResponse}
                title="Delete Booking"
                description="Are you sure you want to delete?"
                buttonName="Delete"
            />
        </>
    )
}

export default DetailBooking
