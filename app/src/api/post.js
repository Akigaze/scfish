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
    data: {
      username:username,
      title: title,
      content: content
    }
  })
}

export default postApi


