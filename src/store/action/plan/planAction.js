import axios from 'axios';
import Config from '../../../config/config';
import { GET_PLAN_ERROR, GET_PLAN_REQUEST, GET_PLAN_SUCCESS, UPDATE_PLAN_ERROR, 
    UPDATE_PLAN_REQUEST, UPDATE_PLAN_SUCCESS } from '../actiontypes';
import { loadingRequest, loadingSuccess, loadingFail} from "../globalLoading";
import { notificationFail, notificationSuccess } from '../notificationMsg';

const defaultLoadingRequest = true;
const defaultLoadingSuccess = false;
const defaultLoadingFail = false;

export const getPlan = ({pageNo=1, search = '', status = ''}) => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getPlanRequest())
        await axios.get(`${Config.API_URL}api/superadmin/get-plan`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data;
            dispatch(getPlanSuccess(dataItem))
        }).catch(error => {
            dispatch(getPlanSuccess([]))
            dispatch(getPlanFailure(error))
        });
    }

}

export const getPlanRequest = () => {
    return {
        type: GET_PLAN_REQUEST
    }
}

export const getPlanSuccess = data => {
    return {
        type: GET_PLAN_SUCCESS,
        payload: data
    }
}

export const getPlanFailure = error => {
    return {
        type: GET_PLAN_ERROR,
        payload: error
    }
}


export const updatePlan = (data) => {
    const loggedInUser = localStorage.getItem('token').replace(/['"]+/g, '');
    return (dispatch) => {
        dispatch(updatePlanRequest())
        axios.put(`${Config.API_URL}api/superadmin/update-plan/${data.id}`, data, {
            'headers': {
                'content-type': 'application/json',
                'Authorization': 'Bearer ' + loggedInUser
            }
        }).then(response => {
            const data = response.data
            if (data.status === true) {
                dispatch(updatePlanSuccess(data))
            }else{
                dispatch(updatePlanFailure(data))
            }
        }).catch(error => {
            dispatch(updatePlanFailure(error))
        })
    }
}

export const updatePlanRequest = () => {
    return {
        type: UPDATE_PLAN_REQUEST
    }
}

export const updatePlanSuccess = data => {
    return {
        type: UPDATE_PLAN_SUCCESS,
        payload: data
    }
}

export const updatePlanFailure = error => {
    return {
        type: UPDATE_PLAN_ERROR,
        payload: error
    }
}
