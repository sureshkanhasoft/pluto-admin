import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Paper,
  makeStyles,
  Button,
} from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import CircularProgress from "@material-ui/core/CircularProgress";
import { alpha } from "@material-ui/core/styles/colorManipulator";
import UpdatePlan from "./UpdatePlan";
import { useDispatch, useSelector } from "react-redux";
import { getPlan } from "../../store/action";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    padding: 24,
  },
  filterBox: {
    padding: 12,
  },
  radioGroup: {
    flexDirection: "row",
  },
  table: {
    minWidth: 700,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },

  inputRoot: {
    color: "inherit",
    width: "100%",
  },
  inputInput: {
    paddingTop: theme.spacing(),
    paddingRight: theme.spacing(),
    paddingBottom: theme.spacing(),
    paddingLeft: theme.spacing(1),
    transition: theme.transitions.create("width"),
    width: "100%",
    borderBottom: "1px solid #ccc",
    [theme.breakpoints.up("md")]: {
      width: 200,
    },
  },
}));

const PlanManagement = () => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [Id, setId] = useState(false);
  const [searchData, setSearchData] = useState({ search: "", status: "" });
  const [page, setPage] = React.useState(1);
  const { planList, loading } = useSelector((state) => state.planReducer);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleUpdateClickOpen = (id) => {
    setOpenUpdate(true);
    setId(id);
  };

  const handleClose = (action) => {
    setOpen(false);
    if (action === "update") {
      getData(page, searchData.search, searchData.status);
    }
    setOpenUpdate(false);
  };

  const handleChange = (event, value) => {
    setPage(value);
    setTimeout(getData(value, searchData.search, searchData.status), 2000);
  };

  const getData = (pageNo = 1, search = "", status = "") => {
    dispatch(getPlan({ pageNo, search, status }));
  };

  useEffect(() => {
    getData();
  }, []);

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      {<UpdatePlan openUpdate={openUpdate} handleClose={handleClose} id={Id} />}
      <p className="mb-6">
        Welcome to your Pluto Software admin dashboard. Here you can get an
        overview of your account activity, or use navigation on the left hand
        side to get to your desired location.
      </p>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell align="left">Plan Type</TableCell>
              <TableCell align="left">Price</TableCell>
              <TableCell align="left">Title</TableCell>
              <TableCell align="left">Description</TableCell>
              <TableCell align="center">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {planList?.data &&
              planList?.data.map((row, index) => {
                return (
                  <TableRow key={row.id}>
                    <TableCell scope="row">{++index}</TableCell>
                    <TableCell align="left">{row.name}</TableCell>
                    <TableCell align="left">£{row.price}</TableCell>
                    <TableCell align="left">{row.title}</TableCell>
                    <TableCell align="left">{row.description}</TableCell>
                    <TableCell align="center">
                      <Button
                        variant="contained"
                        color="secondary"
                        onClick={() => handleUpdateClickOpen(row.id)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </Paper>

      {loading ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ""
      )}
    </div>
  );
};

export default PlanManagement;
