import service from "../utils/service";

const postApi = {}

const baseURL = "/scfish/post"

postApi.getPosts = (pageNum, pageSize) => {
  return service({
    method: "get",
    url: `${baseURL}`,
    params: {pageNum, pageSize}
  })
}

postApi.publish = (title, content) => {
  return service({
    method: "post",
    url: `${baseURL}`,
    data: {title, content}
  })
}

postApi.search = (keyword, pageNum, pageSize) => {
  return service({
    method: "post",
    url: `${baseURL}/search`,
    params: {keyword, pageNum, pageSize}
  })
}

export default postApi


