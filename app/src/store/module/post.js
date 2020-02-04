import {post} from "../../action/actionType";

const initialState = {
    pagePage : []
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case post.POST_PAGE:
            return {...state, pagePage: action.pagePage}
        default:
            return state
    }
}

export default reducer
