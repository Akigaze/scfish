import postApi from "../api/post";
import picUtils from "../utils/picUtils";

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

export const publish = (title, content, form) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.publish(title, content, form)
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
          resolve(resp.data)
        }).catch(error => {
        reject(error)
      })
    })
  }
}

export const getMyPosts = (pageNum, pageSize) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.getMyPost(pageNum, pageSize)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export const addFavorite = (postId) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.addFavorite(postId)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export const removeFavorite = (postId) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.removeFavorite(postId)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export const getMyFavorite = (pageNum, pageSize) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.getMyFavorite(pageNum, pageSize)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export const addLike = (postId) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.addLike(postId)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}

export const removeLike = (postId) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) => {
      postApi.removeLike(postId)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }
}