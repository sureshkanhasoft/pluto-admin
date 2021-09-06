import React from 'react';
import { Route } from 'react-router-dom'
import CreateSignee from './CreateSignee';
import DetailSignee from './DetailSignee';
import UpdateSignee from './UpdateSignee';
import ViewSignee from './ViewSignee'

const Signee = ({match}) => {
    return (
        <>
            <Route exact path={`${match.url}/`} component={ViewSignee} />
            <Route exact path={`${match.url}/create`} component={CreateSignee} />
            <Route exact path={`${match.url}/:id/update`} component={UpdateSignee} />
            <Route exact path={`${match.url}/:id/detail`} component={DetailSignee} />
        </>
    );
};

export default Signee;