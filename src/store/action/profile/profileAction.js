import axios from "axios";
import Config from '../../../config/config'
import { GET_PROFILE_ERROR, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS, 
    UPDATE_PROFILE_ERROR, UPDATE_PROFILE_REQUEST, UPDATE_PROFILE_SUCCESS 
} from "../actiontypes";

export const getProfile = () => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(getProfileRequest())
        await axios.get(`${Config.API_URL}api/superadmin/get-detail`,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(res => {
            dispatch(getProfileSuccess(res.data))
        }).catch(error => {
            dispatch(getProfileError(error))

        })
    }
}

export const getProfileRequest = () => {
    return {
        type: GET_PROFILE_REQUEST
    }
}
export const getProfileSuccess = (data) => {
    return {
        type: GET_PROFILE_SUCCESS,
        payload:data
    }
}
export const getProfileError = (error) => {
    return {
        type: GET_PROFILE_ERROR,
        payload:error
    }
}

// -----------------------------

export const updateProfile = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(updateProfileRequest())
        await axios.post(`${Config.API_URL}api/superadmin/update-profile`, data,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(updateProfileSuccess(data))
                dispatch(getProfile())
            }
        }).catch(error => {
            dispatch(updateProfileError(error))

        })
    }
}

export const updateProfileRequest = () => {
    return {
        type: UPDATE_PROFILE_REQUEST
    }
}
export const updateProfileSuccess = (data) => {
    return {
        type: UPDATE_PROFILE_SUCCESS,
        payload:data
    }
}
export const updateProfileError = (error) => {
    return {
        type: UPDATE_PROFILE_ERROR,
        payload:error
    }
}