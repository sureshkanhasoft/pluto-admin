import Bookings from "./pages/Bookings/Bookings";
import Payment from "./pages/Payments/Payments";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import Dashboard from "./pages/Dashboard/Dashboard";
import Organization from "./pages/Organization/Organization";
import PlanManagement from "./pages/PlanManagement/PlanManagement";
import Holiday from "./pages/Holiday/Holiday";
import Roles from "./pages/Roles/Roles";
import Specialities from "./pages/Specialities/Specialities";
import CreateStaff from "./pages/Staff/CreateStaff";
import Staff from "./pages/Staff/Staff";
import Trust from "./pages/Trust/Trust";
import Profile from "./pages/Profile/Profile";
import OrgProfile from "./pages/Profile/OrgProfile";
import Signee from "./pages/Signee/Signee";
import Notification from "./pages/Notification/Notification";
import StaffUserProfile from "./pages/StaffUser/StaffUserProfile/StaffUserProfile";
import Report from "./pages/Report/Reports";
const loginUserInfo = JSON.parse(window.localStorage.getItem("loginUserInfo"));

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
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : ChangePassword,
        icon:"assignment",
        role:"organization",
        sidebar:false
    },

    {
        name:"Bookings",
        path:"bookings",
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : Bookings,
        icon:"bookmark",
        role:"organization",
    },
    {
        name:"Bookings",
        path:"bookings",
        component:Bookings,
        icon:"bookmark",
        role:"staff",
    },
    {
        name:"Candidate",
        path:"candidate",
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : Signee,
        icon:"assignment",
        role:"organization"
    },
    {
        name:"Candidate",
        path:"candidate",
        component:Signee,
        icon:"assignment",
        role:"staff"
    },
    {
        name:"Staff",
        path:"staff",
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : Staff,
        icon:"people",
        role:"organization",
        children:[
            {
                name:"Create Staff",
                path:"create",
                component:(loginUserInfo?.is_plan_expire === true ) ? Payment : CreateStaff
            }
        ]
    },
    {
        name:"Trust",
        path:"Trust",
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : Trust,
        icon:"shield",
        role:"organization"
    },
    {
        name:"Trust",
        path:"Trust",
        component:Trust,
        icon:"shield",
        role:"staff"
    },
    {
        name:"Roles",
        path:"roles",
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : Roles,
        icon:"manage_accounts",
        role:"organization"
    },
    {
        name:"Specialities",
        path:"specialities",
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : Specialities,
        icon:"volunteer_activism",
        role:"organization"
    },
    {
        name:"Specialities",
        path:"specialities",
        component:Specialities,
        icon:"volunteer_activism",
        role:"staff"
    },
    {
        name:"Reports",
        path:"reports",
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : Report,
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
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : OrgProfile,
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
        sidebar:false
    },
    {
        name:"Notification",
        path:"notification",
        component:(loginUserInfo?.is_plan_expire === true ) ? Payment : Notification,
        // icon:"description",
        role:"organization",
        sidebar:false
    },
    {
        name:"Holiday",
        path:"holiday",
        component:Holiday,
        icon:"holiday_village",
        role:"organization"
    },
    {
        name:"Subscription",
        path:"payment",
        component:Payment,
        icon:"paid",
        role:"organization",
        sidebar:true
    },
]

export default Routes