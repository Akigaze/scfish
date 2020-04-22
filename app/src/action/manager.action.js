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