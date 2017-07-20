/**
 * Created by Administrator on 2017/7/20.
 */

import storage from './storage'

const PERMISSION = 'permission'
const TOKEN = 'token'

var user = {}

user.check = function () {
  let permission = storage.getLocaleStorage(PERMISSION)
  if (!permission) {
    return false
  }
  let token = storage.getLocaleStorage(TOKEN)
  if (!token) {
    return false
  }
  return true
}

export default user
