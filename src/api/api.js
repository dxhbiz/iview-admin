/**
 * Created by Administrator on 2017/7/15.
 */

var api = {}

api.doLogin = function (params) {
  return new Promise((resolve, reject) => {
    resolve({
      code: 0,
      msg: '登录成功',
      data: {
        isAdmin: false,
        username: 'admin',
        permissions: [1, 3, 41, 42],
        token: 'test'
      }
    })
  })
}

export default api
