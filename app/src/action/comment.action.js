import commentApi from "../api/comment";

export const getComments = (postId, pageNum) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      commentApi.getComments(postId, pageNum)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export const publish = (postId, content) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      commentApi.publish(postId, content)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}