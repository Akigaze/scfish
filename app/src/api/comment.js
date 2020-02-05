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

export default commentApi