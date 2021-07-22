import React from 'react';
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
    Checkbox
} from "@material-ui/core";
import { Link } from "react-router-dom"
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';
import CheckIcon from '@material-ui/icons/Check';
import VisibilityIcon from '@material-ui/icons/Visibility';
import MoreVertIcon from '@material-ui/icons/MoreVert';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
    },
    desc: {
        fontSize: 16
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

const DetailBooking = () => {
    const classes = useStyle();
    const [value, setValue] = React.useState(0);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const [selected, setSelected] = React.useState([]);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

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
    return (
        <>
            <Paper className={`${classes.root} mb-6`}>
                <Grid container spacing={4}>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Reference ID:</Typography>
                        <Typography variant="h6" className={classes.desc}>1234rr</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Trust Code:</Typography>
                        <Typography variant="h6" className={classes.desc}>Apex care Trust</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Ward Code:</Typography>
                        <Typography variant="h6" className={classes.desc}>ward number</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Band Required:</Typography>
                        <Typography variant="h6" className={classes.desc}>Midwifer Sector Band 5</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Date:</Typography>
                        <Typography variant="h6" className={classes.desc}>2021-07-15</Typography>
                    </Grid>
                    <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Time:</Typography>
                        <Typography variant="h6" className={classes.desc}>07:30 - 13:00</Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <Typography variant="body2" className={classes.heading}>Speciality:</Typography>
                        <div className={classes.chipContainer}>
                            <Chip label="Acute Assessment" />
                            <Chip label="Allocation on arrival" />
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <Box display="flex" justifyContent="flex-end" className={classes.btnContainer}>
                            <Button variant="contained" color="primary">
                                <EditIcon className="mr-2" />Edit
                            </Button>
                            <Button variant="contained" color="secondary">
                                <DeleteIcon className="mr-2" />Delete
                            </Button>
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
        </>
    )
}

export default DetailBooking
