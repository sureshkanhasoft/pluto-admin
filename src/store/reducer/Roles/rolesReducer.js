import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getRolesItem: [],
    getRolesError:[],
    roleSuccess: [],
    roleErrors: [],
}

const rolesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ROLE_REQUEST:
            return updateObject(state, {
                loading: true,
                roleSuccess: "",
                roleErrors: "",
            })

        case actionTypes.GET_ROLE_SUCCESS:
            return updateObject(state, {
                loading: false,
                getRolesItem: action.payload
            })

        case actionTypes.GET_ROLE_ERROR:
            return updateObject(state, {
                loading: false,
                getRolesError: action.payload
            })

        case actionTypes.CREATE_ROLE_REQUEST:
            return updateObject(state, {
                loading: true,
                roleSuccess: "",
                roleErrors: "",
            })

        case actionTypes.CREATE_ROLE_SUCCESS:
            return updateObject(state, {
                loading: false,
                roleSuccess: action.payload
            })

        case actionTypes.CREATE_ROLE_ERROR:
            return updateObject(state, {
                loading: false,
                roleErrors: action.payload
            })

        default:
            return state
    }
}

export default rolesReducer