const initialState = {
  keyword: ''
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'keyword':
      return {...state, keyword: action.keyword}
    default:
      return state
  }
}

export default reducer
