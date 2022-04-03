import axios from "axios"
import {setAlert} from "./alert"
import {GET_POSTS, POST_ERROR, UPDATE_LIKES_DISLIKES, DELETE_POST, ADD_POST, GET_POST, ADD_COMMENT, REMOVE_COMMENT} from "./types"

//get posts
export const getPosts = () => async dispatch => {
  try{
    const res = await axios.get("/api/posts");

    dispatch({
      type : GET_POSTS,
      payload : res.data
    });
  }catch(err){
    dispatch({
      type : POST_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//get post
export const getPost = id => async dispatch => {
  try{
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type : GET_POST,
      payload : res.data
    });
  }catch(err){
    dispatch({
      type : POST_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

// Add like
export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.put(`/api/posts/like/${id}`);
    dispatch({
      type: UPDATE_LIKES_DISLIKES,
      payload: { id, likes: res.data.like, dislikes : res.data.dislike}
    });
  } catch (err) {
    dispatch({
      type: POST_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status }
    });
  }
};

//add dislike to post
export const addDislike = (id) => async dispatch => {
  try{
    const res = await axios.put(`/api/posts/dislike/${id}`);
    dispatch({
      type : UPDATE_LIKES_DISLIKES,
      payload : {id, dislikes : res.data.dislike, likes : res.data.like}
    });
  }catch(err){
    dispatch({
      type : POST_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//delete post
export const deletePost = (id) => async dispatch => {
  try{
    await axios.delete(`/api/posts/${id}`);
    dispatch({
      type : DELETE_POST,
      payload : id
    });
    dispatch(setAlert("Post deleted successfully", "success"));
  }catch(err){
    dispatch({
      type : POST_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//add post
export const addPost = formData => async dispatch => {
  try{
    const config = {
      headers : {
        "Content-Type" : "application/json"
      }
    };
    const res = await axios.post(`/api/posts`, formData, config);
    dispatch({
      type : ADD_POST,
      payload : res.data
    });
    dispatch(setAlert("Post added successfully", "success"));
  }catch(err){
    dispatch({
      type : POST_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//add comment
export const addComment = (postId, formData) => async dispatch => {
  try{
    const res = await axios.post(`/api/posts/comments/${postId}`, formData);
    console.log(res.data)
    dispatch({
      type : ADD_COMMENT,
      payload : res.data
    });
    dispatch(setAlert("Comment added successfully", "success"));
  }catch(err){
    dispatch({
      type : POST_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}

//delete comment
export const deleteComment = (postId, commentId) => async dispatch => {
  try{
    await axios.delete(`/api/posts/comments/${postId}/${commentId}`);
    dispatch({
      type : REMOVE_COMMENT,
      payload : commentId
    });
    dispatch(setAlert("Comment deleted successfully", "success"));
  }catch(err){
    dispatch({
      type : POST_ERROR,
      payload : {msg : err.response.statusText, status : err.response.status}
    });
  }
}
