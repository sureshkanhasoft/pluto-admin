import axios from "axios";
import Config from '../../../config/config'
import history from "../../../utils/HistoryUtils";
import { 
    CHANGE_STAFF_PASS_REQUEST, CHANGE_STAFF_PASS_SUCCESS, CHANGE_STAFF_PASS_ERROR, 
    GET_STAFF_PROFILE_REQUEST, GET_STAFF_PROFILE_SUCCESS, GET_STAFF_PROFILE_ERROR, 
    UPDATE_STAFF_PROFILE_REQUEST, UPDATE_STAFF_PROFILE_SUCCESS, UPDATE_STAFF_PROFILE_ERROR
} from "../actiontypes";

export const staffChangePassword = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(changePasswordRequest())
        await axios.post(`${Config.API_URL}api/organization/change-password`, data,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            console.log('response: ', response);
            const data = response.data
            if (data.status === true) {
                dispatch(changePasswordSuccess(data))
                setTimeout(() => {
                    history.push('/staff')
                }, 2000);
            } else {
                dispatch(changePasswordError(data.message))
            }
        }).catch(error => {
            dispatch(changePasswordError(error))

        })
    }
}

export const changePasswordRequest = () => {
    return {
        type: CHANGE_STAFF_PASS_REQUEST
    }
}
export const changePasswordSuccess = (data) => {
    return {
        type: CHANGE_STAFF_PASS_SUCCESS,
        payload:data
    }
}
export const changePasswordError = (error) => {
    return {
        type: CHANGE_STAFF_PASS_ERROR,
        payload:error
    }
}

// -----------------------------

export const getStaffProfile = () => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(getStaffProfileRequest())
        await axios.get(`${Config.API_URL}api/organization/get-detail`,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(res => {
            dispatch(getStaffProfileSuccess(res.data))
        }).catch(error => {
            dispatch(getStaffProfileError(error))

        })
    }
}

export const getStaffProfileRequest = () => {
    return {
        type: GET_STAFF_PROFILE_REQUEST
    }
}
export const getStaffProfileSuccess = (data) => {
    return {
        type: GET_STAFF_PROFILE_SUCCESS,
        payload:data
    }
}
export const getStaffProfileError = (error) => {
    return {
        type: GET_STAFF_PROFILE_ERROR,
        payload:error
    }
}


// -----------------------------

export const updateStaffProfile = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(updateStaffProfileRequest())
        await axios.post(`${Config.API_URL}api/organization/update`, data,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(updateStaffProfileSuccess(data))
                dispatch(getStaffProfile())
            } else {
                dispatch(updateStaffProfileError(data))
            }
        }).catch(error => {
            dispatch(updateStaffProfileError(error))

        })
    }
}

export const updateStaffProfileRequest = () => {
    return {
        type: UPDATE_STAFF_PROFILE_REQUEST
    }
}
export const updateStaffProfileSuccess = (data) => {
    return {
        type: UPDATE_STAFF_PROFILE_SUCCESS,
        payload:data
    }
}
export const updateStaffProfileError = (error) => {
    return {
        type: UPDATE_STAFF_PROFILE_ERROR,
        payload:error
    }
}