import service from "../utils/service";

const adminApi = {}

const baseURL = "/scfish/admin/v1"

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

adminApi.access = (token) => {
  return service({
    method: "post",
    url: `${baseURL}/access`,
    data: token,
    headers: {"Content-Type" : "text/plain"}
  })
}

adminApi.register = (username,nickname,password) => {
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


export default adminApi
