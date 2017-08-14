/**
 * Created by Administrator on 2017/7/15.
 */

import axios from 'axios'
import config from '../config/index'
// import qs from 'querystring'
var api = {}

var baseurl = config.url.baseurl
if (baseurl === '') {
  let location = window.location
  baseurl = location.protocol + '//' + location.host
}
if (process.env.NODE_ENV === 'development') {
  baseurl = ''
}

//请求方法
function request (url, method, params) {
  method = method.toUpperCase();
  var body = ''
  if (method === 'POST') {
    body = params
    params = {}
  }
  return new Promise((resolve, reject) => {
    axios({
      url: url,
      method: method,
      params: params,
      data: body
    }).then((res) => {
      resolve(res.data)
    }, (err) => {
      console.log(err)
      resolve({
        code: 1000,
        msg: 'http request error'
      })
    })
  })
}

//登录
api.doLogin = function (params) {
  return request(`${baseurl}/user/login`, 'post', params)
}

//获取平台列表
api.getPlatforms = function (params) {
  return request(`${baseurl}/platform/list`, 'get', params)
}

//替换平台信息
api.replacePlatform = function (action, params) {
  let requestUrl = `${baseurl}/platform/add`
  if (action === 'edit') {
    requestUrl = `${baseurl}/platform/edit`
  }
  return request(requestUrl, 'post', params)
}

//获取地址列表
api.getAddress = function (params) {
  return request(`${baseurl}/address/list`, 'get', params)
}

//替换地址信息
api.replaceAddress = function (action, params) {
  let requestUrl = `${baseurl}/address/add`
  if (action === 'edit') {
    requestUrl = `${baseurl}/address/edit`
  }
  return request(requestUrl, 'post', params)
}

//获取分组列表
api.getGroup = function (params) {
  return request(`${baseurl}/group/list`, 'get', params)
}

//替换地址信息
api.replaceGroup = function (action, params) {
  let requestUrl = `${baseurl}/group/add`
  if (action === 'edit') {
    requestUrl = `${baseurl}/group/edit`
  }
  return request(requestUrl, 'post', params)
}

//获取全部分组列表
api.getAllGroup = function () {
  return request(`${baseurl}/group/all`, 'get', {})
}

//获取成员列表
api.getMember = function (params) {
  return request(`${baseurl}/member/list`, 'get', params)
}

//替换成员信息
api.replaceMember = function (action, params) {
  let requestUrl = `${baseurl}/member/add`
  if (action === 'edit') {
    requestUrl = `${baseurl}/member/edit`
  }
  return request(requestUrl, 'post', params)
}

//修改密码
api.editPassword = function (params) {
  return request(`${baseurl}/user/pass`, 'post', params)
}

api.getAllPlatform = function () {
  return request(`${baseurl}/zone/platform`, 'get')
}

api.getAllAddress = function () {
  return request(`${baseurl}/zone/address`, 'get')
}

//获取区服列表
api.getZone = function (params) {
  return request(`${baseurl}/zone/list`, 'get', params)
}

//替换区服信息
api.replaceZone = function (action, params) {
  let requestUrl = `${baseurl}/zone/add`
  if (action === 'edit') {
    requestUrl = `${baseurl}/zone/edit`
  }
  if (action === 'batch') {
    requestUrl = `${baseurl}/zone/batch`
  }
  return request(requestUrl, 'post', params)
}

//获取指定平台的区服列表
api.getPlatformZones = function (params) {
  return request(`${baseurl}/zone/getListByPlatform`, 'get', params)
}

api.replaceZoneAddress = function (params) {
  let requestUrl = `${baseurl}/zone/batchAddress`
  return request(requestUrl, 'post', params)
}

api.getUniqueZones = function () {
  return request(`${baseurl}/zone/uniqueList`, 'get')
}

api.doMerge = function (params) {
  return request(`${baseurl}/zone/merge`, 'post', params)
}

export default api
