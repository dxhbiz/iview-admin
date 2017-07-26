import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Platforms } from './data/user'
// let _Users = Users
let _Platforms = Platforms

export default {
  /**
   * mock bootstrap
   */
  bootstrap() {
    let mock = new MockAdapter(axios)

    // mock success request
    mock.onGet('/success').reply(200, {
      msg: 'success'
    })

    // mock error request
    mock.onGet('/error').reply(500, {
      msg: 'failure'
    })

    //登录
    mock.onPost('/user/login').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, { code: 0, msg: '请求成功', data: {
            token: 'test',
            isAdmin: true,
            permissions: []
          } }])
        }, 1000)
      })
    })

    //获取平台信息
    mock.onGet('/platform/list').reply(config => {
      let {page, pname, size} = config.params;
      let mockPlatforms = _Platforms.filter(platform => {
        if (pname && platform.pname.indexOf(pname) < 0) return false;
        return true
      })
      let total = mockPlatforms.length;
      mockPlatforms = mockPlatforms.filter((u, index) => {
        return index < size * page && index >= size * (page - 1)
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            data: {
              total: total,
              platforms: mockPlatforms
            }
          }]);
        }, 1000);
      });
    })

    //新增用户
    mock.onPost('/platform/add').reply(config => {
      let { pname, desc, deleted } = JSON.parse(config.data)
      _Platforms.unshift({
        id: new Date().getTime(),
        pname: pname,
        desc: desc,
        deleted: deleted
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success'
          }])
        }, 500)
      })
    })

    //编辑用户
    mock.onPost('/platform/edit').reply(config => {
      let { id, pname, desc, deleted } = JSON.parse(config.data)
      _Platforms.some(p => {
        if (p.id === id) {
          p.pname = pname
          p.desc = desc
          p.deleted = deleted
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success'
          }])
        }, 500)
      })
    })
  }
}
