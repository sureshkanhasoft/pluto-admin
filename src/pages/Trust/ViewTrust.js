import React from 'react'
import {
    Paper,
    makeStyles,
    Box,
    alpha,
    InputBase,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody
} from '@material-ui/core';
import { Link } from "react-router-dom";
import { Pagination } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
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
    viewBtn: {
        display: "flex",
        alignItems: "center",
    },
}))

const trustList = [
    {
        name: "Ana Care Hospital",
    },
    {
        name: "Apex care Hospital",
    },
    {
        name: "Saviour Hospital",
    },
    {
        name: "Aarna care Hsopital ",
    },
    {
        name: "Sterling Hospital",
    }
]

const ViewTrust = ({ match }) => {
    const classes = useStyle()
    return (
        <>
            <p className="mb-6">Welcome to your Pluto Software admin dashboard. Here you can get an overview of your account activity, or use navigation on the left hand side to get to your desired location.</p>
            <Paper className={`${classes.root} mb-6`}>
                <Box className="mb-5" display="flex" alignItems="center">
                    <div className={classes.search} >
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
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

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 80 }}>Id</TableCell>
                            <TableCell align="left">Trust Name</TableCell>
                            <TableCell align="right" style={{ width: 140 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            trustList.map((row, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{row.name}</TableCell>
                                        <TableCell align="right">
                                            <Link to={`${match.url}/detail`} className="btn btn-secondary" >View</Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination count={5} />
                </Box>
            </Paper>

        </>
    )
}

export default ViewTrust
