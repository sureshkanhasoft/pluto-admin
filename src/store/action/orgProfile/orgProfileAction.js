import axios from "axios";
import Config from '../../../config/config'
import history from "../../../utils/HistoryUtils";
import { CHANGE_ORG_PASS_REQUEST, CHANGE_ORG_PASS_SUCCESS, CHANGE_ORG_PASS_ERROR, GET_ORG_PROFILE_REQUEST, GET_ORG_PROFILE_SUCCESS, GET_ORG_PROFILE_ERROR,
} from "../actiontypes";

export const orgChangePassword = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(changePasswordRequest())
        await axios.post(`${Config.API_URL}api/organization/change-password`, data,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(changePasswordSuccess(data))
                history.push('/admin')
                // dispatch(putNotify('data success'))
            } else {
                dispatch(changePasswordError('Invalid password'))
            }
        }).catch(error => {
            dispatch(changePasswordError(error))

        })
    }
}

export const changePasswordRequest = () => {
    return {
        type: CHANGE_ORG_PASS_REQUEST
    }
}
export const changePasswordSuccess = (data) => {
    return {
        type: CHANGE_ORG_PASS_SUCCESS,
        payload:data
    }
}
export const changePasswordError = (error) => {
    return {
        type: CHANGE_ORG_PASS_ERROR,
        payload:error
    }
}

// -----------------------------

export const getOrgProfile = () => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(getOrgProfileRequest())
        await axios.get(`${Config.API_URL}api/organization/get-detail`,{
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(res => {
            dispatch(getOrgProfileSuccess(res.data))
        }).catch(error => {
            dispatch(getOrgProfileError(error))

        })
    }
}

export const getOrgProfileRequest = () => {
    return {
        type: GET_ORG_PROFILE_REQUEST
    }
}
export const getOrgProfileSuccess = (data) => {
    return {
        type: GET_ORG_PROFILE_SUCCESS,
        payload:data
    }
}
export const getOrgProfileError = (error) => {
    return {
        type: GET_ORG_PROFILE_ERROR,
        payload:error
    }
}