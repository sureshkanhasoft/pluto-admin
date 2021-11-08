import React from 'react';
import {
  AppBar,
  Toolbar,
  makeStyles,
  Badge,
  IconButton,
  Menu,
  MenuItem
} from "@material-ui/core";
// import { useHistory } from "react-router-dom";
// import { useRouteMatch, useParams } from "react-router-dom";
import NotificationsIcon from '@material-ui/icons/Notifications';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import history from '../../utils/HistoryUtils';
import axios from 'axios';
import Config from '../../../src/config/config';
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
}));

const Navbar = () => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const loggedUser = localStorage.getItem("role").replace(/['"]+/g, '');

  const titleName = window.location.pathname.split("/").pop();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const openProfile = () =>{
    // const loggedUser = localStorage.getItem("role").replace(/['"]+/g, '');
    if(loggedUser === "ORGANIZATION"){
      history.push('/admin/organization-profile')
    } else if(loggedUser === "SUPERADMIN"){
      history.push('/super-admin/profile')
    } else {
      history.push('/staff/staff-profile')
    }
    handleClose()
  }

  const openChangePassword = () =>{
    if(loggedUser === "ORGANIZATION"){
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
  return (
    <AppBar position="static" className={classes.root}>
      <Toolbar>
        <h1 className={classes.title}>{titleName} </h1>
        <IconButton color="inherit">
          <Badge badgeContent={1} color="secondary">
            <NotificationsIcon color="primary" />
          </Badge>
        </IconButton>
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
  )
}

export default Navbar
