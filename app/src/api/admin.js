import service from "../utils/service";
const adminApi = {}

const baseURL = "http://localhost:8088/scfish/admin/v1"

adminApi.login = (username, password) => {
  return service({
    method: "post",
    url: `${baseURL}/login`,
    params: {
      id: username,
      password: password
    }
  })
}

export default adminApi
