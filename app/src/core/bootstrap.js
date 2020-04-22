import storage from "./storage";
import store from "../store";
import {user} from "../action/actionType";

export default function Initializer() {
  store.dispatch({type: user.SET_TOKEN, token: storage.getters.token()})
  store.dispatch({type: user.SET_PROFILE, profile: storage.getters.profile()})
  store.dispatch({type:"isManager",isManager:storage.getters.isManager()})
}