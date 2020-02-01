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

export default adminApi
