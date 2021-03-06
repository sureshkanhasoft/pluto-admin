import React, { useEffect, useState } from 'react';
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
    TableBody,
    Backdrop,
    CircularProgress,
} from '@material-ui/core';
import { Pagination } from '@material-ui/lab';
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { getSignee } from '../../store/action';
import history from '../../utils/HistoryUtils';

const useStyle = makeStyles((theme) => ({
    root: {
        width: '100%',
        overflowX: 'auto',
        padding: 24,
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
    viewBtn: {
        display: "flex",
        alignItems: "center",
    },
}))

const ViewSignee = ({match}) => {
    const classes = useStyle()
    const dispatch = useDispatch();
    const { getSigneeItem, loading } = useSelector(state => state.signee)
    const [page, setPage]= useState(1)
    const [searchData, setSearchData] = useState({ search: "" });

    const handleSearchChange = (event) => {
        const d1 = event.target.value
        if (d1) {
            setTimeout(getSigneeList(page, d1), 100);
        }
        else {
            setTimeout(getSigneeList(page, ""), 100);
        }
        setSearchData({ ...searchData, [event.target.name]: event.target.value });

    }

    const handleClickSearch = (event, value) => {
        // setTimeout(getTrustList(page, searchData.search), 1000);
    };
    const getSigneeList = (pageNo = 1, search = '') => {
        dispatch(getSignee({ pageNo, search }))
    }
    useEffect(() => {
        getSigneeList()
    }, [])

    const onhandlClick = (id) => {
        history.push(`${match.url}/${id}/detail`)
    }

    const handleChangePage = (event, value) => {
        setPage(value);
        setTimeout(getSigneeList(value), 2000);
    }
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
                            placeholder="Search???" onChange={handleSearchChange}
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                        />
                    </div>
                    <div className="ml-5">
                        <Link to={`${match.url}/create`} className="btn btn-secondary">
                            <AddIcon className="mr-2" />Add Signee
                        </Link>
                    </div>
                </Box>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 80 }}>Id</TableCell>
                            <TableCell align="left">Signee Name</TableCell>
                            <TableCell align="left">Email</TableCell>
                            <TableCell align="left">Mobile no.</TableCell>
                            <TableCell align="left">DOB</TableCell>
                            <TableCell align="right" style={{ width: 140 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getSigneeItem?.data?.data && getSigneeItem?.data?.data.map((list, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{`${list.first_name} ${list.last_name}`}</TableCell>
                                        <TableCell align="left">{list.email}</TableCell>
                                        <TableCell align="left">{list.mobile_number}</TableCell>
                                        <TableCell align="left">{list.date_of_birth}</TableCell>
                                        <TableCell align="right">
                                            <Link to="#" className="btn btn-secondary" onClick={e => onhandlClick(list.id)}>View</Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }
                        {
                            getSigneeItem?.data?.data.length === 0 &&
                            <TableRow>
                                <TableCell align="center" colSpan="6" scope=""> Sorry no record available</TableCell>
                            </TableRow>
                        }
                        
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination onChange={handleChangePage} page={page} count={getSigneeItem?.data?.last_page} showFirstButton showLastButton />
                </Box>
            </Paper>
        </>
    );
};

export default ViewSignee;