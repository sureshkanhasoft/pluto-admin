import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getSigneeItem: [],
    getSigneeError: [],

    getSingleSigneeItem: [],
    getSingleSigneeError: [],

    createSigneeSuccess: [],
    createSigneeError: [],
    updateSigneeSuccess: [],
    updateSigneeError: [],

    deleteSigneeSuccess: [],
    deleteSigneeError: [],

    getCandidateReferrredForm: [],

    signeeProStatusSuccess:[],
    signeeProStatusError:[],

    signeeComStatusSuccess:[],
    signeeComStatusError:[],

    changeDocStatusSuccess:[],
    changeDocStatusError:[]
}

const signeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SIGNEE_REQUETS:
            return updateObject(state, {
                loading: true
            })

        case actionTypes.GET_SIGNEE_SUCCESS:
            return updateObject(state, {
                loading: false,
                getSigneeItem: action.payload
            })

        case actionTypes.GET_SIGNEE_ERROR:
            return updateObject(state, {
                loading: false,
                getSigneeError: action.payload
            })

        case actionTypes.CREATE_SIGNEE_REQUETS:
            return updateObject(state, {
                loading: true,
                createSigneeSuccess: "",
                createSigneeError: ""
            })

        case actionTypes.CREATE_SIGNEE_SUCCESS:
            return updateObject(state, {
                loading: false,
                createSigneeSuccess: action.payload
            })

        case actionTypes.CREATE_SIGNEE_ERROR:
            return updateObject(state, {
                loading: false,
                createSigneeError: action.payload
            })


        case actionTypes.UPDATE_SIGNEE_REQUETS:
            return updateObject(state, {
                loading: true,
                updateSigneeSuccess: "",
                updateSigneeError: ""
            })

        case actionTypes.UPDATE_SIGNEE_SUCCESS:
            return updateObject(state, {
                loading: false,
                updateSigneeSuccess: action.payload
            })

        case actionTypes.UPDATE_SIGNEE_ERROR:
            return updateObject(state, {
                loading: false,
                updateSigneeError: action.payload
            })


        case actionTypes.GET_SINGLE_SIGNEE_REQUETS:
            return updateObject(state, {
                loading: true,
                getSingleSigneeItem: "",
                getSingleSigneeError: ""
            })

        case actionTypes.GET_SINGLE_SIGNEE_SUCCESS:
            return updateObject(state, {
                loading: false,
                getSingleSigneeItem: action.payload
            })

        case actionTypes.GET_SINGLE_SIGNEE_ERROR:
            return updateObject(state, {
                loading: false,
                getSingleSigneeError: action.payload
            })


        case actionTypes.DELETE_SIGNEE_REQUETS:
            return updateObject(state, {
                loading: true,
                deleteSigneeSuccess: "",
                deleteSigneeError: ""
            })

        case actionTypes.DELETE_SIGNEE_SUCCESS:
            return updateObject(state, {
                loading: false,
                deleteSigneeSuccess: action.payload
            })

        case actionTypes.DELETE_SIGNEE_ERROR:
            return updateObject(state, {
                loading: false,
                deleteSigneeError: action.payload
            })

        case actionTypes.GET_CANDIDATE_REFERRED_FROM_SUCCESS:
            return updateObject(state, {
                loading: false,
                getCandidateReferrredForm: action.payload
            })

        // -------------------------------------------

        case actionTypes.CHANGE_SIGNEE_PRO_STATUS_REQUEST:
            return updateObject(state, {
                loading: true,
                signeeProStatusSuccess: "",
                signeeProStatusError: ""
            })

        case actionTypes.CHANGE_SIGNEE_PRO_STATUS_SUCCESS:
            return updateObject(state, {
                loading: false,
                signeeProStatusSuccess: action.payload
            })

        case actionTypes.CHANGE_SIGNEE_PRO_STATUS_ERROR:
            return updateObject(state, {
                loading: false,
                signeeProStatusError: action.payload
            })


         // -------------------------------------------

         case actionTypes.CHANGE_SIGNEE_COMP_STATUS_REQUEST:
            return updateObject(state, {
                loading: false,
                signeeComStatusSuccess: "",
                signeeComStatusError: ""
            })

        case actionTypes.CHANGE_SIGNEE_COMP_STATUS_SUCCESS:
            return updateObject(state, {
                loading: false,
                signeeComStatusSuccess: action.payload
            })

        case actionTypes.CHANGE_SIGNEE_COMP_STATUS_ERROR:
            return updateObject(state, {
                loading: false,
                signeeComStatusError: action.payload
            })
         // -------------------------------------------

         case actionTypes.CHANGE_DOC_STATUS_REQUEST:
            return updateObject(state, {
                loading: false,
                changeDocStatusSuccess: "",
                changeDocStatusError: ""
            })

        case actionTypes.CHANGE_DOC_STATUS_SUCCESS:
            return updateObject(state, {
                loading: false,
                changeDocStatusSuccess: action.payload
            })

        case actionTypes.CHANGE_DOC_STATUS_ERROR:
            return updateObject(state, {
                loading: false,
                changeDocStatusError: action.payload
            })


        default: return state
    }
};

export default signeeReducer;