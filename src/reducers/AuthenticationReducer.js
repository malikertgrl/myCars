
import {
    TEXTINPUT_CHANGED,
    LOGIN_USER,
    LOGIN_USER_SUCCESS,
    LOGIN_USER_FAIL,
    // LOADING_ACTION
} from "../actions/types";

const INITIAL_STATE = {
    email: "",
    password: "",
    loading: false,
    user: null

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case TEXTINPUT_CHANGED:
            return { ...state, [action.payload.props]: action.payload.value };
        case LOGIN_USER:
            return { ...state, loading: true }
        case LOGIN_USER_SUCCESS:
            return { ...state, loading: false  }
        case LOGIN_USER_FAIL:
            return { ...state, loading: false }
        
        default:
            return state;
    }
}
