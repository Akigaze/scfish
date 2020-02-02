import {app} from "../../action/actionType";

const initialState = {
  apiURL: null,
}

const reducer = (state = initialState, action) => {

  switch (action.type) {
    case app.SET_API_URL:
      return {...state, apiURL: action.apiURL}
    default:
      return state
  }

}

export default reducer
