import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";
import notifyReducer from "./reducer/notify";
import organizationReducer from "./reducer/organizationReducer/organizationReducer";
import orgProfileReducer from "./reducer/orgProfileReducer/orgProfileReducer";
import profileReducer from "./reducer/profile/profileReducer"

const rootReducer = combineReducers(
    {
        authReducer:authReducer,
        createOrganization:organizationReducer,
        organizationReducer:organizationReducer,
        profile:profileReducer,
        orgProfile:orgProfileReducer,
        notify:notifyReducer
    }
);

export default rootReducer