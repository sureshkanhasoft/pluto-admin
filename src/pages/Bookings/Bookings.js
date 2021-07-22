import React from 'react'
import { Route } from "react-router-dom";
import CreateBooking from './CreateBooking';
import DetailBooking from './DetailBooking';
import ViewBooking from './ViewBooking';

const Bookings = ({ match }) => {
    return (
        <>
            <Route exact path={`${match.url}/`} component={ViewBooking} />
            <Route exact path={`${match.url}/create`} component={CreateBooking} />
            <Route exact path={`${match.url}/detail`} component={DetailBooking} />
        </>
    )
}

export default Bookings
