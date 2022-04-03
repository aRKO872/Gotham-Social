import axios from "axios";
import {GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE, CLEAR_PROFILE, DELETE_ACCOUNT,
GET_PROFILES} from "./types";
import {setAlert} from "./alert";

//get current profile
export const getCurrentProfile = () => async dispatch => {
  try{
    const res = await axios.get("/api/profile/me");

    dispatch({
      type : GET_PROFILE,
      payload : res.data
    });
  }catch(err){
    dispatch({
      type : PROFILE_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//get profile by ID
export const getProfileById = (userId) => async dispatch => {
  dispatch({ type : CLEAR_PROFILE });
  try{
    const res = await axios.get(`/api/profile/user/${userId}`);

    dispatch({
      type : GET_PROFILE,
      payload : res.data
    });
  }catch(err){
    dispatch({
      type : PROFILE_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//get all profiles
export const getProfiles = () => async dispatch => {
  dispatch({ type : CLEAR_PROFILE });
  try{
    const res = await axios.get("/api/profile");

    dispatch({
      type : GET_PROFILES,
      payload : res.data
    });
  }catch(err){
    dispatch({
      type : PROFILE_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//create or update currrent profile
export const createProfile = (formData, navigate, edit=false) => async dispatch => {
  try{
    const res = await axios.post("/api/profile", formData);
    dispatch({
      type : GET_PROFILE,
      payload : res.data
    });
    dispatch(setAlert(edit ? "Profile Updated" : "Profile Created", "success"));

    navigate("/dashboard");
  }catch(err){
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type : PROFILE_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//add education
export const addEducation = (formData, navigate) => async dispatch => {
  try{
    const res = await axios.put("/api/profile/education", formData);
    dispatch({
      type : UPDATE_PROFILE,
      payload : res.data
    });
    dispatch(setAlert("Education Added", "success"));
    navigate("/dashboard");
  }catch(err){
    const errors = err.response.data.errors;
    if(errors){
      errors.forEach(error => dispatch(setAlert(error.msg, "danger")));
    }
    dispatch({
      type : PROFILE_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//delete education
export const deleteEducation = (id) => async dispatch => {
  try{
    const res = await axios.delete(`/api/profile/education/${id}`);
    dispatch({
      type : UPDATE_PROFILE,
      payload : res.data
    });
    dispatch(setAlert("Education Removed", "primary"))
  }catch(err){
    dispatch({
      type : PROFILE_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//delete account
export const deleteAccount = () => async dispatch => {
  if(window.confirm("You're sure about losing this citizen account? This CANNOT be reverted!")){
    try{
      const res = await axios.delete("/api/profile");
      dispatch({
        type : CLEAR_PROFILE,
      });
      dispatch({type : DELETE_ACCOUNT});
      dispatch(setAlert("Your citizen account is deleted permanently"));
    }catch(err){
      dispatch({
        type : PROFILE_ERROR,
        payload : {msg : err.response.statusText, status : err.response.status}
      });
    }
  }
}
