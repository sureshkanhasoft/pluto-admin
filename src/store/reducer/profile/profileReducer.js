import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    profile: [],
    errors: false,
    profileData:[],
    passChange:[]
}

const profileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PROFILE_REQUEST:
            return updateObject(state, {
                loading: true
            })

        case actionTypes.GET_PROFILE_SUCCESS:
            return updateObject(state, {
                loading: false,
                profile: action.payload
            })

        case actionTypes.GET_PROFILE_ERROR:
            return updateObject(state, {
                loading: false,
                errors: true
            })

        case actionTypes.UPDATE_PROFILE_REQUEST:
            return updateObject(state, {
                loading:true,
            })

        case actionTypes.UPDATE_PROFILE_SUCCESS:
            return updateObject(state, {
                loading:false,
                profileData:action.payload
            })

        case actionTypes.UPDATE_PROFILE_ERROR:
            return updateObject(state, {
                loading:false,
                errors: true
            })


        case actionTypes.CHANGE_PASS_REQUEST:
            return updateObject(state, {
                loading:true,
            })

        case actionTypes.CHANGE_PASS_SUCCESS:
            return updateObject(state, {
                loading:false,
                passChange:action.payload
            })

        case actionTypes.CHANGE_PASS_ERROR:
            return updateObject(state, {
                loading:false,
                errors: true
            })
    
        default:
            return state
    }
}

export default profileReducer