import React from 'react'

import CreateBooking from './CreateBooking';
import DetailBooking from './DetailBooking';
import ViewBooking from './ViewBooking';
// import routes from '../../routes';
import {
    // Switch, 
    Route
} from "react-router-dom";

const Bookings = ({match}) => {
    // console.log('props: ', props);
    return (
        <>
            {/* <Switch>
                {routes.map((item, key) => {
                    console.log('item: ', item);
                    return (
                        item.map((prop, key) => {
                            return (
                                <Route
                                    path={`${match.path}`}
                                    component={prop.component}
                                    key={key}
                                />
                            )
                        })
                    );
                })}
            </Switch> */}

            <Route exact path={`${match.path}`} component={ViewBooking} />
            <Route path={`${match.url}/create`} component={CreateBooking} />
            <Route path={`${match.url}/detail`} component={DetailBooking} />
        </>
    )
}

export default Bookings
