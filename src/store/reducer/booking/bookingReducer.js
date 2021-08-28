import * as actionTypes from '../../action/actiontypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    bookingItem: [],
    bookingError: [],

    createBookingSuccess: [],
    createBookingError: [],

    updateBookingSuccess: [],
    updateBookingError: [],

    deleteBookingSuccess: [],
    deleteBookingError: []
}

const bookingReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_BOOKING_REQUEST:
            return updateObject(state, {
                loading: true
            })

        case actionTypes.GET_BOOKING_SUCCESS:
            return updateObject(state, {
                loading: false,
                bookingItem: action.payload
            })

        case actionTypes.GET_BOOKING_ERROR:
            return updateObject(state, {
                loading: false,
                bookingError: action.payload
            })

        case actionTypes.CREATE_BOOKING_REQUEST:
            return updateObject(state, {
                loading: true,
                createBookingSuccess: "",
                createBookingError: ""
            })

        case actionTypes.CREATE_BOOKING_SUCCESS:
            return updateObject(state, {
                loading: false,
                createBookingSuccess: action.payload
            })
        case actionTypes.CREATE_BOOKING_ERROR:
            return updateObject(state, {
                loading: false,
                createBookingError: action.payload
            })

        case actionTypes.UPDATE_BOOKING_REQUEST:
            return updateObject(state, {
                loading: true,
                updateBookingSuccess: "",
                updateBookingError: ""
            })

        case actionTypes.UPDATE_BOOKING_SUCCESS:
            return updateObject(state, {
                loading: false,
                updateBookingSuccess: action.payload
            })

        case actionTypes.UPDATE_BOOKING_ERROR:
            return updateObject(state, {
                loading: false,
                updateBookingError: action.payload
            })

        case actionTypes.DELETE_BOOKING_REQUEST:
            return updateObject(state, {
                loading: true,
            })

        case actionTypes.DELETE_BOOKING_SUCCESS:
            return updateObject(state, {
                loading: false,
                deleteBookingSuccess: action.payload
            })

        case actionTypes.DELETE_BOOKING_ERROR:
            return updateObject(state, {
                loading: false,
                deleteBookingError: action.payload
            })

        default:
            return state;
    }
}

export default bookingReducer