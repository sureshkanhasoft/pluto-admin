export {
    login,
    forgotpassword,
    changepassword
} from "./auth/auth";

export {
    getOrganization,
    createOrganization,
    updateOrganization,
    changeOrgActivityStatus
} from "./organization/organizationAction"

export {
    getProfile,
    updateProfile,
    changePassword
} from "./profile/profileAction"

export {
    orgChangePassword,
    getOrgProfile,
    updateOrgProfile
} from './orgProfile/orgProfileAction'

export {
    getRoles,
    createRoles,
    deleteRoles
} from './roles/rolesAction'

export {
    getSpecialities,
    createSpecialities,
    updateSpecialities,
    deleteSpecialities
} from './specialities/specialitiesAction'

export {
    getStaff,
    createStaff,
    updateStaff,
    deleteStaff
} from './staff/staffAction'

export {
    getTrust,
    createTrust,
    updateTrust,
    deleteTrust
} from './trust/trustAction'

export {
    getBooking,
    createBooking,
    updateBooking,
    deleteBooking,
    confirmBooking,
    changeShiftStatus,
    userInvitation,
    changePaymentStatus
} from './booking/bookingAction'


export {
    getSignee,
    createSignee,
    updateSignee,
    getCandidateReferredFrom,
    getSingleSignee,
    deleteSignee,
    signeeProStatus,
    signeeCompStatus,
    changeDocStatus
} from './signee/signeeAction'

// -----------------------------

export {
    getStaffProfile,
    updateStaffProfile,
    staffChangePassword
} from "./staffProfile/staffProfileAction"

export {
    getNotification,
    readNotification,
} from "./notificationList/notificationList"
 
export {
    getDashboard,
} from "./dashboard/dashboardAction"

export {
    createPayment, 
} from './payment/createPayment'
