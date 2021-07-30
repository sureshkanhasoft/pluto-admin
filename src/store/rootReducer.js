import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";
import organizationReducer from "./reducer/organizationReducer/organizationReducer";

const rootReducer = combineReducers(
    {
        authReducer:authReducer,
        createOrganization:organizationReducer,
    }
);

export default rootReducer