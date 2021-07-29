import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR, FORGOT_SUCCESS, FORGOT_ERROR, FORGOT_REQUEST ,
    CHANGE_PASSWORD_SUCCESS , CHANGE_PASSWORD_REQUEST,CHANGE_PASSWORD_ERROR
} from '../actiontypes';
import Config from '../../../config/config';
import history from '../../../utils/HistoryUtils';

export const login = ({ email, password }) => {
    return (dispatch) => {
        dispatch(getLoginRequest())
        axios.post(`${Config.API_URL}api/superadmin/signin`, {
            method: "POST",
            headers: {
                'content-type': 'application/json',
            },
            email,
            password
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(getLoginSuccess(data))
                dispatch(getLoginFailure(null))
                localStorage.setItem('loginUserInfo', JSON.stringify(data.data));
                localStorage.setItem('token', JSON.stringify(data.data.token));
                if (data.data.role === 'SUPERADMIN') {
                    history.push('./super-admin')
                } else {
                    history.push('./admin')
                }
            } else {
                // console.log("Call Ellse ", data)
                dispatch(getLoginFailure(data))
                dispatch(getLoginSuccess(null))
            }
        }).catch(error => {
            dispatch(getLoginFailure(error.message))
        })
    }
}

export const forgotpassword = ({ email }) => {
    return (dispatch) => {
        dispatch(getForgotRequest());
        dispatch(getForgotSuccess(''));
        dispatch(getForgotFailure(''));
        axios.post(`${Config.API_URL}api/superadmin/forgot`, {
            headers: {
                'content-type': 'application/json',
            },
            email,
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(getForgotSuccess(data));
                // dispatch(getForgotFailure(''));
            } else {
                dispatch(getForgotFailure(data));
                // dispatch(getForgotSuccess(''));
            }
        }).catch(error => {
            dispatch(getForgotFailure(error.message));
        })
    }
}

export const changepassword = ({ decode_id, password, conform_password }) => {
    console.log("Call change password")
    console.log(decode_id, password, conform_password)
    return (dispatch) => {
        dispatch(getChangePasswordRequest());
        dispatch(getChangePasswordSuccess(''));
        dispatch(getChangePasswordFailure(''));
        axios.post(`${Config.API_URL}api/superadmin/reset-password`, {
            headers: {
                'content-type': 'application/json',
            },
            decode_id, 
            password, 
            conform_password
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(getChangePasswordSuccess(data));
            } else {
                dispatch(getChangePasswordFailure(data));
            }
        }).catch(error => {
            dispatch(getChangePasswordFailure(error.message));
        })
    }
}

export const getLoginRequest = () => {
    return {
        type: LOGIN_REQUEST
    }
}

export const getLoginSuccess = data => {
    return {
        type: LOGIN_SUCCESS,
        payload: data
    }
}

export const getLoginFailure = error => {
    return {
        type: LOGIN_ERROR,
        payload: error
    }
}

export const getForgotRequest = () => {
    return {
        type: FORGOT_REQUEST
    }
}

export const getForgotSuccess = data => {
    return {
        type: FORGOT_SUCCESS,
        payload: data
    }
}

export const getForgotFailure = error => {
    return {
        type: FORGOT_ERROR,
        payload: error
    }
}

export const getChangePasswordRequest = () => {
    return {
        type: CHANGE_PASSWORD_REQUEST
    }
}

export const getChangePasswordSuccess = data => {
    return {
        type: CHANGE_PASSWORD_SUCCESS,
        payload: data
    }
}

export const getChangePasswordFailure = error => {
    return {
        type: CHANGE_PASSWORD_ERROR,
        payload: error
    }
}