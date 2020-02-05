import postApi from "../api/post";
import {post as actionType} from "./actionType";

export const getPosts = (page) => {
    return async (dispatch) =>{
        return new Promise((resolve, reject) => {
            postApi.getPosts(page)
                .then(resp => {
                    const postPage = resp.data
                    dispatch({type: actionType.POST_PAGE, postPage: postPage})
                    resolve(postPage)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}

export const publish = (username,title, content) => {
  return async (dispatch) => {
    return new Promise((resolve,reject)=>{
      postApi.publish(username,title,content)
        .then(resp =>{
          const result = resp.data
          alert(result)
          resolve(result)
        }).catch(error=>{
          reject(error)
      })
    })
  }
}





