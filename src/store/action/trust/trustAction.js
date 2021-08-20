import axios from "axios"
import Config from "../../../config/config"
// import history from "../../../utils/HistoryUtils";
import { CREATE_TRUST_ERROR, CREATE_TRUST_REQUEST, CREATE_TRUST_SUCCESS, 
    DELETE_TRUST_ERROR, DELETE_TRUST_REQUEST, DELETE_TRUST_SUCCESS, 
    GET_TRUST_ERROR, GET_TRUST_REQUEST, GET_TRUST_SUCCESS, 
    UPDATE_TRUST_ERROR, UPDATE_TRUST_REQUEST, UPDATE_TRUST_SUCCESS } from "../actiontypes";


export const getTrust = ({ pageNo = 1 }) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getTrustRequest())
        await axios.get(`${Config.API_URL}api/organization/get-trust?page=${pageNo}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data
            if (dataItem.status === true) {
                dispatch(getTrustSuccess(dataItem))
            } else {
                dispatch(getTrustError(dataItem))
            }
        }).catch(error => {
            dispatch(getTrustError(error))
        })
    }
}

const getTrustRequest = () => {
    return {
        type: GET_TRUST_REQUEST
    }
}

const getTrustSuccess = (data) => {
    return {
        type: GET_TRUST_SUCCESS,
        payload: data
    }
}

const getTrustError = (error) => {
    return {
        type: GET_TRUST_ERROR,
        payload: error
    }
}

export const createTrust = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(createTrustRequest())
        await axios.post(`${Config.API_URL}api/organization/add-trust`, data, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            console.log('data res: ', data);
            if (data && data.status === true) {
                dispatch(createTrustSuccess(data))
                // setTimeout(() => {
                //     history.goBack();
                // }, 2000);
            } else {
                dispatch(createTrustFailure(data))
            }
        }).catch(error => {
            dispatch(createTrustFailure(error))
        })
    }
}

const createTrustRequest = () => {
    return {
        type: CREATE_TRUST_REQUEST
    }
}

const createTrustSuccess = (data) => {
    return {
        type: CREATE_TRUST_SUCCESS,
        payload6: data
    }
}

const createTrustFailure = (error) => {
    return {
        type: CREATE_TRUST_ERROR,
        payload: error
    }
}

// -------------------------

export const updateTrust = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(updateTrustRequest())
        await axios.post(`${Config.API_URL}api/organization/update-trust`, data, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(updateTrustSuccess(data))
                // setTimeout(() => {
                //     history.goBack();
                // }, 2000);
            } else {
                dispatch(updateTrustFailure(data))
            }
        }).catch(error => {
            dispatch(updateTrustFailure(error))
        })
    }
}

const updateTrustRequest = () => {
    return {
        type: UPDATE_TRUST_REQUEST
    }
}

const updateTrustSuccess = (data) => {
    return {
        type: UPDATE_TRUST_SUCCESS,
        payload: data
    }
}

const updateTrustFailure = (error) => {
    return {
        type: UPDATE_TRUST_ERROR,
        payload: error
    }
}

// -------------------------

export const deleteTrust = (id) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(deleteTrustRequest())
        await axios.post(`${Config.API_URL}api/organization/delete-trust/${id}`, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(deleteTrustSuccess(data))
                // setTimeout(() => {
                //     history.goBack();
                // }, 2000);
            } else {
                dispatch(deleteTrustFailure(data))
            }
        }).catch(error => {
            dispatch(deleteTrustFailure(error))
        })
    }
}

const deleteTrustRequest = () => {
    return {
        type: DELETE_TRUST_REQUEST
    }
}

const deleteTrustSuccess = (data) => {
    return {
        type: DELETE_TRUST_SUCCESS,
        payload: data
    }
}

const deleteTrustFailure = (error) => {
    return {
        type: DELETE_TRUST_ERROR,
        payload: error
    }
}
