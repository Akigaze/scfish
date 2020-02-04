import {user} from "../../action/actionType";
import storage from "../../core/storage";

const initialState = {
  profile: null,
  token: null
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case user.SET_TOKEN: {
      storage.setters.token(action.token)
      return {...state, token: action.token}
    }
    case user.SET_PROFILE:{
      storage.setters.profile(action.profile)
      return {...state, profile: action.profile}
    }
    case user.CLEAR_TOKEN: {
      storage.clear()
      return {...state, token: null}
    }
    default:
      return state
  }
}

export default reducer
