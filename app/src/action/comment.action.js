import commentApi from "../api/comment";
import {comment} from "./actionType";

export const getComments = (page,postId) => {
  return async (dispatch) => {
    return new Promise((resolve,reject)=>{
      commentApi.getComments(page,postId)
        .then(resp =>{
          const commentPage = resp.data
          dispatch({type:comment.COMMENT_PAGE,commentPage:commentPage})
          resolve(commentPage)
        }).catch(error=>{
        reject(error)
      })
    })
  }
}
