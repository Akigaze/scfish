import service from "../utils/service";
const commentApi = {}

const baseURL = "/scfish/comment"

commentApi.getComments = (postId, pageNum) => {
  return service({
    method: "get",
    url: `${baseURL}`,
    params: {pageNum, postId}
  })
}

commentApi.publish = (postId, content) => {
  return service({
    method: "post",
    url: `${baseURL}`,
    data: {postId, content}
  })
}

commentApi.deleteComment = (commentId) => {
  return service({
    method: "delete",
    url: `${baseURL}`,
    params: {commentId}
  })
}

export default commentApi