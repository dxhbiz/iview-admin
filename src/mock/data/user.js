import Mock from 'mockjs'
const LoginUsers = [
  {
    id: 1,
    username: 'admin',
    password: '123456',
    avatar: 'https://raw.githubusercontent.com/taylorchen709/markdown-images/master/vueadmin/user.png',
    name: '张某某'
  }
]

const Platforms = []
const Users = []
const Address = []
const Group = []
const Member = []
const Zone = []

for (let i = 0; i < 86; i++) {
  Users.push(Mock.mock({
    id: Mock.Random.guid(),
    name: Mock.Random.cname(),
    addr: Mock.mock('@county(true)'),
    'age|18-60': 1,
    birth: Mock.Random.date(),
    sex: Mock.Random.integer(0, 1)
  }))
}

for (let i = 0; i < 120; i++) {
  Platforms.push(Mock.mock({
    id: i,
    pname: Mock.Random.cname(),
    desc: Mock.Random.cname(),
    deleted: 0
  }))
}

for (let i = 0; i < 50; i++) {
  Address.unshift(Mock.mock({
    aid: i + 1,
    aname: Mock.Random.cname(),
    atype: Mock.Random.integer(1, 2),
    resurl: Mock.Random.url(),
    releaseurl: Mock.Random.url(),
    apiurl: Mock.Random.url(),
    logurl: Mock.Random.url(),
    mresurl: Mock.Random.url(),
    mreleaseurl: Mock.Random.url()
  }))
}



export { LoginUsers, Users, Platforms, Address, Group, Member, Zone }
