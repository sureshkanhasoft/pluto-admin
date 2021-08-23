import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    passloading: false,
    profile: [],
    profileErrors: [],
    profileData: [],
    passChange: [],
    passerrors: [],
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROFILE_REQUEST:
            return updateObject(state, {
                loading: true,
                profileErrors:"",
                profileData:""
            })

        case actionTypes.GET_PROFILE_SUCCESS:
            return updateObject(state, {
                loading: false,
                profile: action.payload
            })

        case actionTypes.GET_PROFILE_ERROR:
            return updateObject(state, {
                loading: false,
                profileErrors: action.payload
            })

        case actionTypes.UPDATE_PROFILE_REQUEST:
            return updateObject(state, {
                // loading: true,
                profileErrors:"",
                profileData:""
            })

        case actionTypes.UPDATE_PROFILE_SUCCESS:
            return updateObject(state, {
                loading: false,
                profileData: action.payload
            })

        case actionTypes.UPDATE_PROFILE_ERROR:
            return updateObject(state, {
                loading: false,
                profileErrors: action.payload
            })


        case actionTypes.CHANGE_PASS_REQUEST:
            return updateObject(state, {
                loading: true,
                passerrors:"",
                passChange:""
            })

        case actionTypes.CHANGE_PASS_SUCCESS:
            return updateObject(state, {
                loading: false,
                passChange: action.payload
            })

        case actionTypes.CHANGE_PASS_ERROR:
            return updateObject(state, {
                loading: false,
                passerrors: action.payload
            })

        default:
            return state
    }
}

export default profileReducer