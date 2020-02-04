import postApi from "../api/post";
import {post as actionType} from "./actionType";

export const getPosts = () => {
    return async (dispatch) =>{
        return new Promise((resolve, reject) => {
            postApi.getPosts()
                .then(resp => {
                    const postPage = resp.data.content
                    dispatch({type: actionType.POST_PAGE, page: postPage})
                    resolve(postPage)
                })
                .catch(error => {
                    reject()
                })
        })
    }
}






