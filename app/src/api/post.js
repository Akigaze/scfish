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

postApi.publish = (title, content, file) => {
  return service({
    headers:{'Content-Type':'multipart/form-data'},
    method: "post",
    url: `${baseURL}/publish`,
    data: file,
    params:{title, content}
  })
}

postApi.deletePost = (postId) => {
  return service({
    method: "delete",
    url: `${baseURL}`,
    params: {postId}
  })
}

postApi.search = (keyword, pageNum, pageSize) => {
  return service({
    method: "post",
    url: `${baseURL}/search`,
    params: {keyword, pageNum, pageSize}
  })
}

postApi.getMyPost = (pageNum, pageSize) => {
  return service({
    method: "get",
    url: `${baseURL}/getMyPosts`,
    params: {pageNum, pageSize}
  })
}

postApi.addFavorite = (postId) => {
  return service({
    method: "get",
    url: `${baseURL}/addFavorite`,
    params: {postId}
  })
}

postApi.removeFavorite = (postId) => {
  return service({
    method: "get",
    url: `${baseURL}/removeFavorite`,
    params: {postId}
  })
}

postApi.getMyFavorite = (pageNum, pageSize) => {
  return service({
    method: "get",
    url: `${baseURL}/getMyFavorite`,
    params: {pageNum, pageSize}
  })
}

postApi.addLike = (postId) => {
  return service({
    method: "get",
    url: `${baseURL}/addLike`,
    params: {postId}
  })
}

postApi.removeLike = (postId) => {
  return service({
    method: "get",
    url: `${baseURL}/removeLike`,
    params: {postId}
  })
}

postApi.loadImg = (postId,index) => {
  return service({
    method: "get",
    url: `${baseURL}/loadImg`,
    params: {postId,index}
  })
}

export default postApi


