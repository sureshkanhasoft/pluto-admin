import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    status : false
}
const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_NEW_LOADING_REQUEST:
            return updateObject(state, { status: true})
        case actionTypes.ADD_NEW_LOADING_SUCCESS:
            return updateObject(state, { status: false })
        case actionTypes.ADD_NEW_LOADING_FAIL:
            return updateObject(state, { status: false })
        default:
            return state
    }
}

export default reducer