import { apiClient } from "../../../config/apiClient";
import { GET_NOTIFICATION_SUCCESS } from "../actiontypes";

export const getNotification = (pageNo) => {
    return async (dispatch) => {
        await apiClient(true).get(`/api/signee/get-all-notification?page=${pageNo}`)
        .then(response => {
            dispatch(getNotificationSuccess(response.data))
        }).catch(error => {
            console.log('error: ', error);
        });
    }
}

const getNotificationSuccess = data => {
    return {
        type: GET_NOTIFICATION_SUCCESS,
        payload: data
    }
}

// ----------------------------
export const readNotification = (request, page) => {
    let requestData={
        notification_id:request.notification_id,
        is_read:request.is_read
    }
    return async (dispatch) => {
        await apiClient(true).post(`/api/signee/update-notification`,requestData)
        .then(response => {
            dispatch(getNotification({signee_id:request.signee_id}, page))
        }).catch(error => {
            console.log('error: ', error);
        });
    }
}

