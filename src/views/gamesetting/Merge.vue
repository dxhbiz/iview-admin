<template>
  <Form ref="formModel" :model="formModel" :rules="formRule" :label-width="80" class="merge-form">
    <Form-item :label="$t('targetZone')" prop="target">
      <Select v-model="formModel.target" :placeholder="$t('plzSelect')" filterable @on-change="changeTarget">
        <Option v-for="item in zoneLists" :value="item.value" :key="item.value" >{{ item.label }}</Option>
      </Select>
    </Form-item>
    <Form-item :label="$t('zoneList')" prop="zones">
      <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
        <Checkbox :value="formModel.checkAll" @click.prevent.native="checkAll">{{$t('checkAll')}}</Checkbox>
      </div>
      <Checkbox-group v-model="formModel.zones" @on-change="checkAllChange">
        <Checkbox v-for="item in zoneCheckLists" :label="item.value" :key="item.value">{{item.label}}</Checkbox>
      </Checkbox-group>
    </Form-item>
    <Form-item>
      <Button type="primary"  @click="commit('formModel')">{{$t('commit')}}</Button>
    </Form-item>
  </Form>
</template>

<script>
  import api from '../../api/index'

  export default {
    data () {
      let that = this
      const zonesValidatorCheck = function (rule, value, callback) {
        if (value.length <= 0) {
          callback(that.$t('plzSelectZoneName'))
          return
        }
        callback()
      }
      return {
        zoneLists: [],
        zoneCheckLists: [],
        formModel: {
          checkAll: false,
          target: '',
          zones: []
        },
        formRule: {
          target: [
            {required: true, message: this.$t('plzSelectTargetZone'), trigger: 'change'}
          ],
          zones: [
            {required: true, validator: zonesValidatorCheck, trigger: 'change'}
          ]
        }
      }
    },
    async created() {
      let rst = await api.getUniqueZones()
      if (rst.code === 0) {
        this.zoneLists = rst.data.zones
        this.zoneCheckLists = rst.data.zones
      }
    },
    methods: {
      changeTarget(value) {
        let arr = []
        this.zoneLists.forEach(item => {
          if (item.value !== value) {
            arr.push(item)
          }
        })
        this.zoneCheckLists = arr
        this.formModel.checkAll = false
        this.formModel.zones = []
      },
      checkAll () {
        this.formModel.checkAll = !this.formModel.checkAll
        this.formModel.zones = []
        if (this.formModel.checkAll) {
          this.zoneCheckLists.forEach(p => {
            this.formModel.zones.push(p.value)
          })
        }
      },
      checkAllChange(data) {
        if (data.length === this.zoneCheckLists.length) {
          this.formModel.checkAll = true
        } else {
          this.formModel.checkAll = false
        }
      },
      checkValidate (name) {
        return new Promise((resolve, reject) => {
          this.$refs[name].validate((valid) => {
            resolve(valid)
          })
        })
      },
      async commit(name) {
        let valid = await this.checkValidate(name)
        if (!valid) {
          this.$Message.error(this.$t('errForm'))
          return
        }
        let params = {
          target: this.formModel.target,
          zones: this.formModel.zones
        }
        let rst = await api.doMerge(params)
        if (rst.code === 0) {
          this.$Message.success(this.$t('mergeSuccess'))
        }
      }
    }
  }
</script>

<style scoped>
  .merge-form {
    width: 400px;
  }
</style>
