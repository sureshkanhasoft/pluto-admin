export {
    login,
    forgotpassword,
    changepassword
} from "./auth/auth";

export {
    getOrganization,
    createOrganization,
    updateOrganization
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
    deleteBooking
} from './booking/bookingAction'


export {
    getSignee,
    createSignee,
    updateSignee,
    getCandidateReferredFrom,
    getSingleSignee,
    deleteSignee
} from './signee/signeeAction'
