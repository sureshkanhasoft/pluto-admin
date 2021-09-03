import axios from "axios"
import Config from "../../../config/config"
import history from "../../../utils/HistoryUtils";
import { CREATE_STAFF_ERROR, CREATE_STAFF_REQUEST, CREATE_STAFF_SUCCESS, 
    DELETE_STAFF_ERROR, DELETE_STAFF_REQUEST, DELETE_STAFF_SUCCESS, 
    // DETAIL_STAFF_ERROR, DETAIL_STAFF_REQUEST, DETAIL_STAFF_SUCCESS, 
    GET_STAFF_ERROR, GET_STAFF_REQUEST, GET_STAFF_SUCCESS, 
    UPDATE_STAFF_ERROR, UPDATE_STAFF_REQUEST, UPDATE_STAFF_SUCCESS } from "../actiontypes";


export const getStaff = ({pageNo=1, search}) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getStaffRequest())
        await axios.get(`${Config.API_URL}api/organization/user/get-user-list?search=${search}&page=${pageNo}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data
            if (dataItem.status === true) {
                dispatch(getStaffSuccess(dataItem))
            } else {
                dispatch(getStaffSuccess(""))
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
                setTimeout(() => {
                    history.goBack();
                }, 2000);
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
    const {user_id} = data;
    const data1 = {...data, id:user_id}
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(updateStaffRequest())
        await axios.put(`${Config.API_URL}api/organization/user/edit-user`, data1, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(updateStaffSuccess(data))
                setTimeout(() => {
                    history.goBack();
                }, 2000);
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

// --------------------------


export const deleteStaff = (id) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(deleteStaffRequest())
        await axios.delete(`${Config.API_URL}api/organization/user/delete-user/${id}`, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(deleteStaffSuccess(data))
                setTimeout(() => {
                    history.go(-2)
                }, 2000);
            } else {
                dispatch(deleteStaffFailure(data))
            }
        }).catch(error => {
            dispatch(deleteStaffFailure(error))
        })
    }
}

const deleteStaffRequest = () => {
    return {
        type: DELETE_STAFF_REQUEST
    }
}

const deleteStaffSuccess = (data) => {
    return {
        type: DELETE_STAFF_SUCCESS,
        payload: data
    }
}

const deleteStaffFailure = (error) => {
    return {
        type: DELETE_STAFF_ERROR,
        payload: error
    }
}