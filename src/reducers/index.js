import { combineReducers } from "redux";
import AuthenticationReducer from "./AuthenticationReducer";
// import CarReducers from "./CarReducers";

export default combineReducers({
    AuthenticationResponse: AuthenticationReducer
    // CarResponse: CarReducers
   
});