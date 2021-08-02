import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";
import organizationReducer from "./reducer/organizationReducer/organizationReducer";
import profileReducer from "./reducer/profile/profileReducer"

const rootReducer = combineReducers(
    {
        authReducer:authReducer,
        createOrganization:organizationReducer,
        profile:profileReducer
    }
);

export default rootReducer