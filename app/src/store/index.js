import {createStore, applyMiddleware, combineReducers} from "redux"
import thunk from "redux-thunk"
import user from "./module/user";
import app from "./module/app";
import getters from "./getters";

const reducers = combineReducers({user, app});

const store = createStore(reducers, applyMiddleware(thunk))

store.getters = new Proxy(getters, {
  get: (target, key) => {
    return key in target ? () => target[key](store.getState()) : undefined
  }
})


export default store
