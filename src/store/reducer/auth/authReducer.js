import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    userInfo: [],
    errors: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOGIN_REQUEST:
            return updateObject(state, {
                loading: true
            })
        case actionTypes.LOGIN_SUCCESS:
            return updateObject(state, {
                loading: false,
                userInfo: action.payload,
            })
        case actionTypes.LOGIN_ERROR:
            return updateObject(state, {
                loading: false,
                errors: true
            })
        default:
            return state
    }
}

export default authReducer