import React from 'react';
import { Route } from 'react-router-dom'
import CreateTrust from './CreateTrust'
import DetailTrust from './DetailTrust';
import UpdateTrust from './UpdateTrust';
import ViewTrust from './ViewTrust'

const Trust = ({ match }) => {
    return (
        <>
            <Route exact path={`${match.url}/`} component={ViewTrust} />
            <Route exact path={`${match.url}/create`} component={CreateTrust} />
            <Route exact path={`${match.url}/:id/detail`} component={DetailTrust} />
            <Route exact path={`${match.url}/:id/update`} component={UpdateTrust} />
        </>
    )
}

export default Trust