import axios from 'axios'
import MockAdapter from 'axios-mock-adapter'
import { Platforms, Address, Group, Member, Zone } from './data/user'
// let _Users = Users
let _Platforms = Platforms
let _Address = Address
let _Group = Group
let _Member = Member
let _Zone = Zone

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

    mock.onGet('/group/list').reply(config => {
      let {page, aname, size} = config.params;
      let mockGroup = _Group.filter(address => {
        if (aname && address.aname.indexOf(aname) < 0) return false;
        return true
      })
      let total = mockGroup.length;
      mockGroup = mockGroup.filter((u, index) => {
        return index < size * page && index >= size * (page - 1)
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            data: {
              total: total,
              group: mockGroup
            }
          }]);
        }, 1000);
      });
    })

    mock.onGet('/group/all').reply(config => {
      let groups = []
      _Group.forEach((group) => {
        groups.push({
          gid: group.gid,
          gname: group.gname
        })
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            data: {
              group: groups
            }
          }]);
        }, 1000);
      });
    })

    mock.onPost('/group/add').reply(config => {
      let { gname, remark, permissions } = JSON.parse(config.data)
      _Group.unshift({
        gid: new Date().getTime(),
        gname: gname,
        remark: remark,
        permissions: permissions
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

    mock.onPost('/group/edit').reply(config => {
      let { gid, gname, remark, permissions } = JSON.parse(config.data)
      _Group.some(p => {
        if (p.gid === gid) {
          p.gname = gname
          p.remark = remark
          p.permissions = permissions
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

    mock.onGet('/member/list').reply(config => {
      let {page, username, size} = config.params;
      let mockMember = _Member.filter(address => {
        if (username && address.username.indexOf(username) < 0) return false;
        return true
      })
      let total = mockMember.length;
      mockMember = mockMember.filter((u, index) => {
        return index < size * page && index >= size * (page - 1)
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            data: {
              total: total,
              member: mockMember
            }
          }]);
        }, 1000);
      });
    })

    mock.onPost('/member/add').reply(config => {
      let { username, password, gid, remark } = JSON.parse(config.data)
      _Member.unshift({
        mid: parseInt(new Date().getTime() / 1000),
        username: username,
        password: password,
        gid: gid,
        remark: remark
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

    mock.onPost('/member/edit').reply(config => {
      let { mid, username, password, gid, remark } = JSON.parse(config.data)
      _Member.some(p => {
        if (p.mid === mid) {
          p.username = username
          p.password = password
          p.gid = gid
          p.remark = remark
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

    mock.onPost('/user/pass').reply(config => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success'
          }])
        }, 500)
      })
    })

    mock.onGet('/zone/platform').reply(config => {
      let datas = []
      _Platforms.forEach(p => {
        datas.push({
          value: p.pname,
          label: p.desc
        })
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            datas: datas
          }])
        }, 500)
      })
    })

    mock.onGet('/zone/address').reply(config => {
      let datas = []
      _Address.forEach(p => {
        datas.push({
          value: p.aid,
          label: p.aname
        })
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            datas: datas
          }])
        }, 500)
      })
    })

    mock.onGet('/zone/list').reply(config => {
      let {page, size} = config.params;
      let mockZone = _Zone.filter(address => {
        return true
      })
      let total = mockZone.length;
      mockZone = mockZone.filter((u, index) => {
        return index < size * page && index >= size * (page - 1)
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            data: {
              total: total,
              zone: mockZone
            }
          }]);
        }, 1000);
      });
    })

    mock.onPost('/zone/add').reply(config => {
      let params = JSON.parse(config.data);
      let start = 0
      let showtime = 0
      if (params.start) {
        start = parseInt(new Date(params.start).getTime() / 1000)
      }
      if (params.showtime) {
        showtime = parseInt(new Date(params.showtime).getTime() / 1000)
      }
      _Zone.unshift({
        gid: parseInt(new Date().getTime() / 1000),
        deleted: params.deleted,
        gtype: params.gtype,
        pname: params.pname,
        aid: params.aid,
        status: params.status,
        start: start,
        showtime: showtime,
        pid: params.pid,
        oid: params.zid,
        zid: params.zid,
        zname: params.zname,
        pkey: params.pkey,
        gkey: params.gkey,
        ckey: params.ckey,
        chargeurl: params.chargeurl,
        loginip: params.loginip,
        loginport: params.loginport,
        mloginip: params.mloginip,
        mloginport: params.mloginport
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success'
          }]);
        }, 1000);
      });
    })

    mock.onPost('/zone/edit').reply(config => {
      let params = JSON.parse(config.data);
      let start = 0
      let showtime = 0
      if (params.start) {
        start = parseInt(new Date(params.start).getTime() / 1000)
      }
      if (params.showtime) {
        showtime = parseInt(new Date(params.showtime).getTime() / 1000)
      }
      _Zone.some(p => {
        if (p.gid === params.gid) {
          p.deleted = params.deleted
          p.gtype = params.gtype
          p.pname = params.pname
          p.aid = params.aid
          p.status = params.status
          p.start = start
          p.showtime = showtime
          p.pid = params.pid
          p.oid = params.zid
          p.zid = params.zid
          p.zname = params.zname
          p.pkey = params.pkey
          p.gkey = params.gkey
          p.ckey = params.ckey
          p.chargeurl = params.chargeurl
          p.loginip = params.loginip
          p.loginport = params.loginport
          p.mloginip = params.mloginip
          p.mloginport = params.mloginport
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success'
          }]);
        }, 1000);
      });
    })

    mock.onPost('/zone/batch').reply(config => {
      let params = JSON.parse(config.data);
      if (params.pnames.length <= 0) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 100,
              msg: 'success'
            }]);
          }, 1000);
        });
      }
      let start = 0
      let showtime = 0
      if (params.start) {
        start = parseInt(new Date(params.start).getTime() / 1000)
      }
      if (params.showtime) {
        showtime = parseInt(new Date(params.showtime).getTime() / 1000)
      }
      let curIdx = parseInt(new Date().getTime() / 1000)
      for (let k in params.pnames) {
        let pname = params.pnames[k]
        _Zone.unshift({
          gid: curIdx,
          deleted: params.deleted,
          gtype: params.gtype,
          pname: pname,
          aid: params.aid,
          status: params.status,
          start: start,
          showtime: showtime,
          pid: params.pid,
          oid: params.zid,
          zid: params.zid,
          zname: params.zname,
          pkey: params.pkey,
          gkey: params.gkey,
          ckey: params.ckey,
          chargeurl: params.chargeurl,
          loginip: params.loginip,
          loginport: params.loginport,
          mloginip: params.mloginip,
          mloginport: params.mloginport
        })
        curIdx++
      }
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success'
          }]);
        }, 1000);
      });
    })

    mock.onGet('/zone/getListByPlatform').reply(config => {
      let params = config.params
      let zones = []
      _Zone.forEach(p => {
        if (p.pname === params.pname) {
          zones.push({
            value: p.gid,
            label: p.zname
          })
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            data: {
              zones: zones
            }
          }]);
        }, 1000);
      });
    })

    mock.onPost('/zone/batchAddress').reply(config => {
      let params = JSON.parse(config.data);
      if (params.zones.length <= 0) {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve([200, {
              code: 100,
              msg: 'success'
            }]);
          }, 1000);
        });
      }
      _Zone.some(p => {
        if (params.zones.indexOf(p.gid) >= 0) {
          p.aid = params.aid
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success'
          }]);
        }, 1000);
      });
    })

    mock.onGet('/zone/uniqueList').reply(config => {
      let datas = []
      let zones = []
      _Zone.forEach(p => {
        if (p.oid === p.zid && zones.indexOf(p.zid) < 0) {
          zones.push(p.zid)
          datas.push({
            value: p.zid,
            label: p.zname
          })
        }
      })
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success',
            data: {
              zones: datas
            }
          }]);
        }, 1000);
      });
    })

    mock.onPost('/zone/merge').reply(config => {
      let params = JSON.parse(config.data);

      _Zone.some(p => {
        if (params.zones.indexOf(p.zid) >= 0) {
          p.zid = params.target
        }
      })

      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve([200, {
            code: 0,
            msg: 'success'
          }]);
        }, 1000);
      });
    })
  }
}
