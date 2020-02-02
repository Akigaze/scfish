const STORAGE_PREFIX = "SCFISH__"

const STORAGE_KEY = {
  USER: "USER",
  TOKEN: "TOKEN"
};

function getItem(key) {
  return localStorage.getItem(STORAGE_PREFIX + key)
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
  token: (value) => setItem(STORAGE_KEY.TOKEN, value),
}

const storage = {getters, setters}

export default storage
