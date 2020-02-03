import adminApi from "../api/admin";
import {user} from "./actionType"
import storage from "../core/storage";

export const login = (username, password) => {
    return async (dispatch) =>
        adminApi.login(username, password)
            .then(resp => {
                const {sessionToken, expiredTime, profile} = resp.data
                dispatch({type: user.SET_TOKEN, token: {sessionToken, expiredTime}})
                dispatch({type: user.SET_USER, profile})
                storage.setters.token({sessionToken, expiredTime})
                storage.setters.user(profile)
            })
            .catch(error => {
                console.log(error);
            })
}

export const getAccess = () => {
    return async (dispatch, getState) => {
        return new Promise((resolve, reject) =>
            adminApi.access(getState().user.token.sessionToken)
                .then(resp => {
                    const accessToken = resp.data
                    dispatch({type: user.SET_ACCESS_TOKEN, accessToken})
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
