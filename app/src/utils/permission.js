import store from "../store";

const authorize = () => {
  return Boolean(store.getters.token())
}

export default authorize
