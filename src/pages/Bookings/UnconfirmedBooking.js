import React from 'react';
import {
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    makeStyles,
    Box, IconButton,
    Menu,MenuItem
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import StarIcon from '@material-ui/icons/Star';
import CloseIcon from '@material-ui/icons/Close';

const useStyle = makeStyles((theme) => ({
    table: {
        minWidth: 700,
    },
    menuItem:{
        fontSize:14,
        "& svg":{
            width:16,
            height:"auto"
        }
    }
}))

const bookingList = [
    {
        req: "123GRF",
        name: "John Smithh",
        date: "2021-07-13",
        trust: "Apex care Hospital",
        time: "07:00 - 12:00",
        number: "077777777777",
        email: "john.smith@example.com",
    },
    {
        req: "123GRF",
        name: "John Smithh",
        date: "2021-07-13",
        trust: "Apex care Hospital",
        time: "07:00 - 12:00",
        number: "077777777777",
        email: "john.smith@example.com",
    },
    {
        req: "123GRF",
        name: "John Smithh",
        date: "2021-07-13",
        trust: "Apex care Hospital",
        time: "07:00 - 12:00",
        number: "077777777777",
        email: "john.smith@example.com",
    },
    {
        req: "123GRF",
        name: "John Smithh",
        date: "2021-07-13",
        trust: "Apex care Hospital",
        time: "07:00 - 12:00",
        number: "077777777777",
        email: "john.smith@example.com",
    }
]

const UnconfirmedBooking = () => {
    const classes = useStyle();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
      };
    
      const handleClose = () => {
        setAnchorEl(null);
      };
    return (
        <>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="left">REQ</TableCell>
                        <TableCell align="left">Name</TableCell>
                        <TableCell align="left">Date</TableCell>
                        <TableCell align="left">Trust</TableCell>
                        <TableCell align="left">Time</TableCell>
                        <TableCell align="left">Number</TableCell>
                        <TableCell align="left">Email</TableCell>
                        <TableCell align="right"> </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {bookingList.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell align="left">{row.req}</TableCell>
                            <TableCell align="left">{row.name}</TableCell>
                            <TableCell align="left">{row.date}</TableCell>
                            <TableCell align="left">{row.trust}</TableCell>
                            <TableCell align="left">{row.time} </TableCell>
                            <TableCell align="left">{row.number} </TableCell>
                            <TableCell align="left">{row.email} </TableCell>
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
                                    <MenuItem onClick={handleClose}  className={classes.menuItem}><StarIcon className="mr-2" />Super Assign</MenuItem>
                                    <MenuItem onClick={handleClose}  className={classes.menuItem}><CloseIcon className="mr-2"/>Cancel</MenuItem>
                                </Menu>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Box className="mt-5" display="flex" justifyContent="flex-end">
                <Pagination count={10} />
            </Box>
        </>
    )
}

export default UnconfirmedBooking
