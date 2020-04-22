const STORAGE_PREFIX = "SCFISH__"

const STORAGE_KEY = {
  PROFILE: "PROFILE",
  TOKEN: "TOKEN",
  ISMANAGER: "ISMANAGER"
};

function getItem(key) {
  let item = localStorage.getItem(STORAGE_PREFIX + key)
  if(item){
    try {
      item = JSON.parse(item)["value"]
    }catch (e) {
      console.error(e)
    }
  }
  console.log(`get [{${key} : ${item}] from localstorage`)
  return item

}

function setItem(key, value) {
  const item = {
    value: value,
    expiredTime: null
  }
  localStorage.setItem(STORAGE_PREFIX + key, JSON.stringify(item))
  console.log(`set [{${key} : ${value}] into localstorage`)
}

const getters = {
  profile: () => getItem(STORAGE_KEY.PROFILE),
  token: () => getItem(STORAGE_KEY.TOKEN),
  isManager: () => getItem(STORAGE_KEY.ISMANAGER)
}

const setters = {
  profile: (value) => setItem(STORAGE_KEY.PROFILE, value),
  token: (value) => setItem(STORAGE_KEY.TOKEN, value),
  isManager: (value) => setItem(STORAGE_KEY.ISMANAGER,value)
}

const clear = () => {
  localStorage.clear()
}

const storage = {getters, setters, clear}

export default storage
