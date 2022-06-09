import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    getHolidayItem: [],
    getHolidayError:[],
    holidaySuccess: [],
    holidayErrors: [],

    deleteError:[],
    deleteSuccess:[]
}
 
const holidayReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_HOLIDAY_REQUEST:
            return updateObject(state, {
                loading: true,
                holidaySuccess: "",
                holidayErrors: "",

                deleteSuccess:"",
                deleteError:""
            })

        case actionTypes.GET_HOLIDAY_SUCCESS:
            return updateObject(state, {
                loading: false,
                getHolidayItem: action.payload
            })

        case actionTypes.GET_HOLIDAY_ERROR:
            return updateObject(state, {
                loading: false,
                getHolidayError: action.payload
            })

        case actionTypes.CREATE_HOLIDAY_REQUEST:
            return updateObject(state, {
                loading: true,
                holidaySuccess: "",
                holidayErrors: "",
            })

        case actionTypes.CREATE_HOLIDAY_SUCCESS:
            return updateObject(state, {
                loading: false,
                holidaySuccess: action.payload
            })

        case actionTypes.CREATE_HOLIDAY_ERROR:
            return updateObject(state, {
                loading: false,
                holidayErrors: action.payload
            })


        case actionTypes.DELETE_HOLIDAY_REQUEST:
            return updateObject(state, {
                loading: true,
                deleteError: "",
                deleteSuccess: "",
            })

        case actionTypes.DELETE_HOLIDAY_SUCCESS:
            return updateObject(state, {
                loading: false,
                deleteSuccess: action.payload
            })

        case actionTypes.DELETE_HOLIDAY_ERROR:
            return updateObject(state, {
                loading: false,
                deleteError: action.payload
            })

        default:
            return state
    }
}

export default holidayReducer