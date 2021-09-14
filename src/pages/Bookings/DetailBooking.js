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
import { deleteBooking } from '../../store/action';

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
    },
    btnContainer: {
        '& > *': {
            marginLeft: theme.spacing(2),
            "& svg": {
                width: 20,
                height: "auto"
            }
        },
    }
}))

const bookingList = [
    {
        name: "John Smithh",
        number: "077777777777",
        email: "john.smith@example.com",
    },
    {
        name: "Devid Smithh",
        number: "077777777777",
        email: "john.smith@example.com",
    },
    {
        name: "Warner Smithh",
        number: "077777777777",
        email: "john.smith@example.com",
    },
]


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

    const [bookingDetail, setBookingDetail] = useState([])
    const [loading, setLoading] = useState(false)
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [staffNotify, setStaffNotify] = useState(false)

    const { deleteBookingSuccess, deleteBookingError } = useSelector(state => state.booking)

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    const upadateLink = () => {
        history.push(`update`)
    }

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleCheckboxClick = (event, name) => {
        const selectedIndex = selected.indexOf(name);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, name);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        setSelected(newSelected);
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
            <Paper className={`${classes.root} mb-6`}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Reference ID:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.reference_id}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Code:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Hospital Code:</Typography>
                        <Typography variant="h6" className={classes.desc}>{bookingDetail?.data?.hospital_name}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Ward Code:</Typography>
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
                    <Tab label="Matching Candidates" {...a11yProps(0)} />
                    <Tab label="Interested Candidates" {...a11yProps(1)} />
                </Tabs>
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
                            {bookingList.map((row, index) => {
                                const isItemSelected = isSelected(row.name);
                                // const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow key={index}>
                                        <TableCell scope="row">
                                            <Checkbox
                                                onClick={event =>
                                                    handleCheckboxClick(event, row.name)
                                                }
                                                className="selectCheckbox"
                                                checked={isItemSelected}
                                            // inputProps={{ 'aria-labelledby': labelId }}

                                            />
                                        </TableCell>
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="left">{row.number}</TableCell>
                                        <TableCell align="left">{row.email}</TableCell>
                                        <TableCell align="right">
                                            <Link to="bookings/detail" className={classes.viewBtn}>
                                                <VisibilityIcon className="mr-2" />view
                                            </Link>
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
                                                <MenuItem onClick={handleClose} className={classes.menuItem}><CheckIcon className="mr-2" />Offer</MenuItem>
                                                <MenuItem onClick={handleClose} className={classes.menuItem}><StarIcon className="mr-2" />Super Assign</MenuItem>
                                                <MenuItem onClick={handleClose} className={classes.menuItem}><CloseIcon className="mr-2" />Reject</MenuItem>
                                            </Menu>
                                        </TableCell>
                                    </TableRow>
                                )

                            })}
                        </TableBody>
                    </Table>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
            </Paper>

            <AlertDialog
                id={Id}
                open={deleteOpen}
                close={deleteBookingClose}
                response={alertResponse}
                title="Delete Trust"
                description="Are you sure you want to delete?"
                buttonName="Delete"
            />
        </>
    )
}

export default DetailBooking
