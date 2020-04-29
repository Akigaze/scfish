import service from "../utils/service";

const managerApi = {}

const baseURL = "/scfish/manager"

managerApi.isManager = () => {
  return service({
    method: "get",
    url: `${baseURL}/isManager`,
  })
}

managerApi.addForbidden =(username,remark,type)=>{
  return service({
    method: "post",
    url: `${baseURL}/addForbidden`,
    data:{username, remark, type}
  })
}

managerApi.liftForbidden =(username)=>{
  return service({
    headers:{'Content-Type':'text/html'},
    method: "post",
    url: `${baseURL}/liftForbidden`,
    data: username
  })
}

managerApi.getForbiddenHistory =(pageNum,pageSize)=>{
  return service({
    method: "get",
    url: `${baseURL}/getForbiddenHistory`,
    params:{pageNum, pageSize}
  })
}

export default managerApi;