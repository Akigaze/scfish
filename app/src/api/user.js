import service from "../utils/service";

const userApi = {}

const baseURL = "/scfish/user"

userApi.profile = () => {
  return service({
    method: "get",
    url: `${baseURL}/profile`,
  })
}

export default userApi
