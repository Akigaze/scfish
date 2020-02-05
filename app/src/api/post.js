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


export default postApi


