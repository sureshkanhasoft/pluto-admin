import React from 'react'

import CreateBooking from './CreateBooking';
import DetailBooking from './DetailBooking';
import ViewBooking from './ViewBooking';
// import routes from '../../routes';
import {
    // Switch, 
    Route
} from "react-router-dom";
import UpdateBooking from './UpdateBooking';

const Bookings = ({match}) => {
    return (
        <>
            <Route exact path={`${match.path}`} component={ViewBooking} />
            <Route path={`${match.url}/create`} component={CreateBooking} />
            <Route path={`${match.url}/:id/detail`} component={DetailBooking} />
            <Route path={`${match.url}/:id/update`} component={UpdateBooking} />
        </>
    )
}

export default Bookings
