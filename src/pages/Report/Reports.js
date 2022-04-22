import React from 'react'
import { Route } from "react-router-dom";
import DetailBooking from './DetailBooking';
import ViewReports from './ViewReports' 


const Reports = ({ match }) => {
    return (
        <>
            <Route exact path={`${match.url}/`} component={ViewReports} />
            <Route exact path={`${match.url}/:id/detail`} component={DetailBooking} />
        </>
    )
}

export default Reports