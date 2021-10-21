import axios from "axios"
import { apiClient } from "../../../config/apiClient";
import Config from "../../../config/config"
import history from "../../../utils/HistoryUtils";
import { 
    GET_SIGNEE_ERROR, GET_SIGNEE_REQUETS, GET_SIGNEE_SUCCESS,
    CREATE_SIGNEE_ERROR, CREATE_SIGNEE_REQUETS, CREATE_SIGNEE_SUCCESS, 
    GET_CANDIDATE_REFERRED_FROM_SUCCESS, 
    UPDATE_SIGNEE_SUCCESS, UPDATE_SIGNEE_REQUETS, UPDATE_SIGNEE_ERROR, 
    GET_SINGLE_SIGNEE_REQUETS, GET_SINGLE_SIGNEE_SUCCESS, GET_SINGLE_SIGNEE_ERROR, 
    DELETE_SIGNEE_REQUETS, DELETE_SIGNEE_SUCCESS, DELETE_SIGNEE_ERROR, 
    CHANGE_SIGNEE_PRO_STATUS_REQUEST, CHANGE_SIGNEE_PRO_STATUS_SUCCESS, CHANGE_SIGNEE_PRO_STATUS_ERROR, 
    CHANGE_SIGNEE_COMP_STATUS_REQUEST, CHANGE_SIGNEE_COMP_STATUS_SUCCESS, CHANGE_SIGNEE_COMP_STATUS_ERROR, CHANGE_DOC_STATUS_REQUEST, CHANGE_DOC_STATUS_SUCCESS, CHANGE_DOC_STATUS_ERROR 
} from "../actiontypes";


export const getSignee = ({pageNo=1, search=""}) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getSigneeRequest())
        await axios.get(`${Config.API_URL}api/organization/get-signee?search=${search}&page=${pageNo}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data
            if (dataItem.status === true) {
                dispatch(getSigneeSuccess(dataItem))
            } else {
                dispatch(getSigneeSuccess(""))
                dispatch(getSigneeError(dataItem))
            }
        }).catch(error => {
            dispatch(getSigneeError(error))
        })
    }
}

const getSigneeRequest = () => {
    return {
        type: GET_SIGNEE_REQUETS
    }
}

const getSigneeSuccess = (data) => {
    return {
        type: GET_SIGNEE_SUCCESS,
        payload: data
    }
}

const getSigneeError = (error) => {
    return {
        type: GET_SIGNEE_ERROR,
        payload: error
    }
}

// ----------------------------------------------


export const createSignee = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(createSigneeRequest())
        await axios.post(`${Config.API_URL}api/organization/add-signee`, data, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(createSigneeSuccess(data))
                setTimeout(() => {
                    history.goBack();
                }, 2000);
            } else {
                // dispatch(createSigneeSuccess(""))
                dispatch(createSigneeFailure(data))
            }
        }).catch(error => {
            dispatch(createSigneeFailure(error))
        })
    }
}

const createSigneeRequest = () => {
    return {
        type: CREATE_SIGNEE_REQUETS
    }
}

const createSigneeSuccess = (data) => {
    return {
        type: CREATE_SIGNEE_SUCCESS,
        payload: data
    }
}

const createSigneeFailure = (error) => {
    return {
        type: CREATE_SIGNEE_ERROR,
        payload: error
    }
}


// -----------------------------------

export const updateSignee = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(updateSigneeRequest())
        await axios.put(`${Config.API_URL}api/organization/edit-signee`, data, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(updateSigneeSuccess(data))
                setTimeout(() => {
                    history.goBack();
                }, 2000);
            } else {
                dispatch(updateSigneeSuccess(""))
                dispatch(updateSigneeFailure(data))
            }
        }).catch(error => {
            dispatch(updateSigneeFailure(error))
        })
    }
}

const updateSigneeRequest = () => {
    return {
        type: UPDATE_SIGNEE_REQUETS
    }
}

const updateSigneeSuccess = (data) => {
    return {
        type: UPDATE_SIGNEE_SUCCESS,
        payload: data
    }
}

const updateSigneeFailure = (error) => {
    return {
        type: UPDATE_SIGNEE_ERROR,
        payload: error
    }
}

// ---------------------------------------

// -----------------------------------

export const getSingleSignee = (id) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getSingleSigneeRequest())
        await axios.get(`${Config.API_URL}api/organization/get-my-signee/${id}`, {
            'headers': {
                'Content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(getSingleSigneeSuccess(data))
            } else {
                dispatch(getSingleSigneeSuccess(""))
                dispatch(getSingleSigneeFailure(data))
            }
        }).catch(error => {
            dispatch(getSingleSigneeFailure(error))
        })
    }
}

const getSingleSigneeRequest = () => {
    return {
        type: GET_SINGLE_SIGNEE_REQUETS
    }
}

const getSingleSigneeSuccess = (data) => {
    return {
        type: GET_SINGLE_SIGNEE_SUCCESS,
        payload: data
    }
}

const getSingleSigneeFailure = (error) => {
    return {
        type: GET_SINGLE_SIGNEE_ERROR,
        payload: error
    }
}

// ---------------------------------------


export const getCandidateReferredFrom = () => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async (dispatch) => {
        // dispatch(getSigneeRequest())
        await axios.get(`${Config.API_URL}api/signee/candidate-referred-from`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data
            if (dataItem.status === true) {
                dispatch(getCandidateReferredFromSuccess(dataItem))
            } else {
                dispatch(getCandidateReferredFromSuccess(""))
            }
        }).catch(error => {
            console.log('error: ', error);
            // dispatch(getSigneeError(error))
        })
    }
}


const getCandidateReferredFromSuccess = (data) => {
    return {
        type: GET_CANDIDATE_REFERRED_FROM_SUCCESS,
        payload: data
    }
}


// -------------------------------------

export const deleteSignee = (role_id) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return async(dispatch) =>{
        dispatch(deleteSigneeRequest())
        await axios.delete(`${Config.API_URL}api/organization/delete-signee/${role_id}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(deleteSigneeSuccess(data))
                setTimeout(() => {
                    history.go(-2)
                }, 2000);
            } else {
                dispatch(deleteSigneeError(data))
            }
        }).catch(error => {
            dispatch(deleteSigneeError(error))
        })
    }
}

