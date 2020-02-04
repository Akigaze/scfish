import service from "../utils/service";

const postApi = {}

const baseURL = "/scfish/v1/post"

postApi.getPosts = (page) => {
    return service({
        method : "get",
        url : `${baseURL}/getPosts`,
        params: {
            page:page
        }
    })
}


export default postApi


