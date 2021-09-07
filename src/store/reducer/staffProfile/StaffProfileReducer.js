import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    errors: false,
    passChange:[],
    passerrors:[],
    profile: [],
    profileErrors: [],

    profileStaffErrors:[],
    profileStaffSuccess:[]
}

const StaffProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_STAFF_PASS_REQUEST:
            return updateObject(state, {
                loading:true,
                passerrors:"",
                passChange:""
            })

        case actionTypes.CHANGE_STAFF_PASS_SUCCESS:
            return updateObject(state, {
                loading:false,
                passChange:action.payload
            })

        case actionTypes.CHANGE_STAFF_PASS_ERROR:
            return updateObject(state, {
                loading:false,
                passerrors: action.payload
            })

        case actionTypes.GET_STAFF_PROFILE_REQUEST:
            return updateObject(state, {
                loading: true
            })

        case actionTypes.GET_STAFF_PROFILE_SUCCESS:
            return updateObject(state, {
                loading: false,
                profile: action.payload
            })

        case actionTypes.GET_STAFF_PROFILE_ERROR:
            return updateObject(state, {
                loading: false,
                profileErrors: action.payload
            })

            case actionTypes.UPDATE_STAFF_PROFILE_REQUEST:
            return updateObject(state, {
                loading: true,
                profileStaffErrors:"",
                profileStaffSuccess:""
            })

        case actionTypes.UPDATE_STAFF_PROFILE_SUCCESS:
            return updateObject(state, {
                loading: false,
                profileStaffSuccess: action.payload
            })

        case actionTypes.UPDATE_STAFF_PROFILE_ERROR:
            return updateObject(state, {
                loading: false,
                profileStaffErrors: action.payload
            })
    
        default:
            return state
    }
}

export default StaffProfileReducer