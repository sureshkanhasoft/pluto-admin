import axios from 'axios';
import Config from '../../../config/config';
import { GET_DASHBOARD_ERROR, GET_DASHBOARD_REQUEST, GET_DASHBOARD_SUCCESS } from '../actiontypes';

export const getDashboard = ({dashboardYear}) => {
    const loggedInUser = localStorage.getItem("token").replace(/['"]+/g, '');
    return async (dispatch) => {
        dispatch(getDashboardRequest())
        await axios.get(`${Config.API_URL}api/superadmin/dashboard/${dashboardYear.years}`, {
            headers: {
                'content-type': 'application/json',
                'Authorization': `Bearer ${loggedInUser}`
            }
        }).then(response => {
            const dataItem = response.data;
            dispatch(getDashboardSuccess(dataItem.data))
            dispatch(getDashboardFailure())
        }).catch(error => {
            dispatch(getDashboardSuccess([]))
            dispatch(getDashboardFailure(error))
        });
    }
}

export const getDashboardRequest = () => {
    return {
        type: GET_DASHBOARD_REQUEST
    }
}

export const getDashboardSuccess = data => {
    return {
        type: GET_DASHBOARD_SUCCESS,
        payload: data
    }
}

export const getDashboardFailure = error => {
    return {
        type: GET_DASHBOARD_ERROR,
        payload: error
    }
}
 