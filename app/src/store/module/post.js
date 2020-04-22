const initialState = {
  keyword: ''
}

const reducer = (state = initialState, action) => {
  if (action.type === 'keyword') {
    return {...state, keyword: action.keyword}
  } else {
    return state
  }
}

export default reducer
