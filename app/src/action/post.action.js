import postApi from "../api/post";
import {post as actionType} from "./actionType";

export const getPosts = (pageNum, pageSize) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.getPosts(pageNum, pageSize)
          .then(resp => {
            resolve(resp.data)
          })
          .catch(error => {
            reject(error)
          })
    })
  }
}

export const publish = (title, content) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.publish(title, content)
          .then(resp => {
            resolve(resp.data)
          })
          .catch(error => {
            reject(error)
          })
    })
  }
}

export const search = (keyword, page) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.search(keyword, page)
          .then(resp => {
            const postPage = resp.data
            dispatch({type: actionType.POST_PAGE, postPage: postPage})
            resolve(postPage)
          }).catch(error => {
        reject(error)
      })
    })
  }
}




