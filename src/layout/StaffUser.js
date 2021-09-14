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

const StaffUser = ({ match }) => {
    const classes = useStyles();
    
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
                        {routes.filter(route => route.role ==  "staff").map((prop, key) => {
                            return (
                                <Route
                                    path={`${match.path}/${prop.path}`}
                                    component={prop.component}
                                    key={key}
                                />
                            );
                        })}
                        <Redirect from="/staff" to="/staff/bookings" />
                    </Switch>
                </div>
            </div>

        </>
    )
}

export default StaffUser
