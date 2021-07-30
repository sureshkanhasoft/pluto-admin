import axios from 'axios';
import Config from '../../../config/config';
// import history from '../../../utils/HistoryUtils';
import { CREATE_ORGANIZATION_ERROR, CREATE_ORGANIZATION_REQUEST, CREATE_ORGANIZATION_SUCCESS, GET_ORGANIZATION_ERROR, GET_ORGANIZATION_REQUEST, GET_ORGANIZATION_SUCCESS } from '../actiontypes';
import { UPDATE_ORGANIZATION_ERROR, UPDATE_ORGANIZATION_REQUEST, UPDATE_ORGANIZATION_SUCCESS } from '../actiontypes';

export const getOrganization = ({pageNo=1, search = '', status = 'Active'}) => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getOrganizationRequest())
        await axios.get(`${Config.API_URL}api/superadmin/organization-list?search=${search}&status=${status}&page=${pageNo}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data;
            console.log('data111: ', dataItem.data.data);
            dispatch(getOrganizationSuccess(dataItem.data.data))
        }).catch(error => {
            dispatch(getOrganizationSuccess([]))
            dispatch(getOrganizationFailure(error))
            console.log("error.message", error.message);
        });
    }

}

export const getOrganizationRequest = () => {
    return {
        type: GET_ORGANIZATION_REQUEST
    }
}

export const getOrganizationSuccess = data => {
    return {
        type: GET_ORGANIZATION_SUCCESS,
        payload: data
    }
}

export const getOrganizationFailure = error => {
    return {
        type: GET_ORGANIZATION_ERROR,
        payload: error
    }
}

// -------------------------------------------

export const createOrganization = ( data ) => {
    return (dispatch) => {
        dispatch(createOrganizationRequest());
        const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
        axios.post(`${Config.API_URL}api/superadmin/signup`, data, {
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            console.log('data111: ', data);
            if (data && data.status === true) {
                dispatch(createOrganizationSuccess(data))
            }
        }).catch(error => {
            dispatch(createOrganizationFailure(error))
        })
    }
}

// export const createOrganization = ({
//     organization_name,
//     contact_person_name,
//     email,
//     contact_no,
//     address_line_1,
//     address_line_2,
//     city,
//     postcode }) => {
//     return (dispatch) => {
//         dispatch(createOrganizationRequest())
//         axios.post(`${Config.API_URL}api/superadmin/signup`, {
//             method: "POST",
//             headers: {
//                 'content-type': 'application/json',
//             },
//             organization_name,
//             contact_person_name,
//             email,
//             contact_no,
//             address_line_1,
//             address_line_2,
//             city,
//             postcode,
//         })
//             .then(response => {
//                 const data = response.data
//                 console.log('data111: ', data);
//                 if (data && data.status === true) {
//                     dispatch(createOrganizationSuccess(data))
//                 }
//             })
//             .catch(error => {
//                 dispatch(createOrganizationFailure(error))
//             })
//     }
// }

export const createOrganizationRequest = () => {
    return {
        type: CREATE_ORGANIZATION_REQUEST
    }
}

export const createOrganizationSuccess = data => {
    return {
        type: CREATE_ORGANIZATION_SUCCESS,
        payload: data
    }
}

export const createOrganizationFailure = error => {
    return {
        type: CREATE_ORGANIZATION_ERROR,
        payload: error
    }
}

// ----------------------


export const updateOrganization = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return (dispatch) => {
        dispatch(updateOrganizationRequest())
        axios.post(`${Config.API_URL}api/superadmin/update-org`, data, {
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            console.log('data11: ', data);
            if (data.status === true) {
                dispatch(updateOrganizationSuccess(data))
                // handleClose();
            }
        }).catch(error => {
            console.log('error: ', error);
            dispatch(updateOrganizationFailure(error))
        })
    }
}

export const updateOrganizationRequest = () => {
    return {
        type: UPDATE_ORGANIZATION_REQUEST
    }
}

export const updateOrganizationSuccess = data => {
    console.log('updateOrganizationSuccess: ', data);
    return {
        type: UPDATE_ORGANIZATION_SUCCESS,
        payload: data
    }
}

export const updateOrganizationFailure = error => {
    return {
        type: UPDATE_ORGANIZATION_ERROR,
        payload: error
    }
}