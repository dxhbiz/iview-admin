<template>
  <Form ref="loginForm" :model="loginModel" :rules="loginRule" class="login-container">
    <Form-item>
      <h3 class="title">{{$t('loginTitle')}}</h3>
    </Form-item>
    <Form-item prop="username">
      <Input type="text" v-model="loginModel.username" :placeholder="$t('username')">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item prop="password">
      <Input type="password" v-model="loginModel.password" :placeholder="$t('password')">
        <Icon type="ios-locked-outline" slot="prepend"></Icon>
      </Input>
    </Form-item>
    <Form-item>
      <Checkbox v-model="isRemeber">{{$t('remPassword')}}</Checkbox>
    </Form-item>
    <!--
    <Form-item inline>
      <Input type="text" placeholder="验证码">
        <Icon type="image" slot="prepend"></Icon>
        <span slot="append"><img src="../../assets/ver.png" style="height: 20px; width: 64px;"/></span>
      </Input>
    </Form-item>
    -->
    <Form-item>
      <Button style="width: 100%;" @click="handleSubmit('loginForm')" type="primary">{{$t('login')}}</Button>
    </Form-item>
  </Form>
</template>

<script>
  import utils from '../../utils/index'
  import md5 from 'js-md5'
  import api from '../../api/index'
  import routes from '../../router/routes'

  export default {
    data () {
      return {
        loginModel: {
          username: 'test',
          password: 'test11'
        },
        isRemeber: true,
        loginRule: {
          username: [
            {required: true, message: this.$t('plzInputUsername'), trigger: 'blur'}
          ],
          password: [
            { required: true, message: this.$t('plzInputPassword'), trigger: 'blur' },
            { type: 'string', min: 6, message: this.$t('lenErrorPassword'), trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      getNextPath (data) {
        let nextPath = ''
        for (let i in routes) {
          let ele = routes[i]
          if (ele.hidden) {
            continue
          }
          if (!data.isAdmin && data.permissions.indexOf(ele.pid) < 0) {
            continue
          }
          let eleChildren = ele.children
          for (let j in eleChildren) {
            let child = eleChildren[j]
            if (child.hidden) {
              continue
            }
            if (!data.isAdmin && data.permissions.indexOf(child.pid) < 0) {
              continue
            }
            nextPath = child.path
            break
          }
          if (nextPath.length > 0) {
            break
          }
        }
        return nextPath
      },
      checkValidate (name) {
        return new Promise((resolve, reject) => {
          this.$refs[name].validate((valid) => {
            resolve(valid)
          })
        })
      },
      async handleSubmit (name) {
        let valid = await this.checkValidate(name)
        if (!valid) {
          this.$Message.error(this.$t('errSubmit'))
          return
        }
        let rst = await api.doLogin({
          username: this.loginModel.username,
          password: md5(this.loginModel.password)
        })
        console.log(rst)
        if (rst.code !== 0) {
          this.$Message.error(this.$t('errLogin'))
          return
        }
        let nextPath = this.getNextPath(rst.data)
        if (nextPath.length === 0) {
          this.$Message.error(this.$t('nonePermission'))
          return
        }
        utils.storage.setLocaleStorage('token', rst.data.token)
        utils.storage.setLocaleStorage('isAdmin', rst.data.isAdmin)
        utils.storage.setLocaleStorage('permissions', rst.data.permissions)
        if (this.isRemeber) {
          utils.storage.setLocaleStorage('username', this.loginModel.username)
          utils.storage.setLocaleStorage('password', this.loginModel.password)
        } else {
          utils.storage.removeLocaleStorage('username')
          utils.storage.removeLocaleStorage('password')
        }
        this.$Message.success(this.$t('succSubmit'))
        this.$router.push({path: nextPath})
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .login-container {
    /*box-shadow: 0 0px 8px 0 rgba(0, 0, 0, 0.06), 0 1px 0px 0 rgba(0, 0, 0, 0.02);*/
    -webkit-border-radius: 5px;
    border-radius: 5px;
    -moz-border-radius: 5px;
    background-clip: padding-box;
    margin: 180px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
    .title {
      text-align: center;
      color: #505458;
    }
    .remember {
      margin: 0px 0px 35px 0px;
    }
  }
</style>
