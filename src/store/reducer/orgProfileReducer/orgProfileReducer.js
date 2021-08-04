import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    errors: false,
    passChange:[],
    profile: [],
    profileErrors: [],
}

const orgProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.CHANGE_ORG_PASS_REQUEST:
            return updateObject(state, {
                loading:true,
            })

        case actionTypes.CHANGE_ORG_PASS_SUCCESS:
            return updateObject(state, {
                loading:false,
                passChange:action.payload
            })

        case actionTypes.CHANGE_ORG_PASS_ERROR:
            return updateObject(state, {
                loading:false,
                errors: action.payload
            })

        case actionTypes.GET_ORG_PROFILE_REQUEST:
            return updateObject(state, {
                loading: true
            })

        case actionTypes.GET_ORG_PROFILE_SUCCESS:
            return updateObject(state, {
                loading: false,
                profile: action.payload
            })

        case actionTypes.GET_ORG_PROFILE_ERROR:
            return updateObject(state, {
                loading: false,
                profileErrors: action.payload
            })
    
        default:
            return state
    }
}

export default orgProfileReducer