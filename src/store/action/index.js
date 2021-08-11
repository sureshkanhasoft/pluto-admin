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
    updateSpecialities
} from './specialities/specialitiesAction'
 