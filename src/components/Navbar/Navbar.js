import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Badge,
  IconButton,
  Menu,
  MenuItem, Typography
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import history from '../../utils/HistoryUtils';
import axios from 'axios';
import Config from '../../../src/config/config';
import LoadingComponent from '../Loading/Loading'
import Notification from '../Notification/Notification';
import { notificationClear } from '../../store/action/notificationMsg';
import { getNotification, readNotification } from '../../store/action';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    background: "transparent",
    boxShadow: "none",
    color: "#000"
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    textTransform: "capitalize"
  },
  menuBox: {
    '& .MuiMenu-list': {
      padding: 0,
      minWidth: 175,
      minHeight: "28px"
    },
    '& .MuiListItem-root': {
      borderBottom: '1px solid #dcdcdc',
      // width: 300,
      minWidth: 190,
      maxWidth: 350,
      '&:last-child': {
        borderBottom: 'none'
      }
    },
    '& .active': {
      backgroundColor: '#f78b46',
      color: "#fff",
      pointerEvent: 'none',
      cursor: "default"
    }
  },
  menuHeading: {
    fontSize: 15,

  },
  menuDesc: {
    fontSize: 13,
    whiteSpace: 'normal',
    color: "rgba(0, 0, 0, 0.7)",
    '&.isRead': {
      fontWeight: "500",
      color: "#000"
    }
  },
}));

// const notificationList = {
//   data:
//     [
//       {
//         "id": 883,
//         "signee_id": 138,
//         "organization_id": 40,
//         "message": "Your shift in sdgfxc hospital of vb ward at 25-11-2021 07:30 AM To 08:30 PM has been confirmed",
//         "status": "CONFIRMED",
//         "is_read": 0,
//         "is_sent": 1,
//         "created_at": "2021-11-23T05:10:15.000000Z",
//         "updated_at": "2021-11-23T06:51:48.000000Z",
//         "booking_id": 214,
//         "deleted_at": null
//       },
//       {
//         "id": 880,
//         "signee_id": 138,
//         "organization_id": 40,
//         "message": "Your shift in sdgfxc hospital of vb ward at 25-11-2021 07:30 AM To 08:30 PM has been created",
//         "status": "CREATED",
//         "is_read": 0,
//         "is_sent": 1,
//         "created_at": "2021-11-23T05:10:03.000000Z",
//         "updated_at": "2021-11-23T06:51:48.000000Z",
//         "booking_id": 214,
//         "deleted_at": null
//       },
//       {
//         "id": 855,
//         "signee_id": 138,
//         "organization_id": 40,
//         "message": "Your shift in fg hospital of fgh ward at 06-12-2021 07:30 AM To 08:30 PM has been created",
//         "status": "CREATED",
//         "is_read": 1,
//         "is_sent": 1,
//         "created_at": "2021-11-22T13:53:05.000000Z",
//         "updated_at": "2021-11-23T06:51:48.000000Z",
//         "booking_id": 209,
//         "deleted_at": null
//       },
//       {
//         "id": 852,
//         "signee_id": 138,
//         "organization_id": 40,
//         "message": "Your shift in fg hospital of fgh ward at 29-11-2021 07:30 AM To 08:30 PM has been created",
//         "status": "PENDING",
//         "is_read": 1,
//         "is_sent": 1,
//         "created_at": "2021-11-22T13:52:41.000000Z",
//         "updated_at": "2021-11-23T06:51:48.000000Z",
//         "booking_id": 208,
//         "deleted_at": null
//       },
//       {
//         "id": 837,
//         "signee_id": 138,
//         "organization_id": 40,
//         "message": "Your shift in fg hospital of fgh ward at 29-11-2021 07:30 AM To 08:30 PM has been created",
//         "status": "PENDING",
//         "is_read": 1,
//         "is_sent": 1,
//         "created_at": "2021-11-22T13:49:28.000000Z",
//         "updated_at": "2021-11-23T06:51:48.000000Z",
//         "booking_id": 208,
//         "deleted_at": null
//       }

//     ]
// }

