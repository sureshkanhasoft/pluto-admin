import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    createOrganization: [],
    errors: false,
    organizationList:[],
    createOrgSuccess: [],
    createOrgErrors: [],

    updateOrgSuccess:[],
    updateOrgError:[]
}

const organizationReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_ORGANIZATION_REQUEST:
            return updateObject(state, {
                loading: true,
                updateOrgError:"",
                createOrgErrors:""
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
                loading: true,
                createOrgSuccess:"",
                createOrgErrors:""
            })
        case actionTypes.CREATE_ORGANIZATION_SUCCESS:
            return updateObject(state, {
                loading: false,
                createOrgSuccess: action.payload,
            })
        case actionTypes.CREATE_ORGANIZATION_ERROR:
            return updateObject(state, {
                loading: false,
                createOrgErrors: action.payload
            })

        case actionTypes.UPDATE_ORGANIZATION_REQUEST:
            return updateObject(state, {
                loading: true,
                updateOrgSuccess:"",
                updateOrgError:""
            })
        case actionTypes.UPDATE_ORGANIZATION_SUCCESS:
            return updateObject(state, {
                loading: false,
                updateOrgSuccess: action.payload
            })

        case actionTypes.UPDATE_ORGANIZATION_ERROR:
            return updateObject(state, {
                loading: false,
                updateOrgError: action.payload
            })
        default:
            return state
    }
}

export default organizationReducer