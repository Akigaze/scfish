import {user} from "../../action/actionType";
import storage from "../../core/storage";

const initialState = {
  profile: {},
  token: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case user.SET_TOKEN: {
      storage.setters.token(action.token)
      return {...state, token: action.token}
    }
    case user.SET_PROFILE:
      return {...state, profile: action.profile}
    default:
      return state
  }
}

export default reducer
