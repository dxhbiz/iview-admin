<template>
  <Row class="container">
    <Col span="24" class="header">
      <Col span="10" class="logo" :class="collapsed?'logo-collapse-width':'logo-width'">
        {{collapsed?'':sysName}}
      </Col>
      <Col span="10">
        <div class="tools" @click.prevent="collapse">
          <Icon type="android-menu"></Icon>
        </div>
      </Col>
      <Col span="4" class="userinfo">
        <Dropdown>
          <span class="userinfo-inner">{{sysUserName}}</span>
          <Dropdown-menu slot="list">
            <Dropdown-item>我的消息</Dropdown-item>
            <Dropdown-item>设置</Dropdown-item>
            <Dropdown-item divided @click.native="logout">退出登录</Dropdown-item>
          </Dropdown-menu>
        </Dropdown>
      </Col>
    </Col>
    <Col span="24" class="main">
      <aside :class="collapsed?'menu-collapsed':'menu-expanded'">
        <Menu class="el-menu" width="auto" v-show="!collapsed" :open-names="openNames" :active-name="$route.path" accordion @on-select="menuSelect">
          <template v-for="(item,index) in $router.options.routes" v-if="!item.hidden">
            <Submenu :name="item.pid" v-if="!item.leaf">
              <template slot="title"><i :class="item.iconCls"></i>{{item.name}}</template>
              <Menu-item v-for="(child,idx) in item.children" :name="child.path" :key="child.path" v-if="!child.hidden">{{child.name}}</Menu-item>
            </Submenu>
            <Menu-item v-if="item.leaf&&item.children.length>0" :name="item.children[0].path"><i :class="item.iconCls"></i>{{item.children[0].name}}</Menu-item>
          </template>
        </Menu>
        <!--导航菜单-折叠后-->
        <ul class="el-menu ivu-menu ivu-menu-light ivu-menu-vertical collapsed" v-show="collapsed" ref="menuCollapsed">
          <li v-for="(item,index) in $router.options.routes" v-if="!item.hidden" class="ivu-menu-submenu item">
            <template v-if="!item.leaf">
              <div class="ivu-menu-submenu-title" style="padding-left: 20px;" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">{{item.name}}</div>
              <ul class="ivu-menu submenu" :class="'submenu-hook-'+index" @mouseover="showMenu(index,true)" @mouseout="showMenu(index,false)">
                <li v-for="child in item.children" v-if="!child.hidden" :key="child.path" class="ivu-menu-item" style="background-color: #e4e8f1; padding-left: 40px;" :class="$route.path==child.path?'is-active':''" @click="$router.push(child.path)">{{child.name}}</li>
              </ul>
            </template>
            <template v-else>
              <li class="ivu-menu-submenu">
                <div class="ivu-menu-submenu-title el-menu-item" style="padding-left: 20px;height: 56px;line-height: 56px;padding: 0 20px;" :class="$route.path==item.children[0].path?'is-active':''" @click="$router.push(item.children[0].path)">{{item.name}}</div>
              </li>
            </template>
          </li>
        </ul>
      </aside>
      <section class="content-container">
        <div class="grid-content bg-purple-light">
          <Col span="24" class="breadcrumb-container">
            <strong class="title">{{$route.name}}</strong>
            <Breadcrumb separator="/" class="breadcrumb-inner">
              <Breadcrumb-item v-for="item in $route.matched" :key="item.path">
                {{ item.name }}
              </Breadcrumb-item>
            </Breadcrumb>
          </Col>
          <Col span="24" class="content-wrapper">
            <transition name="fade" mode="out-in">
              <router-view></router-view>
            </transition>
          </Col>
        </div>
      </section>
    </Col>
  </Row>
</template>

