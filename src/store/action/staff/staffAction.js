import axios from "axios"
import Config from "../../../config/config"
import { CREATE_STAFF_ERROR, CREATE_STAFF_REQUEST, CREATE_STAFF_SUCCESS, GET_STAFF_ERROR, GET_STAFF_REQUEST, GET_STAFF_SUCCESS, UPDATE_STAFF_ERROR, UPDATE_STAFF_REQUEST, UPDATE_STAFF_SUCCESS } from "../actiontypes";


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
        await axios.post(`${Config.API_URL}api/organization/user/signup-user`, data, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(createStaffSuccess(data))
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
        type: CREATE_STAFF_SUCCESS,
        payload: data
    }
}

const createStaffFailure = (error) => {
    return {
        type: CREATE_STAFF_ERROR,
        payload: error
    }
}


// -----------------------------------

export const updateStaff = (data) => {
    const data1 = {...data, user_id:69}
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(updateStaffRequest())
        await axios.post(`${Config.API_URL}api/organization/user/edit-user`, data1, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(updateStaffSuccess(data))
            } else {
                dispatch(updateStaffFailure(data))
            }
        }).catch(error => {
            dispatch(updateStaffFailure(error))
        })
    }
}



const updateStaffRequest = () => {
    return {
        type: UPDATE_STAFF_REQUEST
    }
}

const updateStaffSuccess = (data) => {
    return {
        type: UPDATE_STAFF_SUCCESS,
        payload: data
    }
}

const updateStaffFailure = (error) => {
    return {
        type: UPDATE_STAFF_ERROR,
        payload: error
    }
}