const Navbar = () => {
  const classes = useStyles();
  const dispatch = useDispatch()
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationShow, setNotificationShow] = React.useState(null);
  const { status } = useSelector(state => state.loadingReducer)
  const { notificationList } = useSelector(state => state.notificationList)
  // console.log('notificationList: ', notificationList);
  const loadingStatus = status ? true : false
  var notificationInfo = useSelector((state) => state.notificationMsg)
  // const { notificationList} = useSelector((state)=>state.notification)

  const open = Boolean(anchorEl);
  const open1 = Boolean(notificationShow);
  const loggedUser = localStorage.getItem("role").replace(/['"]+/g, '');

  const titleName = window.location.pathname.split("/").pop();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleMenuNotification = (event) => {
    setNotificationShow(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setNotificationShow(null);
  };

  const openProfile = () => {
    // const loggedUser = localStorage.getItem("role").replace(/['"]+/g, '');
    if (loggedUser === "ORGANIZATION") {
      history.push('/admin/organization-profile')
    } else if (loggedUser === "SUPERADMIN") {
      history.push('/super-admin/profile')
    } else {
      history.push('/staff/staff-profile')
    }
    handleClose()
  }

  const openChangePassword = () => {
    if (loggedUser === "ORGANIZATION") {
      history.push('/admin/change-password')
    }
    handleClose()
  }

  const logout = () => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    axios.get(`${Config.API_URL}api/organization/logout`, {
      headers: {
        'content-type': 'application/json',
        'Authorization': `Bearer ${loggedInUser}`
      }
    }).then(response => {
      localStorage.clear();
      history.push('/login')
    }).catch(error => {
      console.log("error.message", error.message);
    });
  }

  const clearNotificationMsg = () => {
    let reqParam = { message: null, status: null, type: null }
    setTimeout(() => {
      dispatch(notificationClear(reqParam))
    }, 4000);
  }

  useEffect(() => {
    dispatch(getNotification(1))
  }, [])

  const unReadNotification = notificationList?.data && notificationList?.data.filter(val => val.is_read == 0).length;

  const readNotification1 = (e, val) => {
    e.preventDefault();
    const requestData = {
      notification_id: val.id,
      is_read: true,
      signee_id: val.signee_id
    }
    dispatch(readNotification(requestData))

  }
  const ReadAllNotification = () => {
    const requestData = {
      notification_id: "All",
      is_read: true,
    }
    dispatch(readNotification(requestData))
  }

  return (
    <>
      {/* common notification */}
      {notificationInfo?.message &&
        (
          <>
            <Notification
              data={notificationInfo?.message}
              status={notificationInfo?.status ? "success" : "error"}
            />
            {clearNotificationMsg()}
          </>
        )
      }
      {/* common notification */}

      {/* loading */}
      {
        loadingStatus &&
        <LoadingComponent status={loadingStatus} />
      }
      {/* loading */}

      <AppBar position="static" className={classes.root}>

        <Toolbar>
          <h1 className={classes.title}>{titleName} </h1>
          {
            loggedUser !== "SUPERADMIN" &&
            <IconButton color="inherit" onClick={handleMenuNotification}>
              <Badge badgeContent={unReadNotification} color="secondary">
                <NotificationsIcon color="primary" />
              </Badge>
            </IconButton>
          }

          <Menu
            anchorEl={notificationShow}
            open={open1}
            onClose={handleClose}
            // onClick={handleClose}
            getContentAnchorEl={null}
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            transformOrigin={{ vertical: "top", horizontal: "right" }}
            className={classes.menuBox}
          >
            {
              notificationList?.data && notificationList?.data.length > 0 ?

                notificationList?.data.map((val, index) => {
                  if (index < 5) {
                    return (
                      <MenuItem onClick={((e) => readNotification1(e, val))} style={{ background: val.is_read == 0 ? '#e7f2ff' : 'white' }} key={index}>
                        <div>
                          <Typography variant="body2" className={`${classes.menuDesc} ${val.is_read == 0 ? 'isRead' : ''}`}>{val.message} </Typography>
                        </div>
                      </MenuItem>
                    )
                  }
                }) :
                <MenuItem >
                  <div>
                    <Typography variant="h6" className={classes.menuHeading}>No Data Found </Typography>
                  </div>
                </MenuItem>
            }
            {notificationList?.data && notificationList?.data.length > 0 ?
              <MenuItem>
                <>
                  <Link to="/notification">
                    <Typography variant="caption">Show all notification</Typography>
                  </Link>
                  <span style={{ marginLeft: "auto" }} onClick={ReadAllNotification}>
                    <Typography variant="caption">Read all</Typography>
                  </span>
                </>

              </MenuItem> : ""
            }
          </Menu>

          <div className="ml-2">
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircleIcon color="primary" />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              getContentAnchorEl={null}
              anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={openProfile}>Profile</MenuItem>
              {/* {
              loggedUser === "ORGANIZATION" && <MenuItem onClick={openChangePassword}>Change password</MenuItem>
            } */}

              <MenuItem onClick={logout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}

export default Navbar
