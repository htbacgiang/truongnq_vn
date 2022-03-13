import actionTypes from '../actions/actionTypes';
import {getAllCodeService} from"../../services/userService";

const initialState = {
    isLoadingGender: false,
   genders:[],
   roles:[],
   users:[]
}

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.FETCH_GENDER_START:
            state.isLoadingGender = true;

            return {
                ...state,
        
            }
            case actionTypes.FETCH_GENDER_SUCCESS:
                  state.genders = action.data;
                  state.isLoadingGender = false;


                    return {
                        ...state,
            
                }
                case actionTypes.FETCH_GENDER_FAIDED:
                    state.isLoadingGender = false;
                    state.genders = [];


                    return {
                        ...state,
                
                    }
                    case actionTypes.FETCH_ALL_USERS_SUCCESS:
                        state.users = action.users;
                        console.log('1',action)
    
                        return {
                            ...state,
                    
                        }
                        case actionTypes.FETCH_ALL_USERS_FAIDED:
                        state.users = [];
    
                        return {
                            ...state,
                    
                        }    
   
        default:
            return state;
    }
}

export default adminReducer;