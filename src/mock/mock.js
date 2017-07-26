import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Platforms, Address } from './data/user'
// let _Users = Users
let _Platforms = Platforms
let _Address = Address

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

    mock.onGet('/address/list').reply(config => {
      let {page, aname, size} = config.params;
      let mockAddress = _Address.filter(address => {
        if (aname && address.aname.indexOf(aname) < 0) return false;
        return true
      })
      let total = mockAddress.length;
      mockAddress = mockAddress.filter((u, index) => {
        return index < size * page && index >= size * (page - 1)
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            data: {
              total: total,
              address: mockAddress
            }
          }]);
        }, 1000);
      });
    })

    mock.onPost('/address/add').reply(config => {
      let { aname, atype, resurl, releaseurl, logurl, apiurl, mresurl, mreleaseurl } = JSON.parse(config.data)
      _Address.unshift({
        aid: new Date().getTime(),
        aname: aname,
        atype: atype,
        resurl: resurl,
        releaseurl: releaseurl,
        logurl: logurl,
        apiurl: apiurl,
        mresurl: mresurl,
        mreleaseurl: mreleaseurl
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

    mock.onPost('/address/edit').reply(config => {
      let { aid, aname, atype, resurl, releaseurl, logurl, apiurl, mresurl, mreleaseurl } = JSON.parse(config.data)
      _Address.some(p => {
        if (p.aid === aid) {
          p.aname = aname
          p.atype = atype
          p.resurl = resurl
          p.releaseurl = releaseurl
          p.logurl = logurl
          p.apiurl = apiurl
          p.mresurl = mresurl
          p.mreleaseurl = mreleaseurl
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
