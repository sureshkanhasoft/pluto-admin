import { combineReducers } from "redux";
import authReducer from "./reducer/auth/authReducer";

const rootReducer = combineReducers(
    {
        authReducer:authReducer
    }
);

export default rootReducer