<script>
  export default {
    data () {
      console.log(this.$t('test'))
      let curPath = this.$router.currentRoute.path
      let routes = this.$router.options.routes
      let openNames = []
      for (let k in routes) {
        let item = routes[k]
        if (item.children && item.children.length > 0) {
          for (let i in item.children) {
            let child = item.children[i]
            if (child.path === curPath) {
              openNames.push(child.ppid)
            }
          }
        }
      }
      return {
        sysName: 'VUEADMIN',
        collapsed: false,
        sysUserName: '管理员',
        sysUserAvatar: '',
        openNames: openNames,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        }
      }
    },
    methods: {
      onSubmit () {
        console.log('submit!')
      },
      handleopen () {
      },
      handleclose () {
      },
      handleselect: function (a, b) {
      },
      logout: function () {
        var _this = this
        this.$confirm('确认退出吗?', '提示', {
        }).then(() => {
          sessionStorage.removeItem('user')
          _this.$router.push('/login')
        }).catch(() => {
        })
      },
      collapse () {
        this.collapsed = !this.collapsed
      },
      showMenu (i, status) {
        this.$refs.menuCollapsed.getElementsByClassName('submenu-hook-' + i)[0].style.display = status ? 'block' : 'none'
      },
      menuSelect (name) {
        console.log(name)
        this.$router.push({ path: name })
      }
    },
    mounted () {
      var user = sessionStorage.getItem('user')
      if (user) {
        user = JSON.parse(user)
        this.sysUserName = user.name || ''
        this.sysUserAvatar = user.avatar || ''
      }
    }
  }
</script>

<style lang="stylus" scoped>
  $color-primary = #20a0ff
  .container {
    position: absolute;
    top: 0px;
    bottom: 0px;
    width: 100%;
    .header {
      height: 60px;
      line-height: 60px;
      background: $color-primary;
      color:#fff;
      .userinfo {
        text-align: right;
        padding-right: 35px;
        float: right;
        .userinfo-inner {
          cursor: pointer;
          color:#fff;
          img {
            width: 40px;
            height: 40px;
            border-radius: 20px;
            margin: 10px 0px 10px 10px;
            float: right;
          }
        }
      }
      .logo {
      //width:230px;
        height:60px;
        font-size: 22px;
        padding-left:20px;
        padding-right:20px;
        border-color: rgba(238,241,146,0.3);
        border-right-width: 1px;
        border-right-style: solid;
        img {
          width: 40px;
          float: left;
          margin: 10px 10px 10px 18px;
        }
        .txt {
          color:#fff;
        }
      }
      .logo-width{
        width:230px;
      }
      .logo-collapse-width{
        width:60px
      }
      .tools{
        padding: 0px 23px;
        width:14px;
        height: 60px;
        line-height: 60px;
        cursor: pointer;
      }
    }
    .main {
      display: flex;
    // background: #324057;
      position: absolute;
      top: 60px;
      bottom: 0px;
      overflow: hidden;
      aside {
        background-color: #eef1f6;
        flex:0 0 230px;
        width: 230px;
      // position: absolute;
      // top: 0px;
      // bottom: 0px;
        .el-menu{
          height: 100%;
        }
        .collapsed{
          width:60px;
          .item{
            position: relative;
          }
          .submenu{
            position:absolute;
            top:0px;
            left:60px;
            z-index:99999;
            height:auto;
            display:none;
          }

        }
      }
      .menu-collapsed{
        flex:0 0 60px;
        width: 60px;
      }
      .menu-expanded{
        flex:0 0 230px;
        width: 230px;
      }
      .content-container {
      // background: #f1f2f7;
        flex:1;
      // position: absolute;
      // right: 0px;
      // top: 0px;
      // bottom: 0px;
      // left: 230px;
        overflow-y: scroll;
        padding: 20px;
        .breadcrumb-container {
        //margin-bottom: 15px;
          .title {
            width: 200px;
            float: left;
            color: #475669;
          }
          .breadcrumb-inner {
            float: right;
          }
        }
        .content-wrapper {
          background-color: #fff;
          box-sizing: border-box;
        }
      }
    }
  }
  .el-submenu__title {
    height: 56px;
    line-height: 56px;
    font-size: 14px;
    color: #48576a;
    padding: 0 20px;
    cursor: pointer;
    position: relative;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
    white-space: nowrap;
  }
  .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 45px;
  }
  .is-active {
    color: #20a0ff;
  }
</style>
