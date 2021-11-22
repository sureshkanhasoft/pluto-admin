import axios from 'axios';
import Config from '../../../config/config';
// import history from '../../../utils/HistoryUtils';
import { CREATE_ORGANIZATION_ERROR, CREATE_ORGANIZATION_REQUEST, CREATE_ORGANIZATION_SUCCESS, GET_ORGANIZATION_ERROR, GET_ORGANIZATION_REQUEST, GET_ORGANIZATION_SUCCESS } from '../actiontypes';
import { UPDATE_ORGANIZATION_ERROR, UPDATE_ORGANIZATION_REQUEST, UPDATE_ORGANIZATION_SUCCESS } from '../actiontypes';
import { loadingRequest, loadingSuccess, loadingFail} from "../globalLoading";
import { notificationFail, notificationSuccess } from '../notificationMsg';

const defaultLoadingRequest = true;
const defaultLoadingSuccess = false;
const defaultLoadingFail = false;

export const getOrganization = ({pageNo=1, search = '', status = ''}) => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getOrganizationRequest())
        await axios.get(`${Config.API_URL}api/superadmin/organization-list?search=${search}&status=${status}&page=${pageNo}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data;
            dispatch(getOrganizationSuccess(dataItem.data))
        }).catch(error => {
            dispatch(getOrganizationSuccess([]))
            dispatch(getOrganizationFailure(error))
        });
    }

}

export const getOrganizationRequest = () => {
    return {
        type: GET_ORGANIZATION_REQUEST
    }
}

export const getOrganizationSuccess = data => {
    return {
        type: GET_ORGANIZATION_SUCCESS,
        payload: data
    }
}

export const getOrganizationFailure = error => {
    return {
        type: GET_ORGANIZATION_ERROR,
        payload: error
    }
}

// -------------------------------------------

export const createOrganization = ( data ) => {
    return (dispatch) => {
        dispatch(createOrganizationRequest());
        const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
        axios.post(`${Config.API_URL}api/superadmin/signup`, data, {
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(createOrganizationSuccess(data))
                dispatch(getOrganization( 1, '', ''))
            }else {
                dispatch(createOrganizationFailure(data))
            }
        }).catch(error => {
            dispatch(createOrganizationFailure(error))
        })
    }
}


export const createOrganizationRequest = () => {
    return {
        type: CREATE_ORGANIZATION_REQUEST
    }
}

export const createOrganizationSuccess = data => {
    return {
        type: CREATE_ORGANIZATION_SUCCESS,
        payload: data
    }
}

export const createOrganizationFailure = error => {
    return {
        type: CREATE_ORGANIZATION_ERROR,
        payload: error
    }
}

// ----------------------


export const updateOrganization = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return (dispatch) => {
        dispatch(updateOrganizationRequest())
        axios.post(`${Config.API_URL}api/superadmin/update-org`, data, {
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(updateOrganizationSuccess(data))
                // handleClose();
            }else{
                dispatch(updateOrganizationFailure(data))
            }
        }).catch(error => {
            dispatch(updateOrganizationFailure(error))
        })
    }
}

export const updateOrganizationRequest = () => {
    return {
        type: UPDATE_ORGANIZATION_REQUEST
    }
}

export const updateOrganizationSuccess = data => {
    return {
        type: UPDATE_ORGANIZATION_SUCCESS,
        payload: data
    }
}

export const updateOrganizationFailure = error => {
    return {
        type: UPDATE_ORGANIZATION_ERROR,
        payload: error
    }
}

// ----------------------

// change org status = Active/Inactive
export const changeOrgActivityStatus = (activityStatusParam,OrgListParam) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return (dispatch) => {
        // dispatch(loadingRequest(defaultLoadingRequest))
        axios.put(`${Config.API_URL}api/superadmin/change-org-activity-status`, activityStatusParam, {
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data && data.status === true) {
                dispatch(loadingSuccess(defaultLoadingSuccess))
                dispatch(getOrganization(OrgListParam))
                dispatch(notificationSuccess(data.message))
            }else {
                dispatch(loadingFail(defaultLoadingFail))
                dispatch(notificationFail(data.message))
            }
            dispatch(loadingSuccess(defaultLoadingSuccess))
        }).catch(error => {
            dispatch(loadingFail(defaultLoadingFail))
            dispatch(notificationFail(error.response.data.message))
        })
    }
}