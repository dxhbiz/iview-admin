/**
 * Created by Administrator on 2017/7/20.
 */

var lang = {}
var langInstance = {}

lang.setLangInstance = function (instance) {
  langInstance = instance
}

lang.getLangInstance = function () {
  return langInstance
}

export default lang