export const deleteSigneeRequest = () => {
    return {
        type: DELETE_SIGNEE_REQUETS
    }
}
export const deleteSigneeSuccess = (data) => {
    return {
        type: DELETE_SIGNEE_SUCCESS,
        payload:data
    }
}
export const deleteSigneeError = (error) => {
    return {
        type: DELETE_SIGNEE_ERROR,
        payload:error
    }
}

// -------------------------------------

export const signeeProStatus = (data) => {
    return async (dispatch) => {
        dispatch(signeeProStatusRequest())
        await apiClient(true).put(`api/organization/user/change-signee-profile-status`, data)
            .then(response => {
                const dataItem = response.data;
                dispatch(signeeProStatusSuccess(dataItem))
            }).catch(error => {
                dispatch(signeeProStatusFailure(error))
            });
    }
}

const signeeProStatusRequest = () => {
    return {
        type: CHANGE_SIGNEE_PRO_STATUS_REQUEST
    }
}

const signeeProStatusSuccess = (data) => {
    return {
        type: CHANGE_SIGNEE_PRO_STATUS_SUCCESS,
        payload: data
    }
}

const signeeProStatusFailure = (error) => {
    return {
        type: CHANGE_SIGNEE_PRO_STATUS_ERROR,
        payload: error
    }
}

// -------------------------------------

export const signeeCompStatus = (data) => {
    return async (dispatch) => {
        dispatch(signeeCompStatusRequest())
        await apiClient(true).post(`api/organization/change-signee-compliance-status`, data)
            .then(response => {
                const dataItem = response.data;
                dispatch(signeeCompStatusSuccess(dataItem))
            }).catch(error => {
                dispatch(signeeCompStatusFailure(error))
            });
    }
}

const signeeCompStatusRequest = () => {
    return {
        type: CHANGE_SIGNEE_COMP_STATUS_REQUEST
    }
}

const signeeCompStatusSuccess = (data) => {
    return {
        type: CHANGE_SIGNEE_COMP_STATUS_SUCCESS,
        payload: data
    }
}

const signeeCompStatusFailure = (error) => {
    return {
        type: CHANGE_SIGNEE_COMP_STATUS_ERROR,
        payload: error
    }
}


// -------------------------------------

export const changeDocStatus = (data) => {
    return async (dispatch) => {
        dispatch(changeDocStatusRequest())
        await apiClient(true).post(`api/organization/user/change-document-status`, data)
            .then(response => {
                const dataItem = response.data;
                dispatch(changeDocStatusSuccess(dataItem))
            }).catch(error => {
                dispatch(changeDocStatusFailure(error))
            });
    }
}

const changeDocStatusRequest = () => {
    return {
        type: CHANGE_DOC_STATUS_REQUEST
    }
}

const changeDocStatusSuccess = (data) => {
    return {
        type: CHANGE_DOC_STATUS_SUCCESS,
        payload: data
    }
}

const changeDocStatusFailure = (error) => {
    return {
        type: CHANGE_DOC_STATUS_ERROR,
        payload: error
    }
}