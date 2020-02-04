import store from "../store";
import axios from "axios"
import adminApi from "../api/admin";
import {user} from "../action/actionType";
import history from "../router/history";

const service = axios.create({
  timeout: 1000000,
  withCredentials: true // 跨域使用
})


function setTokenToHeader(config) {
  let token = store.getters.token();
  if (token && token.accessToken){
    config.headers["Access-Authorization"] = token.accessToken
  }
}

async function retryRequest(error) {
  if (error && error.response && error.response.config){
    const config = error.response.config;
    setTokenToHeader(config)
    console.log("retry request", config.path)
    return await axios.request(config)
  }
}

async function refreshToken(token, error){
  try{
    console.log("refresh token")
    const resp = await adminApi.refresh(token)
    console.log("refresh token result", resp)
    store.dispatch({type: user.SET_TOKEN, token: resp.data})
    return retryRequest(error)
  }catch (e) {
    console.log("refresh token occur error", e);
    history.push("/login")
    store.dispatch({type: user.CLEAR_TOKEN})
  }
}

service.interceptors.request.use(
  config => {
    config.baseURL = store.getters.apiURL()
    setTokenToHeader(config)
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
    resp => {
      return resp
    },
    error => {
      const response = error.response
      const status = response ? response.status : -1
      const data = response ? response.data : null

      if (data){
        if (status === 401 && data.status === 401){
          const token = store.getters.token()
          if(token && token.accessToken === data.data && token.refreshToken){
            return refreshToken(token.refreshToken, error)
          }
        }
      }

      return Promise.reject(error)
    }
)

export default service
