import React, { useEffect, useState } from 'react'
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
    CircularProgress
} from '@material-ui/core';
import { Link } from "react-router-dom";
import { Pagination } from '@material-ui/lab';
import AddIcon from '@material-ui/icons/Add';
import SearchIcon from '@material-ui/icons/Search';
import { useDispatch, useSelector } from 'react-redux';
import { getTrust } from '../../store/action';
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

const ViewTrust = ({ match }) => {
    const classes = useStyle()
    const dispatch = useDispatch();
    const [page, setPage] = React.useState(1);
    const [searchData, setSearchData] = useState({ search: "" });

    const { getTrustItem, loading } = useSelector(state => state.trust)
    console.log('getTrustItem: ', getTrustItem);

    const getTrustList = (pageNo = 1, search = '') => {
        dispatch(getTrust({ pageNo, search }))
    }

    const onhandlClick = (id) => {
        history.push(`${match.url}/${id}/detail`)
    }

    const handleChangePage = (event, value) => {
        setPage(value);
        setTimeout(getTrustList(value), 2000);
    };

    const handleSearchChange = (event) => {
        const d1 = event.target.value
        if (d1) {
            setTimeout(getTrustList(page, d1), 100);
        }
        else {
            setTimeout(getTrustList(page, ""), 100);
        }
        setSearchData({ ...searchData, [event.target.name]: event.target.value });

    }

    const handleClickSearch = (event, value) => {
        setTimeout(getTrustList(page, searchData.search), 1000);
    };

    useEffect(() => {
        getTrustList()
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
                            <AddIcon className="mr-2" />Add Trust
                        </Link>
                    </div>
                </Box>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 130 }}>Id</TableCell>
                            <TableCell align="left">Trust Name</TableCell>
                            <TableCell align="right" style={{ width: 140 }}></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getTrustItem?.data?.data && getTrustItem?.data?.data.map((list, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell scope="row">{index + 1}</TableCell>
                                        <TableCell align="left">{list.name}</TableCell>
                                        <TableCell align="right">
                                            <Link to="#" className="btn btn-secondary" onClick={e => onhandlClick(list.id)}>View</Link>
                                        </TableCell>
                                    </TableRow>
                                )
                            })
                        }

                        {
                            getTrustItem?.data?.data !== "" &&
                            <TableRow>
                                <TableCell align="center" colSpan="3" scope=""> Sorry no record available</TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination onChange={handleChangePage} page={page} count={getTrustItem?.last_page} showFirstButton showLastButton />
                </Box>
            </Paper>
        </>
    )
}

export default ViewTrust
