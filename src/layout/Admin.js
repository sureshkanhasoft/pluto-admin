import React from 'react';
import { makeStyles } from '@material-ui/core';
import {
    Switch, Route, Redirect,
    // useRouteMatch 
} from "react-router-dom";
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar/Sidebar';
import routes from '../routes.js';

const drawerWidth = 240;

const useStyles = makeStyles(() => ({
    mainContainer: {
        marginLeft: drawerWidth,
        height: "100%"
    },
    innerMainContainer: {
        padding: "0 24px 24px",
    },
    sidebar: {
        width: drawerWidth
    }
}))


const Admin = ({ match }) => {
    const classes = useStyles();
    // let { url } = useRouteMatch();

    return (
        <>
            <Sidebar
                routes={routes}
                sidebarWidth={classes.sidebar}
            />
            <div className={classes.mainContainer}>
                <Navbar />
                <div className={classes.innerMainContainer}>
                    <Switch>
                        {routes.filter(route => route.role ==  "organization").map((prop, key) => {
                            return (
                                <Route
                                    path={`${match.url}/${prop.path}`}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        })}
                        <Redirect from="/admin" to="/admin/bookings" />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Admin
