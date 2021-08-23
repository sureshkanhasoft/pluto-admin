import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    InputBase,
    Box,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import { Link } from "react-router-dom";
import SearchIcon from '@material-ui/icons/Search';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import { Pagination } from '@material-ui/lab';
import { useDispatch, useSelector } from 'react-redux';
import { getStaff } from '../../store/action';
import history from '../../utils/HistoryUtils';

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
        paddingLeft: theme.spacing(1),
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

    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
        color: '#fff',
    },
}))


const ViewStaff = ({ match }) => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const { loading, getStaffItem } = useSelector(state => state.staff)
    const [searchData, setSearchData] = useState({ search: "" });

    const onhandlClick = (id) => {
        history.push(`${match.url}/${id}/detail`)
    }

    const handleChangePage = (event, value) => {
        setPage(value);
        setTimeout(getStaff1(value), 2000);
    }

    const getStaff1 = (pageNo = 1, search='') => {
        // console.log('search: ', search);
        dispatch(getStaff({ pageNo, search }))
    }

    const handleSearchChange = (event) => {
        const d1 =  event.target.value
        if(d1.length > 2){
            setTimeout(getStaff1(page, d1), 100);
        }
        setSearchData({ ...searchData, [event.target.name]: event.target.value });
    }

    const handleClickSearch = (event, value) => {
        setTimeout(getStaff1(page, searchData.search), 1000);
    };


    useEffect(() => {
        getStaff1()
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
                            <AddIcon className="mr-2" />Add Staff
                        </Link>
                    </div>
                </Box>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Id</TableCell>
                            <TableCell align="left">Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Contact Number</TableCell>
                            <TableCell align="left">Designation</TableCell>
                            <TableCell align="right"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getStaffItem?.data?.data && getStaffItem?.data?.data.map((row, index) => {
                            return (
                                <TableRow key={index}>
                                    <TableCell scope="row">{row.id}</TableCell>
                                    <TableCell align="left">{`${row.first_name} ${row.last_name}`}</TableCell>
                                    <TableCell align="left">{row.email}</TableCell>
                                    <TableCell align="left">{row.contact_number}</TableCell>
                                    <TableCell align="left">{row.designation_name}</TableCell>
                                    <TableCell align="right">
                                        <Link to="#" className="btn btn-secondary btn-sm ml-auto" onClick={e => onhandlClick(row.id)}>View</Link>
                                    </TableCell>
                                </TableRow>
                            )
                        })}

                        {
                            !getStaffItem?.data?.data &&
                            <TableRow>
                                <TableCell scope="row" colSpan="6">
                                    <div className="" align="center">Sorry, staff  not available!</div>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination onChange={handleChangePage} page={page} count={getStaffItem?.data?.last_page} showFirstButton showLastButton />
                </Box>

            </Paper>
        </>
    )
}

export default ViewStaff
