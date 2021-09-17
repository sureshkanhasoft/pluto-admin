import React from 'react'

import CreateBooking from './CreateBooking';
import DetailBooking from './DetailBooking';
import ViewBooking from './ViewBooking';
// import routes from '../../routes';
import {
    Switch, 
    Route,
    Redirect
} from "react-router-dom";
import UpdateBooking from './UpdateBooking';

const Bookings = ({match}) => {
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
    return (
        <>
            <Switch>
                <Route exact path={`${match.path}`} component={ViewBooking} />
                {
                    (staffDetail !== "Finance") && <Route exact path={`${match.url}/create`} component={CreateBooking} />
                }
                
                <Route path={`${match.url}/:id/detail`} component={DetailBooking} />
                <Route path={`${match.url}/:id/update`} component={UpdateBooking} />
                <Redirect from="" to={`${match.url}`} />
            </Switch>
           
        </>
    )
}

export default Bookings
