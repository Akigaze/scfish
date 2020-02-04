import {post} from "../../action/actionType";

const initialState = {
    page : {}
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case post.POST_PAGE:
            return {...state, page: action.page}
        default:
            return state
    }
}

export default reducer
