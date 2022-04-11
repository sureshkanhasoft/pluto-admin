import axios from "axios";
import { apiClient } from "../../../config/apiClient";
import apiConfigs from "../../../config/config";
import history from "../../../utils/HistoryUtils";
import {
    CHANGE_PAYMENT_STATUS_ERROR,
    CHANGE_PAYMENT_STATUS_REQUEST,
    CHANGE_PAYMENT_STATUS_SUCCESS,
    GET_BOOKING_ERROR, GET_BOOKING_REQUEST, GET_BOOKING_SUCCESS,
    USER_INVITATION_ERROR, USER_INVITATION_REQUEST, USER_INVITATION_SUCCESS
} from "../actiontypes";
import { notificationFail, notificationSuccess } from "../notificationMsg";

export const getReport = ({ pageNo = 1, data }) => {
    console.log(data , " datadatadatadata")
    return async (dispatch) => {
        // dispatch(confirmBookingFailure([]))
                dispatch(notificationFail(""))
        dispatch(getReportRequest())
        // await apiClient(true).get(`api/organization/report-completed-booking`)
        await apiClient(true).get(`api/organization/report-completed-booking?start_date=${data.start_date}&end_date=${data.end_date}&trust_id=${data.trust_id}&page=${pageNo}`)
            .then(response => {
                dispatch(getReportSuccess(response.data))
            }).catch(error => {
                dispatch(getReportSuccess(""))
                dispatch(getReportError(error))
            })
    }
}

// export const getReportDownload = ({ pageNo = 1, data }) => {
//     console.log(data , " getReportDownload")
//     return async (dispatch) => {
//         // dispatch(confirmBookingFailure([]))
//                 dispatch(notificationFail(""))
//         dispatch(getReportRequest())
//         // await apiClient(true).get(`api/organization/report-completed-booking`)
//         await apiClient(true).get(`api/organization/report-completed-booking?start_date=${data.start_date}&end_date=${data.end_date}&trust_id=${data.trust_id}&page=${pageNo}`)
//             .then(response => {
//                 dispatch(getReportSuccess(response.data))
//             }).catch(error => {
//                 dispatch(getReportSuccess(""))
//                 dispatch(getReportError(error))
//             })
//     }
// }

const getReportRequest = () => {
    return {
        type: GET_BOOKING_REQUEST
    }
}

const getReportSuccess = (data) => {
    return {
        type: GET_BOOKING_SUCCESS,
        payload: data
    }
}

const getReportError = (error) => {
    return {
        type: GET_BOOKING_ERROR,
        payload: error
    }
}
 
 
// -----------------------------------------------------

export const userInvitation = (data) => {
    return async (dispatch) => {
        dispatch(userInvitationRequest())
        await apiClient(true).post(`api/organization/user/send-invitation`, data)
            .then(response => {
                const dataItem = response.data;
                dispatch(userInvitationSuccess(dataItem))
            }).catch(error => {
                dispatch(userInvitationFailure(error))
            });
    }
}

const userInvitationRequest = () => {
    return {
        type: USER_INVITATION_REQUEST
    }
}

const userInvitationSuccess = (data) => {
    return {
        type: USER_INVITATION_SUCCESS,
        payload: data
    }
}

const userInvitationFailure = (error) => {
    return {
        type: USER_INVITATION_ERROR,
        payload: error
    }
}


// --------------------------------------------

export const changePaymentStatus = (data) => {
    return async (dispatch) => {
        dispatch(changePaymentStatusRequest())
        await apiClient(true).put(`api/organization/change-signee-payment-status`, data)
            .then(response => {
                console.log('response: ', response);
                const dataItem = response.data;
                dispatch(changePaymentStatusSuccess(dataItem.message))
                dispatch(notificationSuccess(dataItem.message))
            }).catch(error => {
                dispatch(changePaymentStatusFailure(error))
                dispatch(notificationFail(error.response.data.message))
            });
    }
}

const changePaymentStatusRequest = () => {
    return {
        type: CHANGE_PAYMENT_STATUS_REQUEST
    }
}

const changePaymentStatusSuccess = (data) => {
    return {
        type: CHANGE_PAYMENT_STATUS_SUCCESS,
        payload: data
    }
}

const changePaymentStatusFailure = (error) => {
    return {
        type: CHANGE_PAYMENT_STATUS_ERROR,
        payload: error
    }
}