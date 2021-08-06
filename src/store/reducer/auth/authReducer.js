import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    userInfo: [],
    loginErrors: [],
    forgotsuccess: [],
    forgoterrors: [],
    changesuccess: [],
    changeerrors: [],
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return updateObject(state, {
                loading: true,
                loginErrors:"",
                userInfo:""
            })
        case actionTypes.LOGIN_SUCCESS:
            return updateObject(state, {
                loading: false,
                userInfo: action.payload,
            })
        case actionTypes.LOGIN_ERROR:
            return updateObject(state, {
                loading: false,
                loginErrors: action.payload
            })
        case actionTypes.FORGOT_REQUEST:
            return updateObject(state, {
                loading: true
            })
        case actionTypes.FORGOT_SUCCESS:
            return updateObject(state, {
                loading: false,
                forgotsuccess: action.payload,
            })
        case actionTypes.FORGOT_ERROR:
            return updateObject(state, {
                loading: false,
                forgoterrors: action.payload
            })
        case actionTypes.CHANGE_PASSWORD_REQUEST:
            return updateObject(state, {
                loading: true,
                changesuccess:"",
                changeerrors:""
            })
        case actionTypes.CHANGE_PASSWORD_SUCCESS:
            return updateObject(state, {
                loading: false,
                changesuccess: action.payload,
            })
        case actionTypes.CHANGE_PASSWORD_ERROR:
            return updateObject(state, {
                loading: false,
                changeerrors: action.payload
            })
        default:
            return state
    }
}

export default authReducer