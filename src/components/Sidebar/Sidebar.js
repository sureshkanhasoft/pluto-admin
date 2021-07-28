import React from 'react';
import {
    List,
    ListItem,
    ListItemText,
    Drawer,
    ListItemIcon,
    Icon,
    makeStyles,
    Box
} from "@material-ui/core";
import { NavLink, Link } from "react-router-dom";
import logo from '../../assets/images/logo.svg'

const useStyle = makeStyles({
    logoContainer: {
        padding: "24px 8px",
        background: "#02294f",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    drawer: {
        background: "#184a7b",
        boxShadow: "3px 0px 12px rgba(24, 74, 123,0.42)"
    },
    listItemIcon: {
        minWidth: 40,
        color: "#7897b4"
    },
    navLink: {
        color: "#fff",
        display: "block",
        width: "90%",
        margin: "12px auto",
        borderRadius: 4,
        "&.active": {
            background: "#ff8b46",
            "& .activeIcon": {
                color: "#fff"
            }
        }
    }
})

const Sidebar = (props) => {
    const { routes } = props;
    const classes = useStyle();
    let authAdmin = localStorage.getItem('admin');
    // let authSuperAdmin = localStorage.getItem('super-admin');
     const loginUserInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
     authAdmin = (loginUserInfo.role === 'SUPERADMIN') ? false : true;
    return (
        <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
            <Box className={classes.logoContainer}>
                <Link to="/admin/dashboard">
                    <img src={logo} alt="Pluto logo" />
                </Link>
            </Box>

            <List className={props.sidebarWidth}>
                {
                    authAdmin ? routes.filter(route => route.role === 'admin' && route.sidebar !== false).map((route, index) => (
                        <NavLink to={`/admin/${route.path}`} key={index} className={classes.navLink} activeClassName="active">
                            <ListItem button>
                                <ListItemIcon className={`${classes.listItemIcon} activeIcon`}>
                                    <Icon>{route.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={route.name} />
                            </ListItem>
                        </NavLink>
                    )) : routes.filter(route => route.role === 'superAdmin').map((route, index) => (
                        <NavLink to={`/super-admin/${route.path}`} key={index} className={classes.navLink} activeClassName="active">
                            <ListItem button>
                                <ListItemIcon className={`${classes.listItemIcon} activeIcon`}>
                                    <Icon>{route.icon}</Icon>
                                </ListItemIcon>
                                <ListItemText primary={route.name} />
                            </ListItem>
                        </NavLink>
                    ))
                }
            </List>

        </Drawer>
    )
}

export default Sidebar
