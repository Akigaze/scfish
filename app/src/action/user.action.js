import adminApi from "../api/admin";
import {user} from "./actionType"
import userApi from "../api/user";

export const login = (username, password) => {
  return async (dispatch) => {
    return new Promise((resolve, reject) =>
        adminApi.login(username, password)
            .then(resp => {
              const token = resp.data
              dispatch({type: user.SET_TOKEN, token})
              resolve(resp)
            })
            .catch(error => {
              console.log(error);
              reject(error)
            })
    )
  }
}

export const getProfile = () => {
  return async (dispatch) => {
    return new Promise((resolve, reject) =>
        userApi.profile()
            .then(resp => {
              const profile = resp.data
              dispatch({type: user.SET_PROFILE, profile})
              resolve(resp)
            })
            .catch(error => {
              reject(error)
            })
    )
  }
}

export const register = (username, nickname, password) => {
    return async (dispatch) =>
        adminApi.register(username, nickname, password)
            .then(resp => {
                const result = resp.data;
                alert(result)
            }).catch(error => {
            console.log(error);
        })
}
