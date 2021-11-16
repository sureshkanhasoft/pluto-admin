import * as actionTypes from "./actiontypes";

// loading Request
export const loadingRequest = status => {
    // loading start -> status = true
    return {
        type: actionTypes.ADD_NEW_LOADING_REQUEST,
        state: status
    };
};

// loading Success
export const loadingSuccess = status => {
    // loading end -> status = false
    return {
        type: actionTypes.ADD_NEW_LOADING_SUCCESS,
        state: status
    };
};

// loading Fail
export const loadingFail = status => {
    // loading end -> status = false 
    return {
        type: actionTypes.ADD_NEW_LOADING_FAIL,
        state: status
    };
};