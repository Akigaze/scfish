import service from "../utils/service";

const managerApi = {}

const baseURL = "/scfish/manager"

managerApi.isManager = () => {
  return service({
    method: "get",
    url: `${baseURL}/isManager`,
  })
}

export default managerApi;