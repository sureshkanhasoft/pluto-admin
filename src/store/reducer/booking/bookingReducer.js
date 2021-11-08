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
    deleteBookingError: [],

    confirmBookingSuccess: [],
    confirmBookingError: [],

    shiftStatusSuccess: [],
    shiftStatusError: [],

    invitationSuccess:[],
    invitationError:[],
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
                deleteBookingSuccess: "",
                deleteBookingError: ""
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


        // -------------------------------------

        case actionTypes.CONFIRM_BOOKING_REQUEST:
            return updateObject(state, {
                loading: true,
                confirmBookingSuccess: "",
                confirmBookingError: ""

            })

        case actionTypes.CONFIRM_BOOKING_SUCCESS:
            return updateObject(state, {
                loading: false,
                confirmBookingSuccess: action.payload
            })

        case actionTypes.CONFIRM_BOOKING_ERROR:
            return updateObject(state, {
                loading: false,
                confirmBookingError: action.payload
            })


        // -------------------------------------

        case actionTypes.CHANGE_SHIFT_STATUS_REQUEST:
            return updateObject(state, {
                loading: true,
                shiftStatusSuccess: "",
                shiftStatusError: ""

            })

        case actionTypes.CHANGE_SHIFT_STATUS_SUCCESS:
            return updateObject(state, {
                loading: false,
                shiftStatusSuccess: action.payload
            })

        case actionTypes.CHANGE_SHIFT_STATUS_ERROR:
            return updateObject(state, {
                loading: false,
                shiftStatusError: action.payload
            })


        // -------------------------------------

        case actionTypes.USER_INVITATION_REQUEST:
            return updateObject(state, {
                loading: true,
                invitationSuccess: "",
                invitationError: ""

            })

        case actionTypes.USER_INVITATION_SUCCESS:
            return updateObject(state, {
                loading: false,
                invitationSuccess: action.payload
            })

        case actionTypes.USER_INVITATION_ERROR:
            return updateObject(state, {
                loading: false,
                invitationError: action.payload
            })

        default:
            return state;
    }
}

export default bookingReducer