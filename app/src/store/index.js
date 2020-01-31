import {createStore, combineReducers} from "redux"
import user from "./module/user";
import getters from "./getters";

const reducers = combineReducers({user});

const store = createStore(reducers)

store.getters = new Proxy(getters, {
  get: (target, key) => {
    return key in target ? () => target[key](store.getState()) : undefined
  }
})


export default store
