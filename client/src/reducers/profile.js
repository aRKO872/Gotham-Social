import {GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  UPDATE_PROFILE,
  GET_PROFILES} from "../actions/types";

const initialState = {
  profile : null,
  profiles : [],
  loading : true,
  error : {}
};

export default function(state = initialState, action){
  const {type, payload} = action;
  switch(type){
    case GET_PROFILE :
    case UPDATE_PROFILE :
      return {
        ...state,
        loading : false,
        profile : payload
      };
    case GET_PROFILES:
      return {
        ...state,
        profiles : payload,
        loading : false
      }
    case PROFILE_ERROR :
      return {
        ...state,
        loading : false,
        error : payload
      };
    case CLEAR_PROFILE :
      return {
        ...state,
        profile : null,
        loading : false
      };
    default:
      return state;
  }
}
