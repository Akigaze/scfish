import managerApi from "../api/manager";

export const isManager = () => {
  return async (dispatch) => {
    return new Promise((resolve, reject) =>
      managerApi.isManager()
        .then(resp => {
          dispatch({type:"isManager",isManager:resp.data})
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
    )
  }
}

export const addForbidden = (username,remark,duration) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) =>
      managerApi.addForbidden(username,remark,duration)
        .then(resp => {
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
    )
  }
}

export const liftForbidden = (username) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) =>
      managerApi.liftForbidden(username)
        .then(resp => {
          resolve(resp)
        })
        .catch(error => {
          reject(error)
        })
    )
  }
}

export const getForbiddenHistory = (pageNum,pageSize) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) =>
      managerApi.getForbiddenHistory(pageNum,pageSize)
        .then(resp => {
          resolve(resp.data)
        })
        .catch(error => {
          reject(error)
        })
    )
  }
}


