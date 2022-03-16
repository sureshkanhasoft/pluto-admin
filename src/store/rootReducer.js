import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";
import notifyReducer from "./reducer/notify";
import organizationReducer from "./reducer/organizationReducer/organizationReducer";
import orgProfileReducer from "./reducer/orgProfileReducer/orgProfileReducer";
import profileReducer from "./reducer/profile/profileReducer"
import rolesReducer from "./reducer/Roles/rolesReducer";
import specialitiesReducer from "./reducer/specialities/specialitiesReducer";
import staffReducer from "./reducer/staff/staffReducer";
import trustReducer from "./reducer/trust/trustReducer"
import bookingReducer from "./reducer/booking/bookingReducer"
import signeeReducer from "./reducer/signee/signeeReducer";
import StaffProfileReducer from "./reducer/staffProfile/StaffProfileReducer";
import notificationMsgReducer from "./reducer/notificationMsg/notificationMsg";
import loadingReducer from "./reducer/loading/globalLoading";
import notificationList from "./reducer/notificationList/notificationList";
import dashboardReducer from "./reducer/dashboard/dashboardReducer";
import paymentReducer from "./reducer/payment/paymentReducer";

const rootReducer = combineReducers(
    {
        authReducer: authReducer,
        createOrganization: organizationReducer,
        organizationReducer: organizationReducer,
        profile: profileReducer,
        orgProfile: orgProfileReducer,
        notify: notifyReducer,
        roles: rolesReducer,
        specialities: specialitiesReducer,
        staff: staffReducer,
        trust: trustReducer,
        booking: bookingReducer,
        signee: signeeReducer,
        staffProfile:StaffProfileReducer,
        notificationMsg:notificationMsgReducer,
        loadingReducer:loadingReducer,
        dashboardReducer:dashboardReducer,
        notificationList:notificationList,
        paymentReducer:paymentReducer,
    }
);

export default rootReducer