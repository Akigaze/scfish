import postApi from "../api/post";

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

export const search = (keyword,page) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.search(keyword, page)
          .then(resp => {
            resolve(resp.data)
          }).catch(error => {
        reject(error)
      })
    })
  }
}





