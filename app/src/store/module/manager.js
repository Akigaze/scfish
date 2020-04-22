import storage from "../../core/storage";

const initialState = {
    isManager: false
}

const reducer = (state = initialState, action) => {
  if (action.type === 'isManager') {
    storage.setters.isManager(action.isManager)
    return {...state, isManager: action.isManager}
  } else {
    return state
  }
}

export default reducer
