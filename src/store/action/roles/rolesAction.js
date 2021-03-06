import axios from "axios";
import Config from '../../../config/config'
import { 
    CREATE_ROLE_ERROR, CREATE_ROLE_REQUEST, CREATE_ROLE_SUCCESS, 
    DELETE_ROLE_ERROR, 
    DELETE_ROLE_REQUEST, 
    DELETE_ROLE_SUCCESS, 
    GET_ROLE_ERROR, GET_ROLE_REQUEST, GET_ROLE_SUCCESS 
} from "../actiontypes";


export const getRoles = () => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(getRolesRequest())
        await axios.get(`${Config.API_URL}api/organization/get-all-role`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(getRolesSuccess(data))
            } else {
                dispatch(getRolesError(data))
            }
        }).catch(error => {
            dispatch(getRolesError(error))
        })
    }
}

export const getRolesRequest = () => {
    return {
        type: GET_ROLE_REQUEST
    }
}
export const getRolesSuccess = (data) => {
    return {
        type: GET_ROLE_SUCCESS,
        payload:data
    }
}
export const getRolesError = (error) => {
    return {
        type: GET_ROLE_ERROR,
        payload:error
    }
}

// --------------------------------


export const createRoles = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(createRolesRequest())
        await axios.post(`${Config.API_URL}api/organization/add-role`, data,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(createRolesSuccess(data))
                setTimeout(() => {
                    dispatch(getRoles())
                }, 2000);
            } else {
                dispatch(createRolesError(data))
            }
        }).catch(error => {
            dispatch(createRolesError(error))
        })
    }
}

export const createRolesRequest = () => {
    return {
        type: CREATE_ROLE_REQUEST
    }
}
export const createRolesSuccess = (data) => {
    return {
        type: CREATE_ROLE_SUCCESS,
        payload:data
    }
}
export const createRolesError = (error) => {
    return {
        type: CREATE_ROLE_ERROR,
        payload:error
    }
}


// -------------------------------------

export const deleteRoles = (role_id) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(deleteRolesRequest())
        await axios.delete(`${Config.API_URL}api/organization/delete-role/${role_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(deleteRolesSuccess(data))
                setTimeout(() => {
                    dispatch(getRoles())
                }, 2000);
            } else {
                dispatch(deleteRolesError(data))
            }
        }).catch(error => {
            dispatch(deleteRolesError(error))
        })
    }
}

export const deleteRolesRequest = () => {
    return {
        type: DELETE_ROLE_REQUEST
    }
}
export const deleteRolesSuccess = (data) => {
    return {
        type: DELETE_ROLE_SUCCESS,
        payload:data
    }
}
export const deleteRolesError = (error) => {
    return {
        type: DELETE_ROLE_ERROR,
        payload:error
    }
}