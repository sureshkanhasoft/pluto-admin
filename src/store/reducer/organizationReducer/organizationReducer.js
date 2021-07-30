import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    createOrganization: [],
    errors: false,
    organizationList:[]
}

const organizationReducer = (state = initialState, action) => {
    console.log('action: ', action);
    switch (action.type) {
        case actionTypes.GET_ORGANIZATION_REQUEST:
            return updateObject(state, {
                loading: true
            })

        case actionTypes.GET_ORGANIZATION_SUCCESS:
            return updateObject(state, {
                loading: false,
                organizationList: action.payload
            })

        case actionTypes.GET_ORGANIZATION_ERROR:
            return updateObject(state, {
                loading: false,
                errors: true
            })

        case actionTypes.CREATE_ORGANIZATION_REQUEST:
            return updateObject(state, {
                loading: true
            })
        case actionTypes.CREATE_ORGANIZATION_SUCCESS:
            return updateObject(state, {
                loading: false,
                organization: action.payload,
            })
        case actionTypes.CREATE_ORGANIZATION_ERROR:
            return updateObject(state, {
                loading: false,
                errors: true
            })

        case actionTypes.UPDATE_ORGANIZATION_REQUEST:
            return updateObject(state, {
                loading: true
            })
        case actionTypes.UPDATE_ORGANIZATION_SUCCESS:
            return updateObject(state, {
                loading: false,
                organization: action.payload
            })

        case actionTypes.UPDATE_ORGANIZATION_ERROR:
            return updateObject(state, {
                loading: false,
                errors: true
            })
        default:
            return state
    }
}

export default organizationReducer