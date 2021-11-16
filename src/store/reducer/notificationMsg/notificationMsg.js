import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_NOTIFICATION_SUCCESS:
            return updateObject(state, { message: action.state, status: true})
        case actionTypes.ADD_NEW_NOTIFICATION_FAIL:
            return updateObject(state, { message: action.state, status: false })
        case actionTypes.CLEAR_NOTIFICATION:
            return updateObject(state, { message: null, status: null, type: null })
        default:
            return state
    }
    
}

export default reducer