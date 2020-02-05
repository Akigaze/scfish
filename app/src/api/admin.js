import service from "../utils/service";

const adminApi = {}

const baseURL = "/scfish/admin"

adminApi.login = (username, password) => {
  return service({
    method: "post",
    url: `${baseURL}/login`,
    data: {
      username: username,
      password: password
    }
  })
}

adminApi.refresh = (token) => {
  return service({
    method: "post",
    url: `${baseURL}/refresh/${token}`
  })
}

adminApi.register = (username, nickname, password) => {
  return service({
    method: "post",
    url: `${baseURL}/register`,
    data: {
      username: username,
      nickname: nickname,
      password: password
    }
  })
}

adminApi.logout = () => {
  return service({
    method: "post",
    url: `${baseURL}/logout`
  })
}

export default adminApi
