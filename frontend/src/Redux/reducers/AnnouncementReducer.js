import { ADD_ANNOUNCE_FAIL, DELETE_ANNOUNCE_FAIL, GET_ANNOUNCE_FAIL, GET_ANNOUNCE_LOADING, GET_ANNOUNCE_SUCCESS, GET_ONE_ANNOUNCE_FAIL, GET_ONE_ANNOUNCE_SUCCESS, POST_ERROR, UNLIKE_ANNOUNCE_FAIL, UNLIKE_ANNOUNCE_SUCCESS, UPDATE_LIKES, UPDATE_ONE_ANNOUNCE_FAIL } from "../contants/AnnounecementTypes";

const initialState={
    loading: false,
    Announces:[],
    errors:null,
    oneAnnounce:{},
    likes:[]
    }

    export const AnnounceReducer =(state= initialState, {type, payload})=>{
        switch (type) {
            //get all Announcements
            case GET_ANNOUNCE_LOADING: return{...state, loading: true }
            case GET_ANNOUNCE_SUCCESS: return{...state,Announces:payload , loading: false }
            case GET_ANNOUNCE_FAIL: return{...state, errors:payload , loading: false }
            
            //add new announcement
            case ADD_ANNOUNCE_FAIL: return{...state, errors:payload}

            //get one announce
            case GET_ONE_ANNOUNCE_SUCCESS:return{...state,oneAnnounce:payload}
            case GET_ONE_ANNOUNCE_FAIL: return {...state, errors: payload}

             //edit new announcement
             case UPDATE_ONE_ANNOUNCE_FAIL: return{...state, errors:payload}
                
             //edit new announcement
             case DELETE_ANNOUNCE_FAIL: return {...state, errors: payload}
            
    //like and unlike announcement
    case UPDATE_LIKES:return{...state,oneAnnounce: state.oneAnnounce.map(el=>el._id==payload.id?{...el, likes:payload.likes}: el)}
    case POST_ERROR: return {...state, errors: payload}


    default: return state;
               
        }

    }
