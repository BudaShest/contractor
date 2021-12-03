import {combineReducers} from "redux";
import {authReducer} from "./loginReducer";

const mainReducer = combineReducers({
    auth: authReducer,
});

export default mainReducer;