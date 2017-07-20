/**
 * Created by Administrator on 2017/7/20.
 */

var storage = {}
const SESSION_TYPE = 'session'
const LOCALE_TYPE = 'locale'

function getInstance (type) {
  let storageInstance = localStorage
  if (type === SESSION_TYPE) {
    storageInstance = sessionStorage
  }
  return storageInstance
}

function getStorage (type, key) {
  let storageInstance = getInstance(type)
  let value = storageInstance.getItem(key)
  if (value) {
    return JSON.parse(value)
  }
  return null
}

function setStorage (type, key, value) {
  let storageInstance = getInstance(type)
  storageInstance.setItem(key, JSON.stringify(value))
}

function delStorage (type, key) {
  let storageInstance = getInstance(type)
  storageInstance.removeItem(key)
}

storage.getLocaleStorage = function (key) {
  return getStorage(LOCALE_TYPE, key)
}

storage.setLocaleStorage = function (key, value) {
  setStorage(LOCALE_TYPE, key, value)
}

storage.removeLocaleStorage = function (key) {
  delStorage(LOCALE_TYPE, key)
}

storage.getSessionStorage = function (key) {
  return getStorage(SESSION_TYPE, key)
}

storage.setSessionStorage = function (key, value) {
  setStorage(SESSION_TYPE, key, value)
}

storage.removeSessionStorage = function (key) {
  delStorage(SESSION_TYPE, key)
}

export default storage
