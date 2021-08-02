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

const Routes = [
    {
        name:"Dashboard",
        path:"dashboard",
        component:Dashboard,
        icon:"dashboard",
        role:"superAdmin"
    },
    {
        name:"Organizations",
        path:"organizations",
        component:Organization,
        icon:"business",
        role:"superAdmin"
    },
    {
        name:"Plan Management",
        path:"plan",
        component:PlanManagement,
        icon:"account_tree",
        role:"superAdmin"
    },

    {
        name:"change-password",
        path:"change-password",
        component:ChangePassword,
        icon:"assignment",
        role:"admin",
        sidebar:false
    },

    {
        name:"Bookings",
        path:"bookings",
        component:Bookings,
        icon:"bookmark",
        role:"admin",
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
        component:PlanManagement,
        icon:"assignment",
        role:"admin"
    },
    {
        name:"Staff",
        path:"staff",
        component:Staff,
        icon:"people",
        role:"admin",
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
        role:"admin"
    },
    {
        name:"Roles",
        path:"roles",
        component:Roles,
        icon:"manage_accounts",
        role:"admin"
    },
    {
        name:"Specialities",
        path:"specialties",
        component:Specialities,
        icon:"volunteer_activism",
        role:"admin"
    },
    {
        name:"Reports",
        path:"reports",
        component:PlanManagement,
        icon:"description",
        role:"admin"
    },
    {
        name:"Profile",
        path:"profile",
        component:Profile,
        // icon:"description",
        role:"superAdmin",
        sidebar:false
    },

]

export default Routes