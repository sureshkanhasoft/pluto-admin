import React from 'react'
import { Route } from "react-router-dom";
import CreateStaff from './CreateStaff';
import DetailStaff from './DetailStaff';
import UpdateStaff from './UpdateStaff';
import ViewStaff from './ViewStaff';

const Staff = ({ match }) => {
    return (
        <>
            <Route exact path={`${match.url}/`} component={ViewStaff} />
            <Route exact path={`${match.url}/create`} component={CreateStaff} />
            <Route exact path={`${match.url}/detail/:id`} component={DetailStaff} />
            <Route exact path={`${match.url}/detail/:id/update`} component={UpdateStaff} />
        </>
    )
}

export default Staff
