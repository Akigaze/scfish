import postApi from "../api/post";
import {post as actionType} from "./actionType";

export const getPosts = () => {
    return async (dispatch) =>
        postApi.getPosts()
            .then(resp => {
                const postPage = resp.data.content[1]
                dispatch({type: actionType.POST_PAGE, page: postPage})
            }).catch(error => {
                console.log(error);
            })
}






