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
  export default {
    data () {
      return {
        loginModel: {
          username: 'test',
          password: 'test'
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
      handleSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            this.$Message.success(this.$t('succSubmit'))
          } else {
            this.$Message.error(this.$t('errSubmit'))
          }
        })
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
