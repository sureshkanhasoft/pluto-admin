import * as actionTypes from '../action/actiontypes';
import { updateObject } from '../shared/utility';

const initialState = {
    notify: [],
};

const notifyReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.PUT_NOTIFY:
            return updateObject(state, {
                notify: action.payload
            })
    
        default:
            return state
    }
}

export default notifyReducer