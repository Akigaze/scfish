const STORAGE_PREFIX = "SCFISH__"

const STORAGE_KEY = {
  USER: "USER",
  TOKEN: "TOKEN"
};

function getItem(key) {
  let item = localStorage.getItem(STORAGE_PREFIX + key)
  try {
    return item ? JSON.parse(item) : item
  }catch (e) {
    console.error(e)
    return item
  }
}

function setItem(key, value = "") {
  const _value = ["number", "string", "boolean"].includes(typeof value)
      ? value
      : JSON.stringify(value)
  localStorage.setItem(STORAGE_PREFIX + key, _value)
}

const getters = {
  user: () => getItem(STORAGE_KEY.USER),
  token: () => getItem(STORAGE_KEY.TOKEN)
}

const setters = {
  user: (value) => setItem(STORAGE_KEY.USER, value),
  token: ({sessionToken, expiredTime}) => setItem(STORAGE_KEY.TOKEN, {sessionToken, expiredTime}),
}

const clear = () => {
  localStorage.clear()
}

const storage = {getters, setters, clear}

export default storage
