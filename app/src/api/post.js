import service from "../utils/service";

const postApi = {}

const baseURL = "/scfish/post"

postApi.getPosts = (page) => {
    return service({
        method : "get",
        url : `${baseURL}/getPosts`,
        params: {
            page:page
        }
    })
}

postApi.publish = (username,title,content) => {
  return service({
    method: "post",
    url: `${baseURL}/publish`,
    params: {
      username:username,
      title: title,
      content: content
    }
  })
}

postApi.search = (keyword,page) => {
  return service({
    method: "post",
    url: `${baseURL}/search`,
    params: {
      keyword:keyword,
      page: page
    }
  })
}

export default postApi


