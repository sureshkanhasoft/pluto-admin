import axios from 'axios';
import Config from '../../../config/config';
// import history from '../../../utils/HistoryUtils';
import { CREATE_ORGANIZATION_ERROR, CREATE_ORGANIZATION_REQUEST, CREATE_ORGANIZATION_SUCCESS } from '../actiontypes';
import { UPDATE_ORGANIZATION_ERROR, UPDATE_ORGANIZATION_REQUEST, UPDATE_ORGANIZATION_SUCCESS } from '../actiontypes';

export const createOrganization = ({
    organization_name,
    contact_person_name,
    email,
    contact_no,
    address_line_1,
    address_line_2,
    city,
    postcode }) => {
    return (dispatch) => {
        dispatch(createOrganizationRequest())
        axios.post(`${Config.API_URL}api/organization/signup`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            organization_name,
            contact_person_name,
            email,
            contact_no,
            address_line_1,
            address_line_2,
            city,
            postcode,
            password: "164747"
        })
            .then(response => {
                const data = response.data
                console.log('data111: ', data);
                if (data && data.status === true) {
                    dispatch(createOrganizationSuccess(data))
                }
            })
            .catch(error => {
                dispatch(createOrganizationFailure(error))
            })
    }
}

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


export const updateOrganization = ({
    organization_name,
    contact_person_name,
    email,
    contact_no,
    address_line_1,
    address_line_2,
    city,
    postcode }) => {
    return (dispatch) => {
        dispatch(updateOrganizationRequest())
        axios.post(`${Config.API_URL}api/superadmin/update-org`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            organization_name,
            contact_person_name,
            email,
            contact_no,
            address_line_1,
            address_line_2,
            city,
            postcode,
        })
            .then(response => {
                const data = response.data
                console.log('data111: ', data);
                if (data && data.status === true) {
                    dispatch(updateOrganizationSuccess(data))
                }
            })
            .catch(error => {
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