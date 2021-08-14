import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getStaffItem: [],
    getStaffError: [],
    staffSuccess: [],
    staffError: [],
}

const staffReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_STAFF_REQUEST:
            return updateObject(state, {
                loading: true,
            })

        case actionTypes.GET_STAFF_SUCCESS:
            return updateObject(state, {
                loading: false,
                getStaffItem: action.payload
            })

        case actionTypes.GET_STAFF_ERROR:
            return updateObject(state, {
                loading: false,
                getStaffError: action.payload
            })

        case actionTypes.CREATE_STAFF_REQUEST:
            return updateObject(state, {
                loading: true,
                staffError: "",
                staffSuccess: ""
            })

        case actionTypes.CREATE_STAFF_SUCCESS:
            return updateObject(state, {
                loading: false,
                staffSuccess: action.payload
            })

        case actionTypes.CREATE_STAFF_ERROR:
            return updateObject(state, {
                loading: false,
                staffError: action.payload
            })

        default: return state 
    }
}

export default staffReducer