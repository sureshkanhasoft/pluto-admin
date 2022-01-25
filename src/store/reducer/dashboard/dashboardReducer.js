import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    createOrganization: [],
    errors: false,
    dashboardList:[],
    createOrgSuccess: [],
    createOrgErrors: [],

    updateOrgSuccess:[],
    updateOrgError:[]
}

const dashboardReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_DASHBOARD_REQUEST:
            return updateObject(state, {
                loading: true,
                updateOrgError:"",
                createOrgErrors:""
            })

        case actionTypes.GET_DASHBOARD_SUCCESS:
            return updateObject(state, {
                loading: false,
                dashboardList: action.payload
            })

        case actionTypes.GET_DASHBOARD_ERROR:
            return updateObject(state, {
                loading: false,
                errors: true
            })
         
        default:
            return state
    }
}

export default dashboardReducer