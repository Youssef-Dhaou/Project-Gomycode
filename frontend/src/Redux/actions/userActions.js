import axios from "axios";
import { GET_CURRENT_USER_FAIL, GET_CURRENT_USER_SUCCESS, GET_ONE_USER_FAIL, GET_ONE_USER_SUCCESS, GET_USERS_FAIL, GET_USERS_LOADING, GET_USERS_SUCCESS, LOGOUT, SIGNIN_USER_FAIL, SIGNIN_USER_SUCCESS, SIGNUP_USER_FAIL, SIGNUP_USER_SUCCESS, UPDATE_ONE_USER_FAIL, UPDATE_ONE_USER_SUCCESS } from "../contants/userTypes";


export const signupUser =  (user, navigate) => async (dispatch) =>{
try {

    const response = await axios.post("http://localhost:5000/users/registerUser", user)
    dispatch({type:SIGNUP_USER_SUCCESS, payload: response.data.newUser})
    navigate("/signin")
} catch (error) {
    console.log(error)
    dispatch({type: SIGNUP_USER_FAIL, payload: error})
}
}


export const signinUser = (user, navigate) => async (dispatch) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/users/login",
        user
      );
      dispatch({ type: SIGNIN_USER_SUCCESS, payload: response.data });
      navigate("/profile");
    } catch (error) {
      console.log(error);
      dispatch({ type: SIGNIN_USER_FAIL, payload: error });
    }
  };

    export const getCurrentUser = ()=> async(dispatch)=>{
        const token = localStorage.getItem("token")
        try {
            const response = await axios("http://localhost:5000/users/currentUser", {headers:{Authorization:`Bearer ${token}`}})
            dispatch({type:GET_CURRENT_USER_SUCCESS, payload: response.data})
        } catch (error) {
            dispatch({type:GET_CURRENT_USER_FAIL, payload:error})
        }

    }


    export const editUser=(editUser,navigate) => async (dispatch) => {
        const token = localStorage.getItem("token")
        try {
          const response = await axios.put(
            "http://localhost:5000/users/editUser",editUser, {headers:{Authorization:`Bearer ${token}`}}
          );
          dispatch({type:UPDATE_ONE_USER_SUCCESS})
          dispatch(getCurrentUser())
          navigate("/profile")
        } catch (error) {
          console.log(error);
          dispatch({type:UPDATE_ONE_USER_FAIL,payload:error})
        }
      };

      export const getOneUser=(id) => async (dispatch) => {
        try {
          const response = await axios.get(
            `http://localhost:5000/users/oneUser/${id}`
          );
          dispatch({type:GET_ONE_USER_SUCCESS,payload:response.data.oneUser})
        } catch (error) {
          console.log(error);
          dispatch({type:GET_ONE_USER_FAIL,payload:error})
        }
      };
      export const logoutUser = (navigate) => {
        navigate("/signin");
        return { type: LOGOUT };
      };


      export const getAllUsers = ()=> async dispatch=>{
        const token = localStorage.getItem("token")
        dispatch({type:GET_USERS_LOADING})
        try {
            const response=await axios.get("http://localhost:5000/users/allUsers/",{headers:{Authorization:`Bearer ${token}`}})
            dispatch({type: GET_USERS_SUCCESS, payload:response.data})
        } catch (error) {
            console.log(error)
            dispatch({type: GET_USERS_FAIL, payload: error})
        }
    
    }