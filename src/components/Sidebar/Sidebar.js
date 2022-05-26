import React, { useEffect, useState } from 'react';
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
import apiConfigs from '../../config/config';

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
    },
    bottomLogoContainer:{
        display:"flex",
        maxWidth:"90%",
        alignItems:"cener",
        justifyContent:"center",
        marginBottom:20
    }
})

const Sidebar = (props) => {
    const { routes } = props;
    const classes = useStyle();
    const [url, setUrl] = useState("")
    let authAdmin = localStorage.getItem('admin');
    // let authSuperAdmin = localStorage.getItem('super-admin');
     const loginUserInfo = JSON.parse(localStorage.getItem("loginUserInfo"));
     authAdmin = (loginUserInfo.role === 'SUPERADMIN') ? false : true;

     const getAuthLogin = loginUserInfo.role
     useEffect(() => {
        if(getAuthLogin.toLowerCase() === "organization"){
            setUrl("admin")
         } else if(getAuthLogin.toLowerCase() === "superadmin"){
            setUrl("super-admin")
         } else {
            setUrl("staff")
         }
     },[getAuthLogin])
     
    return (
        <Drawer variant="permanent" classes={{ paper: classes.drawer }}>
            <Box className={classes.logoContainer}>
                <Link to={(!authAdmin) ? '/super-admin/dashboard':'/admin/bookings'}>
                    <img src={logo} alt="Pluto logo" />
                </Link>
            </Box>

            <List className={props.sidebarWidth}>
                {
                    routes.filter(route => route.role ==  getAuthLogin.toLowerCase() && route.sidebar !== false).map((route, index) => (
                        <NavLink to={`/${url}/${route.path}`} key={index} className={classes.navLink} activeClassName="active">
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
            <Box className={classes.bottomLogoContainer}>
                <img src={(loginUserInfo?.profile_pic ? (apiConfigs.API_URL+ "uploads/org_logo/" + loginUserInfo?.profile_pic) : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtNWVnKZZfy-1CLo75eO5vLhTWFZyeyc7QaI6GgdSalXDIJOCA6t0DSdDDMabrTOdjdYs&usqp=CAU")} alt="Organization logo" />
            </Box>

        </Drawer>
    )
}

export default Sidebar
