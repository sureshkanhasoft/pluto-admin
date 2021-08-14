import axios from "axios"
import Config from "../../../config/config"
import { CREATE_ORGANIZATION_SUCCESS, CREATE_STAFF_ERROR, CREATE_STAFF_REQUEST, GET_STAFF_ERROR, GET_STAFF_REQUEST, GET_STAFF_SUCCESS } from "../actiontypes";


export const getStaff = () => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getStaffRequest())
        await axios.get(`${Config.API_URL}api/organization/user/get-user-list`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data
            if (dataItem.status === true) {
                dispatch(getStaffSuccess(dataItem))
            } else {
                dispatch(getStaffError(dataItem))
            }
        }).catch(error => {
            dispatch(getStaffError(error))
        })
    }
}

const getStaffRequest = () => {
    return {
        type: GET_STAFF_REQUEST
    }
}

const getStaffSuccess = (data) => {
    return {
        type: GET_STAFF_SUCCESS,
        payload: data
    }
}

const getStaffError = (error) => {
    return {
        type: GET_STAFF_ERROR,
        payload: error
    }
}

export const createStaff = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(createStaffRequest())
        await axios.post(`${Config.API_URL}/api/organization/user/signup-user`, data, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(createStaffSuccess(data))
                // dispatch(getStaff(1, '', ''))
            } else {
                dispatch(createStaffFailure(data))
            }
        }).catch(error => {
            dispatch(createStaffFailure(error))
        })
    }
}

const createStaffRequest = () => {
    return {
        type: CREATE_STAFF_REQUEST
    }
}

const createStaffSuccess = (data) => {
    return {
        type: CREATE_ORGANIZATION_SUCCESS,
        payload: data
    }
}

const createStaffFailure = (error) => {
    return {
        type: CREATE_STAFF_ERROR,
        payload: error
    }
}
