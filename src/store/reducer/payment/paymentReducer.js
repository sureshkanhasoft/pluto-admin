import * as actionTypes from '../../action/actiontypes'
import { updateObject } from '../../shared/utility';

const initialState = {
    loading: false,
    paymentItem: [],
    paymentError: [],

    createPaymentSuccess: [],
    createPaymentError: [], 

    paymentStatusSuccess:[],
    paymentStatusError:[]
}

const paymentReducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.CREATE_PAYMENT_REQUEST:
            return updateObject(state, {
                loading: true,
                createPaymentSuccess: "",
                createPaymentError: ""
            })

        case actionTypes.CREATE_PAYMENT_SUCCESS:
            return updateObject(state, {
                loading: false,
                createPaymentSuccess: action.payload
            })
        case actionTypes.CREATE_PAYMENT_ERROR:
            return updateObject(state, {
                loading: false,
                createPaymentError: action.payload
            })

        default:
            return state;
    }
}

export default paymentReducer