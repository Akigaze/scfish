const getters = {
  user: state => state.user.profile,
  token: state => state.user.token,
  apiURL: state => {
    if (state.app.apiURL) {
      return state.app.apiURL
    }
    return `${window.location.protocol}//${window.location.host}`
  },
}

export default getters
