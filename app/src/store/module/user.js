import {user} from "../../action/actionType";

const initialState = {
  profile: {},
  token: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case user.SET_TOKEN:
      return {...state, token: action.token}
    case user.SET_USER:
      return {...state, profile: action.profile}
    default:
      return state
  }
}

export default reducer
