<template>
  <Form ref="formModel" :model="formModel" :rules="formRule" :labelWidth=80 style="margin-top: 20px;">
    <Form-item :label="$t('oldPassword')" prop="oldPassword">
      <Input type="password" style="width: 300px" v-model="formModel.oldPassword" :placeholder="$t('oldPassword')"></Input>
    </Form-item>
    <Form-item :label="$t('newPassword')" prop="password">
      <Input type="password" style="width: 300px" v-model="formModel.password" :placeholder="$t('newPassword')"></Input>
    </Form-item>
    <Form-item :label="$t('confirmPassword')" prop="confirmPassword">
      <Input type="password" style="width: 300px" v-model="formModel.confirmPassword" :placeholder="$t('confirmPassword')"></Input>
    </Form-item>
    <Form-item>
      <Button type="primary" @click="edit('formModel')">{{$t('edit')}}</Button>
    </Form-item>
  </Form>
</template>

<script>
  import api from '../../api/index'

  export default {
    data () {
      let that = this
      const confirmPasswordCheck = function (rule, value, callback) {
        if (value !== that.formModel.password) {
          callback(that.$t('notEqualPassword'))
        } else {
          callback()
        }
      }
      return {
        formModel: {
          oldPassword: '',
          password: '',
          confirmPassword: ''
        },
        formRule: {
          oldPassword: [
            {required: true, message: this.$t('plzInputOldPassword'), trigger: 'blur'},
            { type: 'string', min: 6, message: this.$t('lenErrorPassword'), trigger: 'blur' }
          ],
          password: [
            {required: true, message: this.$t('plzInputNewPassword'), trigger: 'blur'},
            { type: 'string', min: 6, message: this.$t('lenErrorPassword'), trigger: 'blur' }
          ],
          confirmPassword: [
            {required: true, message: this.$t('plzInputConfirmPassword'), trigger: 'blur'},
            {validator: confirmPasswordCheck, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      checkValid (name) {
        return new Promise((resolve, reject) => {
          this.$refs[name].validate((valid) => {
            resolve(valid)
          })
        })
      },
      async edit (name) {
        let valid = await this.checkValid(name)
        if (!valid) {
          this.$Message.error(this.$t('errForm'))
          return
        }
        let rst = await api.editPassword(this.formModel)
        if (rst.code === 0) {
          this.$router.push({path: '/login'})
        }
      }
    }
  }
</script>
