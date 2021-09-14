import React, { useEffect, useState } from 'react'
import {
    Paper,
    makeStyles,
    Button,
    Box,
    Table,
    TableBody,
    TableHead,
    TableRow,
    TableCell,
    IconButton,
    InputBase,
    Backdrop,
    CircularProgress
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles/colorManipulator';
import AddIcon from '@material-ui/icons/Add';
import { Pagination } from '@material-ui/lab';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import SearchIcon from '@material-ui/icons/Search';
import AlertDialog from '../../components/Alert/AlertDialog';
import CreateSpeciality from './CreateSpeciality';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSpecialities, getSpecialities } from '../../store/action';
import UpdateSpeciality from './UpdateSpeciality';
import Notification from '../../components/Notification/Notification';

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
        zIndex: 99,
        cursor: "pointer"
    },
    searchIcondet: {
        cursor: "pointer"
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


const Specialities = () => {
    const classes = useStyle();
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [Id, setId] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const [deleteNotify, SetDeleteNotify] = useState(false);
    const [disabled, setDisabled]= useState(false)
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));

    const [page, setPage] = React.useState(1);
    const [searchData, setSearchData] = useState({ search: "", status: "" });

    const { getSpecialityItem, loading, deleteSuccess, deleteError } = useSelector(state => state.specialities)

    const handleClickOpen = (id) => {
        setOpen(true);
    };
    const handleUpdateClickOpen = (id) => {
        setOpenUpdate(true);
        setId(id)
    };

    const handleClose = () => {
        setOpen(false);
        setOpenUpdate(false)
    };

    const deleteSpeciality = () => {
        setDeleteOpen(true)
    }
    const deleteRoleClose = () => {
        setDeleteOpen(false)
    }

    const alertResponse = (id) => {
        if(disabled === true ) {
            dispatch(deleteSpecialities(id))
        }
        setDisabled(false)
        SetDeleteNotify(true)
    }

    // -----------------------------------
    const handleSearchChange = (event) => {
        const d1 =  event.target.value
        if(d1){
            setTimeout(getSpecialitiesData(page, d1), 100);
        }else {
            setTimeout(getSpecialitiesData(page, ""), 100);
        }
        setSearchData({ ...searchData, [event.target.name]: event.target.value });
        
    }

    const handleClickSearch = (event, value) => {
        setTimeout(getSpecialitiesData(page, searchData.search), 1000);
    };

    const handleChangePage = (event, value) => {
        setPage(value);
        setTimeout(getSpecialitiesData(value), 2000);
    };

    const getSpecialitiesData = (pageNo = 1, search = '') => {
        dispatch(getSpecialities({ pageNo, search }))
    }

    useEffect(() => {
        getSpecialitiesData()
    }, [])

    const deleteSpecialitiesData = (id) => {
        setId(id)
        setDeleteOpen(true)
        setDisabled(true)
        // dispatch(deleteSpecialities(id))
        
    }

    return (
        <>
            {deleteNotify && deleteSuccess?.message &&
                <Notification
                    data={deleteSuccess?.message}
                    status="success"
                />
            }

            {deleteNotify && deleteError?.message &&
                <Notification
                    data={deleteError?.message}
                    status="error"
                />
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
                    {
                        (staffDetail !== "Booking" && staffDetail !== "Finance") &&
                        <div className="ml-5">
                            <Button variant="contained" color="secondary" onClick={handleClickOpen}>
                                <AddIcon className="mr-2" />Add Speciality
                            </Button>
                        </div>
                    }
                    
                </Box>

                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            <TableCell style={{ width: 130 }}>Id</TableCell>
                            <TableCell align="left">Specialities</TableCell>
                            {
                                (staffDetail !== "Booking" && staffDetail !== "Finance") &&  <TableCell align="right">Action</TableCell>
                            }
                           
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            getSpecialityItem?.data && getSpecialityItem?.data.map((row, index) => {
                                return (
                                    <TableRow key={index} >
                                        <TableCell scope="row">{getSpecialityItem?.from + index}</TableCell>
                                        <TableCell align="left">{row.speciality_name}</TableCell>
                                            {
                                                (staffDetail !== "Booking" && staffDetail !== "Finance") && 
                                                <TableCell align="right">
                                                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                        <IconButton onClick={() => handleUpdateClickOpen(row.id)}><EditIcon color="primary" /></IconButton>
                                                        <IconButton onClick={() => deleteSpecialitiesData(row.id)}><DeleteIcon color="secondary" /></IconButton>
                                                    </Box>
                                                </TableCell>
                                            }
                                            
                                    </TableRow>
                                )
                            })
                        }
                        {
                            !getSpecialityItem?.data &&
                            <TableRow>
                                <TableCell scope="row" colSpan="3">
                                    <div className="" align="center">Sorry, speciality  not available!</div>
                                </TableCell>
                            </TableRow>
                        }
                    </TableBody>
                </Table>
                <Box className="mt-5" display="flex" justifyContent="flex-end">
                    <Pagination onChange={handleChangePage} page={page} count={getSpecialityItem?.last_page} showFirstButton showLastButton />
                </Box>
            </Paper>

            <CreateSpeciality
                open={open}
                handleClose={handleClose}
            />

            <UpdateSpeciality
                open={openUpdate}
                handleClose={handleClose}
                id={Id}
            />

            <AlertDialog
                id={Id}
                open={deleteOpen}
                close={deleteRoleClose}
                response={alertResponse}
                title="Delete Speciality"
                description="Are you sure you want to delete?"
                buttonName="Delete"
            />

            {
                loading ?
                    <Backdrop className={classes.backdrop} open={loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop> : ""
            }
        </>
    )
}

export default Specialities
