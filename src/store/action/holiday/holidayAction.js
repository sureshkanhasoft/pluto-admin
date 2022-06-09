import axios from "axios";
import Config from '../../../config/config'
import { 
    CREATE_HOLIDAY_ERROR, CREATE_HOLIDAY_REQUEST, CREATE_HOLIDAY_SUCCESS, 
    DELETE_HOLIDAY_ERROR, 
    DELETE_HOLIDAY_REQUEST, 
    DELETE_HOLIDAY_SUCCESS, 
    GET_HOLIDAY_ERROR, GET_HOLIDAY_REQUEST, GET_HOLIDAY_SUCCESS 
} from "../actiontypes";
import { notificationFail, notificationSuccess } from "../notificationMsg";


export const getHoliday = () => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(getHolidayRequest())
        await axios.get(`${Config.API_URL}api/superadmin/holiday`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(getHolidaySuccess(data))
            } else {
                dispatch(getHolidayError(data))
            }
        }).catch(error => {
            dispatch(getHolidayError(error))
        })
    }
}

export const getHolidayRequest = () => {
    return {
        type: GET_HOLIDAY_REQUEST
    }
}
export const getHolidaySuccess = data  => {
    return {
        type: GET_HOLIDAY_SUCCESS,
        payload:data
    }
}
export const getHolidayError = (error) => {
    return {
        type: GET_HOLIDAY_ERROR,
        payload:error
    }
}

// --------------------------------


export const createHoliday = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(createHolidayRequest())
        await axios.post(`${Config.API_URL}api/superadmin/holiday`, data,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(createHolidaySuccess(data))
                setTimeout(() => {
                    dispatch(getHoliday())
                }, 2000);
            } else {
                dispatch(createHolidayError(data))
            }
        }).catch(error => {
            dispatch(createHolidayError(error))
        })
    }
}

export const createHolidayRequest = () => {
    return {
        type: CREATE_HOLIDAY_REQUEST
    }
}
export const createHolidaySuccess = (data) => {
    return {
        type: CREATE_HOLIDAY_SUCCESS,
        payload:data
    }
}
export const createHolidayError = (error) => {
    return {
        type: CREATE_HOLIDAY_ERROR,
        payload:error
    }
}


// -------------------------------------

export const deleteHoliday = (holiday_id) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(deleteHolidayRequest())
        await axios.delete(`${Config.API_URL}api/superadmin/holiday/${holiday_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(deleteHolidaySuccess(data))
                dispatch(notificationSuccess(data.message))
                setTimeout(() => {
                    dispatch(getHoliday())
                }, 2000);
            } else {
                dispatch(deleteHolidayError(data.message))
                dispatch(notificationFail(data.message))
            }
        }).catch(error => {
            dispatch(deleteHolidayError(error.response.data))
            dispatch(notificationFail(error.response.data))
        })
    }
}

export const deleteHolidayRequest = () => {
    return {
        type: DELETE_HOLIDAY_REQUEST
    }
}
export const deleteHolidaySuccess = (data) => {
    return {
        type: DELETE_HOLIDAY_SUCCESS,
        payload:data
    }
}
export const deleteHolidayError = (error) => {
    return {
        type: DELETE_HOLIDAY_ERROR,
        payload:error
    }
}