import service from "../utils/service";

const commentApi = {}

const baseURL = "/scfish/comment"

commentApi.getComments = (page,postId) => {
  return service({
    method: "get",
    url: `${baseURL}/getComments`,
    params: {
      page:page,
      postId:postId
    }
  })
}


commentApi.publish = (username,postId,commentContent) => {
  return service({
    method: "post",
    url: `${baseURL}/publish`,
    params: {
      username:username,
      postId:postId,
      commentContent:commentContent
    }
  })
}

export default commentApi