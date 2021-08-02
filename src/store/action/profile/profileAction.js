import axios from "axios";
import Config from '../../../config/config'
import { GET_PROFILE_ERROR, GET_PROFILE_REQUEST, GET_PROFILE_SUCCESS } from "../actiontypes";

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