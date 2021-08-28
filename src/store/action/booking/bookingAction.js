import axios from "axios";
import apiConfigs from "../../../config/config";
import {
    CREATE_BOOKING_ERROR, CREATE_BOOKING_REQUEST, CREATE_BOOKING_SUCCESS,
    DELETE_BOOKING_ERROR, DELETE_BOOKING_REQUEST, DELETE_BOOKING_SUCCESS,
    GET_BOOKING_ERROR, GET_BOOKING_REQUEST, GET_BOOKING_SUCCESS,
    UPDATE_BOOKING_ERROR, UPDATE_BOOKING_REQUEST, UPDATE_BOOKING_SUCCESS
} from "../actiontypes";

export const getBooking = () => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getBookingRequest())
        await axios.get(`${apiConfigs.API_URL}api/organization/booking-by-status/OPEN`, {
            'headers': {
                'content-type': 'application/type',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            console.log('response: ', response);
            dispatch(getBookingSuccess(response.data))
        }).catch(error => {
            dispatch(getBookingError(error))
        })
    }
}

const getBookingRequest = () => {
    return {
        type: GET_BOOKING_REQUEST
    }
}

const getBookingSuccess = (data) => {
    return {
        type: GET_BOOKING_SUCCESS,
        payload: data
    }
}

const getBookingError = (error) => {
    return {
        type: GET_BOOKING_ERROR,
        payload: error
    }
}

// -------------------------------

export const createBooking = (data) => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(createBookingRequest())
        await axios.post(`${apiConfigs.API_URL}api/organization/add-booking`, data, {
            'headers': {
                'content-type': 'application/type',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            dispatch(createBookingSuccess(response.data))
        }).catch(error => {
            dispatch(createBookingError(error))
        })
    }
}

const createBookingRequest = () => {
    return {
        type: CREATE_BOOKING_REQUEST
    }
}

const createBookingSuccess = (data) => {
    return {
        type: CREATE_BOOKING_SUCCESS,
        payload: data
    }
}

const createBookingError = (error) => {
    return {
        type: CREATE_BOOKING_ERROR,
        payload: error
    }
}

// -------------------------------

export const updateBooking = (data) => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(updateBookingRequest())
        await axios.post(`${apiConfigs.API_URL}api/organization/edit-booking`, data, {
            'headers': {
                'content-type': 'application/type',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            dispatch(updateBookingSuccess(response.data))
        }).catch(error => {
            dispatch(updateBookingError(error))
        })
    }
}

const updateBookingRequest = () => {
    return {
        type: UPDATE_BOOKING_REQUEST
    }
}

const updateBookingSuccess = (data) => {
    return {
        type: UPDATE_BOOKING_SUCCESS,
        payload: data
    }
}

const updateBookingError = (error) => {
    return {
        type: UPDATE_BOOKING_ERROR,
        payload: error
    }
}

// -----------------------------------

export const deleteBooking = (id) => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(deleteBookingRequest())
        await axios.post(`${apiConfigs.API_URL}api/organization/erwe`, id, {
            'headers': {
                'content-type': 'application/type',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            dispatch(deleteBookingSuccess(response.data))
        }).catch(error => {
            dispatch(deleteBookingError(error))
        })
    }
}

const deleteBookingRequest = () => {
    return {
        type: DELETE_BOOKING_REQUEST
    }
}

const deleteBookingSuccess = (data) => {
    return {
        type: DELETE_BOOKING_SUCCESS,
        payload: data
    }
}

const deleteBookingError = (error) => {
    return {
        type: DELETE_BOOKING_ERROR,
        payload: error
    }
}