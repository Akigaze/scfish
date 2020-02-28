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

adminApi.modify = (newProfile) => {
  return service({
    method: "post",
    url: `${baseURL}/modify`,
    data: {
      username: newProfile.username,
      nickname: newProfile.nickname
    }
  })
}

adminApi.updateAvatar = (newAvatar) => {
  return service({
    headers:{'Content-Type':'multipart/form-data'},
    method: "post",
    url: `${baseURL}/updateAvatar`,
    data: newAvatar
  })
}

export default adminApi
