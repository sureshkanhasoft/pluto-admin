import Bookings from "./pages/Bookings/Bookings";
import CreateBooking from "./pages/Bookings/CreateBooking";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Organization from "./pages/Organization/Organization";
import PlanManagement from "./pages/PlanManagement/PlanManagement";
import Roles from "./pages/Roles/Roles";
import Specialities from "./pages/Specialities/Specialities";
import CreateStaff from "./pages/Staff/CreateStaff";
import Staff from "./pages/Staff/Staff";
import Trust from "./pages/Trust/Trust";
import Profile from "./pages/Profile/Profile";
import OrgProfile from "./pages/Profile/OrgProfile";
import Signee from "./pages/Signee/Signee";
import StaffUserProfile from "./pages/StaffUser/StaffUserProfile/StaffUserProfile";

const Routes = [
    {
        name:"Dashboard",
        path:"dashboard",
        component:Dashboard,
        icon:"dashboard",
        role:"superadmin"
    },
    {
        name:"Organizations",
        path:"organizations",
        component:Organization,
        icon:"business",
        role:"superadmin"
    },
    {
        name:"Plan Management",
        path:"plan",
        component:PlanManagement,
        icon:"account_tree",
        role:"superadmin"
    },

    {
        name:"change-password",
        path:"change-password",
        component:ChangePassword,
        icon:"assignment",
        role:"organization",
        sidebar:false
    },

    {
        name:"Bookings",
        path:"bookings",
        component:Bookings,
        icon:"bookmark",
        role:"organization",
        children:[
            {
                name:"create-booking",
                path:"create",
                component:CreateBooking
            }
        ]
    },
    {
        name:"Signee",
        path:"signee",
        component:Signee,
        icon:"assignment",
        role:"organization"
    },
    {
        name:"Staff",
        path:"staff",
        component:Staff,
        icon:"people",
        role:"organization",
        children:[
            {
                name:"Create Staff",
                path:"create",
                component:CreateStaff
            }
        ]
    },
    {
        name:"Trust",
        path:"Trust",
        component:Trust,
        icon:"shield",
        role:"organization"
    },
    {
        name:"Roles",
        path:"roles",
        component:Roles,
        icon:"manage_accounts",
        role:"organization"
    },
    {
        name:"Specialities",
        path:"specialities",
        component:Specialities,
        icon:"volunteer_activism",
        role:"organization"
    },
    {
        name:"Reports",
        path:"reports",
        component:PlanManagement,
        icon:"description",
        role:"organization"
    },
    {
        name:"Profile",
        path:"profile",
        component:Profile,
        // icon:"description",
        role:"superadmin",
        sidebar:false
    },
    {
        name:"Organization Profile",
        path:"organization-profile",
        component:OrgProfile,
        // icon:"description",
        role:"organization",
        sidebar:false
    },
    {
        name:"Staff Profile",
        path:"staff-profile",
        component:StaffUserProfile,
        icon:"people",
        role:"staff",
        sidebar:true
    },

]

export default Routes