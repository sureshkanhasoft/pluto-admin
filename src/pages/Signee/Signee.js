import React from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'
import CreateSignee from './CreateSignee';
import DetailSignee from './DetailSignee';
import UpdateSignee from './UpdateSignee';
import ViewSignee from './ViewSignee'

const Signee = ({match}) => {
    const staffDetail = JSON.parse(localStorage.getItem("staffDetail"));
    return (
        <>
         <Switch>
                <Route exact path={`${match.url}/`} component={ViewSignee} />
                {
                    (staffDetail !== "Finance") && <Route exact path={`${match.url}/create`} component={CreateSignee} />
                }
                {
                    (staffDetail !== "Finance") && <Route exact path={`${match.url}/:id/update`} component={UpdateSignee} />
                }
                
                <Route exact path={`${match.url}/:id/detail`} component={DetailSignee} />   
                <Redirect from="" to={`${match.url}`} />
            </Switch>
            
        </>
    );
};

export default Signee;