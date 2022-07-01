import React, { useEffect, useState } from "react";
import {
  Grid,
  Typography,
  makeStyles,
  Paper,
  Box,
  Button,
  Backdrop,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
  Checkbox,
  FormControlLabel,
  Card,
  RadioGroup,
  Chip,
  InputBase,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AlertDialog from "../../components/Alert/AlertDialog";
import { useDispatch, useSelector } from "react-redux";
import history from "../../utils/HistoryUtils";
import PublishIcon from "@material-ui/icons/Publish";
import axios from "axios";
import { apiClient } from "../../config/apiClient";
import apiConfigs from "../../config/config";
import { Pagination } from "@material-ui/lab";
import moment from "moment";
import { alpha } from "@material-ui/core/styles/colorManipulator";

import {
  changeDocStatus,
  deleteSignee,
  getSingleSignee,
  getContactEventForSignee,
  signeeCompStatus,
  signeeProStatus,
} from "../../store/action";
import Notification from "../../components/Notification/Notification";
import InsertPhotoOutlinedIcon from "@material-ui/icons/InsertPhotoOutlined";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import InfoIcon from "@material-ui/icons/Info";
import SearchIcon from "@material-ui/icons/Search";
import AddIcon from "@material-ui/icons/Add";
import CreateContactEvent from "./CreateContactEvent";

const useStyle = makeStyles((theme) => ({
  root: {
    width: "100%",
    overflowX: "auto",
    padding: 24,
  },
  root1: {
    padding: 24,
    marginBottom: 16,
  },
  desc: {
    fontSize: 16,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  heading: {
    color: "#626161",
  },
  gridItem: {
    borderBottom: "1px solid #ccc",
  },
  btnContainer: {
    "& > *": {
      marginLeft: theme.spacing(2),
      "& svg": {
        width: 20,
        height: "auto",
      },
    },
  },
  mainTitle: {
    fontSize: 18,
    color: "#ff8b46",
    fontWeight: "500",
  },
  boxContainer: {
    borderBottom: "1px solid #ccc",
    "&:last-child": {
      borderBottom: "none",
    },
  },
  selectCon: {
    marginLeft: "auto",
    minWidth: 140,
  },
  fileCon: {
    marginLeft: "auto",
    minWidth: 140,
  },
  statusSelect: {
    "& .MuiSelect-select": {
      padding: "10px 32px 10px 10px",
    },
  },
  statusContainer: {
    width: "100%",
    maxWidth: "100%",
    flex: "0 0 100%",
    padding: "6px !important",
    background: "#eaebed",
    marginBottom: 24,
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  statusLabel: {
    marginRight: 16,
    fontWeight: "500",
    color: "#184a7b",
  },
  formControl1: {
    width: 182,
    display: "flex",
    border: "none",
    background: "#184a7b",
    color: "#fff",
    padding: "4px 8px",
    paddingLeft: 12,
    borderRadius: 6,
    "& .MuiInputBase-root": {
      color: "#fff",
      "&:before": {
        border: "none !important",
      },
    },
    "& svg": {
      fill: "#fff",
    },
  },
  cardBox: {
    background: "#cae0f7",
    padding: "12px 20px",
    marginRight: 12,
    minWidth: 220,
    marginBottom: 12,
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: "100%",
    flexGrow: 1,
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(),
      width: "auto",
    },
  },
  searchIcon: {
    width: theme.spacing(6),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
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

const DetailSignee = ({ match }) => {
  const classes = useStyle();
  const dispatch = useDispatch();
  const user_id = match.params.id;
  const [Id, setId] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [signeeNotify, setSigneeNotify] = useState(false);
  const [docNotify, setDocNotify] = useState(false);
  const [compNotify, setCompNotify] = useState(false);
  const [proNotify, setProNotify] = useState(false);
  const [key1, aetKey1] = useState("");
  const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
  const [selectedFile, setSelectedFile] = useState([]);
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [key2, setKey] = useState("");
  const getToken = localStorage.getItem("token")
    ? localStorage.getItem("token").replace(/['"]+/g, "")
    : "";
  // const { documentDetail, documentDetailError } = useSelector(state => state.addCompliance);
  const [addDocMsg, setAddDocMsg] = useState("");
  const [fileSizeMsg, setFileSize] = useState("");
  const [notifyMsg, setNotifyMsg] = useState(false);
  const [loader, setLoader] = useState(false);
  const [page, setPage] = React.useState(1);
  const [searchData, setSearchData] = useState({ search: "" });
  const [open, setOpen] = useState(false);
  const baseUrl =
    "http://backendbooking.kanhasoftdev.com/public/uploads/signee_docs/";

  const {
    getSingleSigneeItem,
    loading,
    deleteSigneeSuccess,
    deleteSigneeError,
    changeDocStatusSuccess,
    signeeProStatusSuccess,
    signeeComStatusSuccess,
    signeeComStatusError,
    getCandidateEventItem,
    getCandidateEventError,
  } = useSelector((state) => state.signee);

  const [complainceStatus, setComplainceStatus] = useState({
    signee_id: user_id,
    organization_id: "",
    key: "",
    document_status: "",
  });

  const [profileStatus, setProfileStatus] = useState({
    signee_id: "",
    status: "",
  });

  const [complStatus, setComplStatus] = useState({
    signeeId: "",
    status: "",
  });

  const deleteStaffItem = (id) => {
    setDeleteOpen(true);
    setId(id);
  };

  const alertResponse = (id) => {
    dispatch(deleteSignee(id));
    setSigneeNotify(true);
  };

  const deleteRoleClose = () => {
    setDeleteOpen(false);
  };

  useEffect(() => {
    dispatch(getSingleSignee(user_id));
    getevent(1, "");
  }, [user_id]);

  const backPage = () => {
    history.go(-2);
  };
  const upadateLink = () => {
    history.push(`update`);
  };

  const handleComplianceStatus = (event, org_id) => {
    setComplainceStatus({
      ...complainceStatus,
      key: event.target.name,
      document_status: event.target.value,
      organization_id: org_id,
    });
  };

  useEffect(() => {
    if (complainceStatus.key !== "") {
      dispatch(changeDocStatus(complainceStatus));
      setDocNotify(true);
      setTimeout(() => {
        dispatch(getSingleSignee(user_id));
      }, 4000);
    }
  }, [complainceStatus]);

  const handleProfileStatus = (event, id) => {
    setProfileStatus({
      ...profileStatus,
      [event.target.name]: event.target.value,
      signee_id: id,
    });
  };

  useEffect(() => {
    if (profileStatus.signee_id !== "") {
      dispatch(signeeProStatus(profileStatus));
      setProNotify(true);
      setTimeout(() => {
        dispatch(getSingleSignee(user_id));
        setProNotify(false);
      }, 4000);
    }
  }, [profileStatus]);

  const handleComplStatus = (event, id) => {
    setComplStatus({
      ...complStatus,
      [event.target.name]: event.target.value,
      signeeId: id,
    });
  };

  useEffect(() => {
    if (complStatus.signeeId !== "") {
      dispatch(signeeCompStatus(complStatus));
      setCompNotify(true);
      setTimeout(() => {
        dispatch(getSingleSignee(user_id));
        setCompNotify(false);
      }, 4000);
    }
  }, [complStatus]);
  // console.log(getSingleSigneeItem?.data?.speciality?.speciality_name)
  let specilaity_list = getSingleSigneeItem?.data?.speciality?.speciality_name
    ? getSingleSigneeItem?.data?.speciality?.speciality_name.split(",")
    : "";

  const handleClick = (e, keyData) => {
    setKey(keyData);
    console.log(keyData, " keyData");
    console.log(e.target.files, " filesfilesfiles");
    setSelectedFile(e.target.files);
    setFileSize("");
  };

  useEffect(() => {
    if (selectedFile && selectedFile.length > 0) {
      let totalLength = null;
      if (selectedFile.length <= 5) {
        for (const key of Object.keys(selectedFile)) {
          const fsize = selectedFile.item(key).size;
          const file2 = Math.round(fsize / 1024);
          totalLength += file2;
        }
        if (totalLength <= 20480) {
          onSubmit();
        } else {
          setFileSize("File size should be less than 20MB");
        }
      } else {
        setFileSize("Maximum 5 documents allowed");
      }
    }
  }, [selectedFile]);

  const onSubmit = (e) => {
    let formData = new FormData();
    for (const key of Object.keys(selectedFile)) {
      console.log(selectedFile[key], " selectedFile");
      formData.append("files[]", selectedFile[key]);
      formData.append("key", key2);
    }
    setAddDocMsg("");

    axios
      .post(
        apiConfigs.API_URL + "api/organization/upload-document/" + user_id,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: getToken ? `Bearer ${getToken}` : "",
          },
          onUploadProgress: (progressEvent) => {
            setLoader(true);
          },
        }
      )
      .then(function (response) {
        const dataItem = response.data;
        if (dataItem && dataItem.status === true) {
          setLoader(false);
          setNotifyMsg(true);
          setAddDocMsg("Document Uploaded Successfully");
          dispatch(getSingleSignee(user_id));
          setSelectedFile([]);
        }
      })
      .catch(function (error) {
        setLoader(false);
        setAddDocMsg(error.message);
      });
  };

  const getevent = (pageNo = 1, search = "") => {
    dispatch(getContactEventForSignee(pageNo, search, user_id));
  };

  const handleSearchChange = (event) => {
    const d1 = event.target.value;
    if (d1) {
      setTimeout(getevent(page, d1), 100);
    } else {
      setTimeout(getevent(page, ""), 100);
    }
    setSearchData({ ...searchData, [event.target.name]: event.target.value });
  };

  const handleClickSearch = (event, value) => {
    setTimeout(getevent(page, searchData.search), 1000);
  };

  const handleChangePage = (event, value) => {
    setPage(value);
    setTimeout(getevent(value), 2000);
  };
  const handleClickOpen = (id) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      {loading || loader ? (
        <Backdrop className={classes.backdrop} open={loading}>
          <CircularProgress color="inherit" />
        </Backdrop>
      ) : (
        ""
      )}
      {(signeeNotify || docNotify) &&
        (deleteSigneeSuccess?.message || changeDocStatusSuccess.message) && (
          <Notification
            data={
              deleteSigneeSuccess?.message || changeDocStatusSuccess.message
            }
            status="success"
          />
        )}
      {signeeNotify && deleteSigneeError?.message && (
        <Notification data={deleteSigneeError?.message} status="error" />
      )}
      {compNotify && signeeComStatusSuccess?.message && (
        <Notification data={signeeComStatusSuccess?.message} status="success" />
      )}
      {proNotify && signeeProStatusSuccess?.message && (
        <Notification data={signeeProStatusSuccess?.message} status="success" />
      )}
      {fileSizeMsg && <Notification data={fileSizeMsg} status="error" />}
      {addDocMsg && <Notification data={addDocMsg} status="success" />}

      <CreateContactEvent open={open} handleClose={handleClose} signee_id={user_id} />

      <Paper className={`${classes.root} mb-6`}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} lg={4} className={classes.statusContainer}>
            <span className={classes.statusLabel}>Compliance Status:</span>
            <FormControl
              className={classes.formControl1}
              style={{ marginRight: 30 }}
            >
              <Select
                value={getSingleSigneeItem?.data?.compliance_status || ""}
                name="status"
                onChange={(e) =>
                  handleComplStatus(e, getSingleSigneeItem?.data?.user_id)
                }
                defaultValue={0}
              >
                <MenuItem value="NEW SIGNUP">New Signup</MenuItem>
                <MenuItem value="COMPLIANCE REVIEW">Compliance review</MenuItem>
                <MenuItem value="NOT COMPLIANT">Not Complaint</MenuItem>
                <MenuItem value="COMPLIANT">Complaint</MenuItem>
                <MenuItem value="ON HOLD">On Hold</MenuItem>
              </Select>
            </FormControl>
            <span className={classes.statusLabel}>Profile Status:</span>
            <FormControl className={classes.formControl1}>
              <Select
                value={getSingleSigneeItem?.data?.signee_status || ""}
                name="status"
                onChange={(e) =>
                  handleProfileStatus(e, getSingleSigneeItem?.data?.user_id)
                }
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Inactive">Inactive</MenuItem>
                <MenuItem value="Dormant">Dormant</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
        <Grid container spacing={4}>
          {/* <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Candidate Id</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.candidate_id} </Typography>
                    </Grid> */}
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              First Name
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.first_name}{" "}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Last Name
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.last_name}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Email Address
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.email}
            </Typography>
          </Grid>
          {/* <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Password</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.candidate_id}</Typography>
                    </Grid> */}
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Contact Number
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.contact_number
                ? getSingleSigneeItem?.data?.contact_number
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Date of birth
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.date_of_birth
                ? getSingleSigneeItem?.data?.date_of_birth
                : "-"}
            </Typography>
          </Grid>

          {/* <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Phone Number</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.phone_number}</Typography>
                    </Grid> */}

          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Address
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.address_line_1
                ? getSingleSigneeItem?.data?.address_line_1
                : "-"}{" "}
              {getSingleSigneeItem?.data?.address_line_2}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              City
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.city
                ? getSingleSigneeItem?.data?.city
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Postcode
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.postcode
                ? getSingleSigneeItem?.data?.postcode
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Date Registration
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.date_registered
                ? getSingleSigneeItem?.data?.date_registered
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Nationality
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.nationality
                ? getSingleSigneeItem?.data?.nationality
                : "-"}
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              NMC DMC pin
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.nmc_dmc_pin
                ? getSingleSigneeItem?.data?.nmc_dmc_pin
                : "-"}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Candidate Id
            </Typography>
            <Typography variant="h6" className={classes.desc}>
              {getSingleSigneeItem?.data?.candidate_id
                ? getSingleSigneeItem?.data?.candidate_id
                : ""}
            </Typography>
          </Grid>
          <Grid item xs={12} sm={12} lg={12} className={classes.gridItem}>
            <Typography variant="body2" className={classes.heading}>
              Speciality:
            </Typography>
            <div className={classes.chipContainer}>
              {specilaity_list.length > 0 &&
                specilaity_list?.map((list, index) => (
                  <Chip
                    className="tag mt-1 mr-1"
                    label={list}
                    key={index}
                  ></Chip>
                ))}
            </div>
          </Grid>

          {/* <Grid item xs={12} sm={6} lg={4} className={classes.gridItem}>
                        <Typography variant="body2" className={classes.heading}>Candidate Referred from</Typography>
                        <Typography variant="h6" className={classes.desc}>{getSingleSigneeItem?.data?.candidate_referred_name ? getSingleSigneeItem?.data?.candidate_referred_name : "-"}</Typography>
                    </Grid> */}
          <Grid item xs={12}>
            <Box
              display="flex"
              justifyContent="flex-end"
              className={classes.btnContainer}
            >
              <Button color="primary" onClick={backPage}>
                Back
              </Button>
              {staffDetail !== "Finance" && (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={upadateLink}
                  >
                    <EditIcon className="mr-2" />
                    Edit
                  </Button>
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={(e) =>
                      deleteStaffItem(getSingleSigneeItem?.data?.user_id)
                    }
                  >
                    <DeleteIcon className="mr-2" />
                    Delete
                  </Button>
                </>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Preferences
      </Typography>

      <Grid container spacing={2} style={{ marginBottom: 24 }}>
        <Grid item xs={12} style={{ display: "flex", flexWrap: "wrap" }}>
          <Card className={classes.cardBox}>
            <FormControl component="fieldset" className={classes.formControl}>
              <p className="f-500 mb-2"> Monday</p>
              <div>
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.monday_day === 1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Day"
                />
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.monday_night ===
                        1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Night"
                />
              </div>
            </FormControl>
          </Card>
          <Card className={classes.cardBox}>
            <FormControl component="fieldset" className={classes.formControl}>
              <p className="f-500 mb-2"> Tuesday</p>
              <div>
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.tuesday_day ===
                        1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Day"
                />
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences
                          ?.tuesday_night === 1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Night"
                />
              </div>
            </FormControl>
          </Card>
          <Card className={classes.cardBox}>
            <FormControl component="fieldset" className={classes.formControl}>
              <p className="f-500 mb-2"> Wednesday</p>
              <div>
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences
                          ?.wednesday_day === 1
                          ? true
                          : false
                      }
                      color="primary"
                    />
                  }
                  label="Day"
                />
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences
                          ?.wednesday_night === 1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Night"
                />
              </div>
            </FormControl>
          </Card>
          <Card className={classes.cardBox}>
            <FormControl component="fieldset" className={classes.formControl}>
              <p className="f-500 mb-2"> Thursday</p>
              <div>
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.thursday_day ===
                        1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Day"
                />
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences
                          ?.thursday_night === 1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Night"
                />
              </div>
            </FormControl>
          </Card>
          <Card className={classes.cardBox}>
            <FormControl component="fieldset" className={classes.formControl}>
              <p className="f-500 mb-2"> Friday</p>
              <div>
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.friday_day === 1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Day"
                />
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.friday_night ===
                        1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Night"
                />
              </div>
            </FormControl>
          </Card>
          <Card className={classes.cardBox}>
            <FormControl component="fieldset" className={classes.formControl}>
              <p className="f-500 mb-2"> Saturday</p>
              <div>
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.saturday_day ===
                        1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Day"
                />
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences
                          ?.saturday_night === 1
                          ? true
                          : false
                      }
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Night"
                />
              </div>
            </FormControl>
          </Card>
          <Card className={classes.cardBox}>
            <FormControl component="fieldset" className={classes.formControl}>
              <p className="f-500 mb-2"> Sunday</p>
              <div>
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.sunday_day === 1
                          ? true
                          : false
                      }
                      name="monday_day"
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Day"
                />
                <FormControlLabel
                  style={{ cursor: "default" }}
                  control={
                    <Checkbox
                      checked={
                        getSingleSigneeItem?.data?.preferences?.sunday_night ===
                        1
                          ? true
                          : false
                      }
                      name="monday_night"
                      color="primary"
                      style={{ cursor: "default" }}
                    />
                  }
                  label="Night"
                />
              </div>
            </FormControl>
          </Card>
        </Grid>
      </Grid>
      <Grid container spacing={2} style={{ marginBottom: 24 }}>
        <Grid item xs={12} style={{ display: "flex" }}>
          <div className="" style={{ marginRight: 24 }}>
            <p className="f-500 mb-3">
              {" "}
              Number of shifts you are looking
              <br /> to work per week.
            </p>
            <Card className={classes.cardBox} style={{ width: "max-content" }}>
              <FormControl component="fieldset" className={classes.formControl}>
                <div>
                  <b>{getSingleSigneeItem?.data?.preferences?.no_of_shift}</b>{" "}
                  Shift
                </div>
              </FormControl>
            </Card>
          </div>

          <div>
            <p className="f-500 mb-2">Travel for work</p>
            <Card className={classes.cardBox} style={{ width: "max-content" }}>
              <FormControl component="fieldset" className={classes.formControl}>
                <div>
                  <FormControlLabel
                    style={{ cursor: "default" }}
                    control={
                      <Checkbox
                        checked={
                          getSingleSigneeItem?.data?.preferences?.is_travel ===
                          1
                            ? true
                            : false
                        }
                        name="monday_day"
                        color="primary"
                        style={{ cursor: "default" }}
                      />
                    }
                    label="Yes"
                  />
                  <FormControlLabel
                    style={{ cursor: "default" }}
                    control={
                      <Checkbox
                        checked={
                          getSingleSigneeItem?.data?.preferences?.is_travel ===
                          0
                            ? true
                            : false
                        }
                        name="monday_night"
                        color="primary"
                        style={{ cursor: "default" }}
                      />
                    }
                    label="No"
                  />
                </div>
              </FormControl>
            </Card>
          </div>
        </Grid>
      </Grid>

      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Compliance Document Details
      </Typography>
      {getSingleSigneeItem?.data &&
        getSingleSigneeItem?.data?.documents &&
        Object.entries(getSingleSigneeItem?.data?.documents).map(
          (list, index) => {
            return (
              <Paper className={`${classes.root1}`} key={index}>
                <Grid container spacing={2}>
                  <Grid item xs={12} style={{ display: "flex" }}>
                    <InfoIcon style={{ marginRight: 12, opacity: "0.6" }} />
                    <Typography className={classes.mainTitle}>
                      {list[0] === "passport"
                        ? "Copy of Passport in Colour including front cover. (Right to work)"
                        : ""}
                      {list[0] === "immunisation_records"
                        ? "Immunisation records - Proof of immunity for (Varicella, Tuberculosis, Rubella, Measles, Hep B Level 100). Blood results needs to be traceable to exact Clinic/ source. For EPP clearance ( HIV 1 & 2) Hep C and Hep B surface antigen ( IVS)"
                        : ""}
                      {list[0] === "training_certificates"
                        ? "Mandatory training certificates- Fire safety, BLS,MH, Infection control, safeguarding child/Adult etc"
                        : ""}
                      {list[0] === "nursing_certificates"
                        ? "Nursing Certificates/ Diploma/NVQ"
                        : ""}
                      {list[0] === "professional_indemnity_insurance"
                        ? "Proof of Current Professional Indemnity Insurance"
                        : ""}
                      {list[0] === "nmc_statement"
                        ? "NMC statement of entry"
                        : ""}
                      {list[0] === "dbs_disclosure_certificate"
                        ? "DBS disclosure certificate- Front and back"
                        : ""}
                      {list[0] === "cv"
                        ? "CV- Work history from school leaving age with no gaps. Please ensure that all dates are in (DD/MM/YY) format"
                        : ""}
                      {list[0] === "employment"
                        ? "TWO references covering the last 3 years of employment (must include hospital/company stamp or company/hospital logo letter head)"
                        : ""}
                      {list[0] === "address_proof"
                        ? "TWO proofs of address dated within last 3 months (bank statement, utility bill, official government letter etc.)"
                        : ""}
                      {list[0] === "passport_photo"
                        ? "X1 passport Photo for ID badge"
                        : ""}
                      {list[0] === "proof_of_ni"
                        ? "Proof of NI- Any letter from HMRC showing NI number or Copy of NI card ( front & back Copy ) -We don’t accept payslips"
                        : ""}
                    </Typography>
                    <div className={classes.fileCon}>
                      <button className="btn1">
                        <PublishIcon className="mr-3" />
                        <input
                          key={key1}
                          accept="image/*,.pdf"
                          type="file"
                          multiple
                          name="files"
                          onChange={(e) => handleClick(e, list[0])}
                        />
                        <span>Upload files</span>
                      </button>
                    </div>

                    <div className={classes.selectCon}>
                      {list[1].length > 0 && (
                        <>
                          <FormControl
                            variant="outlined"
                            className={classes.formControl}
                            fullWidth
                          >
                            <Select
                              value={list[1][0]?.document_status || ""}
                              name={list[0]}
                              onChange={(e) =>
                                handleComplianceStatus(
                                  e,
                                  getSingleSigneeItem?.data?.parent_id
                                )
                              }
                              defaultValue={0}
                              className={classes.statusSelect}
                            >
                              <MenuItem value="PENDING">PENDING</MenuItem>
                              <MenuItem value="SUCCESS">ACCEPTED</MenuItem>
                              <MenuItem value="REJECTED">REJECTED</MenuItem>
                            </Select>
                          </FormControl>
                        </>
                      )}
                    </div>
                  </Grid>
                  {list[1].map((fileList, index2) => {
                    const filename = `${fileList.file_name}`;
                    const extension = filename.split(".").pop();
                    return (
                      <Grid
                        item
                        xs={12}
                        className={classes.boxContainer}
                        key={index2}
                      >
                        <div className="compliance-container">
                          <div
                            className="image-icon"
                            style={{ marginRight: 12, opacity: "0.6" }}
                          >
                            {extension === "pdf" ? (
                              <PictureAsPdfIcon />
                            ) : (
                              <InsertPhotoOutlinedIcon />
                            )}
                          </div>
                          <Link
                            style={{ minWidth: "650px" }}
                            to={{ pathname: `${baseUrl}${filename}` }}
                            target="_blank"
                          >
                            {filename}
                          </Link>
                          <span style={{ float: "right" }}>
                            Expire Date: {fileList?.expire_date || "N/A"}
                          </span>
                        </div>
                      </Grid>
                    );
                  })}
                  {list[1].length === 0 && (
                    <Grid item xs={12} className={classes.boxContainer}>
                      <div className="compliance-container">
                        <span style={{ paddingLeft: 35, opacity: "0.6" }}>
                          Sorry, document does't exist
                        </span>
                      </div>
                    </Grid>
                  )}
                </Grid>
              </Paper>
            );
          }
        )}
      <Typography variant="h5" style={{ marginBottom: 16 }}>
        Contact Event list
      </Typography>
      <Paper className={`${classes.root} mb-6`}>
        <Box className="mb-5" display="flex" alignItems="center">
          <SearchIcon
            className={classes.searchIcondet}
            onClick={handleClickSearch}
          />
          <div className={classes.search}>
            <InputBase
              name="search"
              placeholder="Search…"
              onChange={handleSearchChange}
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
            />
          </div>
          <div className="ml-5">
            <Button
              variant="contained"
              color="secondary"
              onClick={handleClickOpen}
            >
              <AddIcon className="mr-2" />
              Add Contact Event
            </Button>
          </div>
        </Box>

        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="left">Date</TableCell>
              <TableCell align="left">Comment</TableCell>
              <TableCell align="left">By</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getCandidateEventItem?.data &&
              getCandidateEventItem?.data.map((row, index) => {
                return (
                  <TableRow key={index}>
                    <TableCell scope="row">{index + 1}</TableCell>
                    <TableCell align="left">
                      {moment(row.created_at).format("DD MMM YYYY hh:mm A")}
                    </TableCell>
                    <TableCell align="left">{row.comment}</TableCell>
                    <TableCell align="left">{`${row.first_name} ${row.last_name}`}</TableCell>
                  </TableRow>
                );
              })}

            {getCandidateEventItem?.data == "" && (
              <TableRow>
                <TableCell scope="row" colSpan="6">
                  <div className="" align="center">
                    Sorry, Event not available!
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <Box className="mt-5" display="flex" justifyContent="flex-end">
          <Pagination
            onChange={handleChangePage}
            page={page}
            count={getCandidateEventItem?.data?.last_page}
            showFirstButton
            showLastButton
          />
        </Box>
      </Paper>

      <AlertDialog
        id={Id}
        open={deleteOpen}
        close={deleteRoleClose}
        response={alertResponse}
        title="Delete Candidate"
        description="Are you sure you want to delete?"
        buttonName="Delete"
      />
    </>
  );
};

export default DetailSignee;
