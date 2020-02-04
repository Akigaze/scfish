import service from "../utils/service";

const userApi = {}

const baseURL = "/scfish/user/v1"

userApi.profile = () => {
  return service({
    method: "get",
    url: `${baseURL}/profile`,
  })
}

export default userApi
