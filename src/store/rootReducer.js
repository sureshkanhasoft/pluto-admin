import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";
import createOrganizationReducer from "./reducer/organizationReducer/createOrganizationReducer";

const rootReducer = combineReducers(
    {
        authReducer:authReducer,
        createOrganization:createOrganizationReducer,
    }
);

export default rootReducer