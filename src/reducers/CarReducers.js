import {
  CAR_ADD,
  INFORMATION_CHANGED
} from "../actions/types";

const INITIAL_STATE = {
    namee: "",
    model: "",
    kilometer: "",
    car: null

}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case CAR_ADD:
            return {...state, car: action.payload}
            
        case INFORMATION_CHANGED:
            return {...state, [action.payload.title]: action.payload.val }
        
       
        default:
            return state;
    }
}
