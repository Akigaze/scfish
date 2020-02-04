import service from "../utils/service";

const postApi = {}

const baseURL = "/scfish/v1/post"

postApi.getPosts = () => {
    return service({
        method : "get",
        url : `${baseURL}/getPosts`,
    })
}


export default postApi


