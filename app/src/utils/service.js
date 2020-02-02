import store from "../store";
import axios from "axios"

const service = axios.create({
  timeout: 1000000,
  withCredentials: true // 跨域使用
})


function setTokenToHeader(config) {
  let token = store.getters.token();
  if (token){
    config.headers["Scfish-Authorization"] = token
  }
}

service.interceptors.request.use(
  config => {
    config.baseURL = store.getters.apiURL()
    // TODO set token to header or parameter
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
      return Promise.reject(error)
    }
)

export default service
