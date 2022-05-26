import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    createPlan: [],
    errors: false,
    planList:[],
    createOrgSuccess: [],
    createOrgErrors: [],

    updatePlanSuccess:[],
    updatePlanError:[]
}

const planReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_PLAN_REQUEST:
            return updateObject(state, {
                loading: true,
                updatePlanError:"",
                createOrgErrors:""
            })

        case actionTypes.GET_PLAN_SUCCESS:
            return updateObject(state, {
                loading: false,
                planList: action.payload
            })

        case actionTypes.GET_PLAN_ERROR:
            return updateObject(state, {
                loading: false,
                errors: true
            })

        // case actionTypes.CREATE_PLAN_REQUEST:
        //     return updateObject(state, {
        //         loading: true,
        //         createOrgSuccess:"",
        //         createOrgErrors:""
        //     })
        // case actionTypes.CREATE_PLAN_SUCCESS:
        //     return updateObject(state, {
        //         loading: false,
        //         createOrgSuccess: action.payload,
        //     })
        // case actionTypes.CREATE_PLAN_ERROR:
        //     return updateObject(state, {
        //         loading: false,
        //         createOrgErrors: action.payload
        //     })

        case actionTypes.UPDATE_PLAN_REQUEST:
            return updateObject(state, {
                loading: true,
                updatePlanSuccess:"",
                updatePlanError:""
            })
        case actionTypes.UPDATE_PLAN_SUCCESS:
            return updateObject(state, {
                loading: false,
                updatePlanSuccess: action.payload
            })

        case actionTypes.UPDATE_PLAN_ERROR:
            return updateObject(state, {
                loading: false,
                updatePlanError: action.payload
            })
        default:
            return state
    }
}

export default planReducer