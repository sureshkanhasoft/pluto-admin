import axios from 'axios';
import { LOGIN_REQUEST, LOGIN_SUCCESS, LOGIN_ERROR } from '../actiontypes';
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
        })
            .then(response => {
                const data = response.data
                if (data && data.status === true) {
                    dispatch(getLoginSuccess(data))
                    localStorage.setItem('token', JSON.stringify(data.data.token));
                    history.push('./super-admin')
                } else {
                    dispatch(getLoginFailure())
                }
            })
            .catch(error => {
                dispatch(getLoginFailure(error.message))
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