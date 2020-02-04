import postApi from "../api/post";
import {post as actionType} from "./actionType";

export const getPosts = (page) => {
    return async (dispatch) =>{
        return new Promise((resolve, reject) => {
            postApi.getPosts(page)
                .then(resp => {
                    const postPage = resp.data.content
                    dispatch({type: actionType.POST_PAGE, postPage: postPage})
                    resolve(postPage)
                })
                .catch(error => {
                    reject(error)
                })
        })
    }
}






