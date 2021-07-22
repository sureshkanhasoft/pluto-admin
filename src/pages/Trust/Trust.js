import React from 'react';
import { Route } from 'react-router-dom'
import CreateTrust from './CreateTrust'
import DetailTrust from './DetailTrust';
import ViewTrust from './ViewTrust'

const Trust = ({ match }) => {
    return (
        <>
            <Route exact path={`${match.url}/`} component={ViewTrust} />
            <Route exact path={`${match.url}/create`} component={CreateTrust} />
            <Route exact path={`${match.url}/detail`} component={DetailTrust} />
        </>
    )
}

export default Trust