import store from "../store";
import axios from "axios"

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

function handleError(status, data){

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

      console.log(status, data);
      // TODO refresh token if token is expired
      handleError(status, data)

      return Promise.reject(error)
    }
)

export default service
