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

export default api
