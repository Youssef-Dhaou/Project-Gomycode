import { GET_CURRENT_USER_FAIL, GET_CURRENT_USER_SUCCESS, GET_ONE_USER_FAIL, GET_ONE_USER_SUCCESS, SIGNIN_USER_FAIL, SIGNIN_USER_SUCCESS, SIGNUP_USER_FAIL, SIGNUP_USER_SUCCESS, UPDATE_ONE_USER_FAIL } from "../contants/userTypes"
const initialState={
errors :null,
currentUser: {},
oneUser:{}
}

export const userReducer = (state= initialState, {type, payload})=>{
switch (type) {

    //signUp case
    case SIGNUP_USER_SUCCESS: return {...state, currentUser: payload}
    case SIGNUP_USER_FAIL: return {...state, errors: payload}

   //signIn case
   case SIGNIN_USER_SUCCESS:
    localStorage.setItem("token", payload.token);
    return { ...state, currentUser: payload.user };
  case SIGNIN_USER_FAIL:
    return { ...state, errors: payload };

//currentUser case
case GET_CURRENT_USER_SUCCESS: return {...state, currentUser: payload}
case GET_CURRENT_USER_FAIL: return {...state, errors: payload}

//upadteUser
case UPDATE_ONE_USER_FAIL:  return {...state, errors: payload}
//get oneUser
case GET_ONE_USER_SUCCESS: return {...state, oneUser: payload}
case GET_ONE_USER_FAIL: return {...state, errors: payload}

    default: return state;

}

}