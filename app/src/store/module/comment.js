import {comment} from "../../action/actionType";

const initialState = {
  commentPage : []
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case comment.COMMENT_PAGE:
      return {...state, commentPage: action.commentPage}
    default:
      return state
  }
}

export default reducer