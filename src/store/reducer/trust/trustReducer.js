import * as actionTypes from '../../action/actiontypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getTrustItem: [],
    getTrustError: [],

    createTrustSuccess: [],
    createTrustError: [],

    updateTrustSuccess: [],
    updateTrustError: [],

    deleteTrustSuccess: [],
    deleteTrustError: []
}

const trustReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_TRUST_REQUEST:
            return updateObject(state, {
                loading: true,
            })

        case actionTypes.GET_TRUST_SUCCESS:
            return updateObject(state, {
                loading: false,
                getTrustItem: action.payload
            })

        case actionTypes.GET_TRUST_ERROR:
            return updateObject(state, {
                loading: false,
                getTrustError: action.payload
            })


        case actionTypes.CREATE_TRUST_REQUEST:
            return updateObject(state, {
                loading: false,
                createTrustSuccess: "",
                createTrustError: ""
            })

        case actionTypes.CREATE_TRUST_SUCCESS:
            return updateObject(state, {
                loading: false,
                createTrustSuccess: action.payload
            })

        case actionTypes.CREATE_TRUST_ERROR:
            return updateObject(state, {
                loading: false,
                createTrustError: action.payload
            })

        case actionTypes.UPDATE_TRUST_REQUEST:
            return updateObject(state, {
                loading: true,
                updateTrustSuccess: "",
                updateTrustError: ""
            })

        case actionTypes.UPDATE_TRUST_SUCCESS:
            return updateObject(state, {
                loading: false,
                updateTrustSuccess: action.payload
            })

        case actionTypes.UPDATE_TRUST_ERROR:
            return updateObject(state, {
                loading: false,
                updateTrustError: action.payload
            })

        case actionTypes.DELETE_TRUST_REQUEST:
            return updateObject(state, {
                loading: true,
                deleteTrustSuccess: "",
                deleteTrustError: ""
            })

        case actionTypes.DELETE_TRUST_SUCCESS:
            return updateObject(state, {
                loading: false,
                deleteTrustSuccess: action.payload
            })

        case actionTypes.DELETE_TRUST_ERROR:
            return updateObject(state, {
                loading: false,
                deleteTrustError: action.payload
            })


        default:
            return state;
    }
}

export default trustReducer
