import React from 'react';
import { Route,Redirect, Switch } from 'react-router-dom'
import CreateTrust from './CreateTrust'
import DetailTrust from './DetailTrust';
import UpdateTrust from './UpdateTrust';
import ViewTrust from './ViewTrust'

const Trust = ({ match }) => {
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
    return (
        <>
        <Switch>
            <Route exact path={`${match.url}/`} component={ViewTrust} />
            {
                (staffDetail !== "Booking" && staffDetail !== "Finance") && <Route exact path={`${match.url}/create`} component={CreateTrust} />
            }
            {
                (staffDetail !== "Booking" && staffDetail !== "Finance") && <Route exact path={`${match.url}/:id/update`} component={UpdateTrust} />
            }
            <Route exact path={`${match.url}/:id/detail`} component={DetailTrust} />
            <Redirect from="" to={`${match.url}`} />
            
        </Switch>
        </>
    )
}

export default Trust