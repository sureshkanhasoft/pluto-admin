
import * as actionTypes from '../../action/actiontypes';
import { updateObject } from '../../shared/utility';

const initialState = {
    notificationList:[]
}
const notificationList = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.GET_NOTIFICATION_SUCCESS:
            return updateObject(state, { loading: false, error: null, notificationList: action.payload.data})
        default:
            return state
    }
    
}

export default notificationList