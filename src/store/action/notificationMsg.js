import * as actionTypes from "./actiontypes";

const error_something_wrong = 'Something Went Wrong!';

// notification Fail
export const notificationFail = err => {
    if (!err.status) {
        let msg = err.message
        return {
            type: actionTypes.ADD_NEW_NOTIFICATION_FAIL,
            state: msg
        };
    }
};

// notification Success
export const notificationSuccess = msg => {
    return {
        type: actionTypes.ADD_NEW_NOTIFICATION_SUCCESS,
        state: msg
    };
};

// notification Clear
export const notificationClear = msg => {
    return {
        type: actionTypes.CLEAR_NOTIFICATION,
        state: msg
    };
};