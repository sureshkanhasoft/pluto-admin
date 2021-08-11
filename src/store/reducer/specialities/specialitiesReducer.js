import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getSpecialityItem: [],
    getSpecialityError: [],

    specialityError:[],
    specialitySuccess:[],
    speUpdateSuccess:[],
    speUpdateErrors:[]
}

const specialitiesReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_SPECIALITIES_REQUEST:
            return updateObject(state, {
                loading: true,
            })

        case actionTypes.GET_SPECIALITIES_SUCCESS:
            return updateObject(state, {
                loading: false,
                getSpecialityItem: action.payload
            })

        case actionTypes.GET_SPECIALITIES_ERROR:
            return updateObject(state, {
                loading: false,
                getSpecialityError: action.payload
            })

        case actionTypes.CREATE_SPECIALITIES_REQUEST:
            return updateObject(state, {
                loading: true,
                specialityError:"",
                specialitySuccess:""
            })

        case actionTypes.CREATE_SPECIALITIES_SUCCESS:
            return updateObject(state, {
                loading: false,
                specialitySuccess: action.payload
            })

        case actionTypes.CREATE_SPECIALITIES_ERROR:
            return updateObject(state, {
                loading: false,
                specialityError: action.payload
            })

        case actionTypes.UPDATE_SPECIALITIES_REQUEST:
            return updateObject(state, {
                loading: false,
                speUpdateSuccess:"",
                speUpdateErrors:""
            })

        case actionTypes.UPDATE_SPECIALITIES_SUCCESS:
            return updateObject(state, {
                loading: false,
                speUpdateSuccess: action.payload
            })

        case actionTypes.UPDATE_SPECIALITIES_ERROR:
            return updateObject(state, {
                loading: false,
                speUpdateErrors: action.payload
            })

        default:
            return state
    }
}

export default specialitiesReducer