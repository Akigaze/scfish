import adminApi from "../api/admin";
import {user} from "./actionType"
import storage from "../core/storage";

export const login = (username, password) => {
  return async (dispatch) =>
      adminApi.login(username, password)
          .then(resp => {
            const {token, profile} = resp.data
            dispatch({type: user.SET_TOKEN, token})
            dispatch({type: user.SET_USER, profile})
            storage.setters.token(token)
            storage.setters.user(profile)
          })
}