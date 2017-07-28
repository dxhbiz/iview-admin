<template>
  <div>
    <Row>
      <Col span="24" class="toolbar">
      <Form inline :model="formModel" :label-width="60">
        <Form-item prop="username" :label="$t('username')">
          <Input v-model="formModel.username" :placeholder="$t('username')"></Input>
        </Form-item>
        <Form-item style="margin-left: -60px;">
          <Button type="primary" @click="getPlatforms">{{$t('search')}}</Button>
        </Form-item>
        <Form-item style="margin-left: -60px;">
          <Button type="primary" @click="add">{{$t('add')}}</Button>
        </Form-item>
      </Form>
      </Col>
    </Row>
    <Table border :columns="columns" :data="datas"></Table>
    <Page style="margin: 10px 0; float: right;" :total="total" :page-size-opts="pageSizeOpts" :page-size="pageSize" @on-change="changePage"
          @on-page-size-change="changePageSize" show-sizer></Page>
    <Modal :title="modalTitle" v-model="modalShow" :closable="false" footerHide>
      <Form ref="modalModel" :model="modalModel" :rules="modalRule" :label-width="80">
        <Form-item :label="$t('username')" prop="username">
          <Input v-model="modalModel.username" :placeholder="$t('username')"></Input>
        </Form-item>
        <Form-item :label="$t('password')" prop="password">
          <Input type="password" v-model="modalModel.password" :placeholder="$t('password')"></Input>
        </Form-item>
        <Form-item :label="$t('confirmPassword')" prop="confirmPassword">
          <Input type="password" v-model="modalModel.confirmPassword" :placeholder="$t('confirmPassword')"></Input>
        </Form-item>
        <Form-item :label="$t('groupName')" prop="gid">
          <Select v-model="modalModel.gid" :placeholder="$t('plzSelect')">
            <Option v-for="(item, idx) in groups" :value="item.gid + ''" :key="idx" >{{ item.gname }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('remark')" prop="remark">
          <Input v-model="modalModel.remark" :placeholder="$t('remark')"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="doModal('modalModel')">{{modalTitle}}</Button>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import api from '../../api/index'

  export default {
    data() {
      let that = this
      let pageSizeOpts = [10, 20, 30]
      const confirmPasswordCheck = function (rule, value, callback) {
        if (value !== that.modalModel.password) {
          callback(that.$t('notEqualPassword'))
        } else {
          callback()
        }
      }
      return {
        groups: [],
        pageSizeOpts: pageSizeOpts,
        pageSize: pageSizeOpts[0],
        total: 0,
        page: 1,
        formModel: {
          username: ''
        },
        formRule: {},
        modalShow: false,
        modalTitle: '',
        modalModel: {
          mid: 0,
          username: '',
          password: '',
          confirmPassword: '',
          gid: '',
          remark: ''
        },
        checkAll: false,
        modalRule: {
          username: [
            {required: true, message: this.$t('plzInputUsername'), trigger: 'blur'}
          ],
          password: [
            { type: 'string', min: 6, message: this.$t('lenErrorPassword'), trigger: 'blur' }
          ],
          confirmPassword: [
            { validator: confirmPasswordCheck, trigger: 'blur' }
          ],
          gid: [
            {required: true, message: this.$t('plzSelectGroupName'), trigger: 'change'}
          ],
          remark: [
            {required: true, message: this.$t('plzInputRemark'), trigger: 'blur'}
          ]
        },
        modalAction: '',
        columns: [
          {
            title: this.$t('number'),
            key: 'mid'
          },
          {
            title: this.$t('username'),
            key: 'username'
          },
          {
            title: this.$t('groupName'),
            render: (h, params) => {
              let gid = params.row.gid
              let gname = ''
              for (let k in this.groups) {
                if (this.groups[k].gid === parseInt(gid)) {
                  gname = this.groups[k].gname
                }
              }
              return h('span', gname)
            }
          },
          {
            title: this.$t('remark'),
            key: 'remark'
          },
          {
            title: this.$t('operator'),
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  style: {
                    marginRight: '5px'
                  },
                  on: {
                    click: () => {
                      this.copy(params.index)
                    }
                  }
                }, this.$t('copy')),
                h('Button', {
                  props: {
                    type: 'primary',
                    size: 'small'
                  },
                  on: {
                    click: () => {
                      this.edit(params.index)
                    }
                  }
                }, this.$t('edit'))
              ]);
            }
          }
        ],
        datas: []
      }
    },
    async created () {
      let rst = await api.getAllGroup()
      if (rst.code === 0) {
        this.groups = rst.data.group
      }
    },
    methods: {
      async doGetPlatforms () {
        let params = {
          page: this.page,
          pname: this.formModel.pname,
          size: this.pageSize
        }
        let rst = await api.getMember(params)
        if (rst.code !== 0) {
          return
        }
        this.total = rst.data.total
        this.datas = rst.data.member
      },
      getPlatforms () {
        this.doGetPlatforms()
      },
      changePage (page) {
        this.page = page
        this.doGetPlatforms()
      },
      changePageSize (size) {
        this.pageSize = size
        this.doGetPlatforms()
      },
      add () {
        this.$refs['modalModel'].resetFields()
        this.modalAction = 'add'
        this.modalTitle = this.$t('add')
        this.modalShow = true
      },
      edit (index) {
        this.modalAction = 'edit'
        this.modalTitle = this.$t('edit')
        this.modalModel.mid = this.datas[index].mid
        this.modalModel.username = this.datas[index].username
        this.modalModel.gid = this.datas[index].gid
        this.modalModel.remark = this.datas[index].remark
        this.modalShow = true
      },
      copy (index) {
        this.modalAction = 'add'
        this.modalTitle = this.$t('add')
        this.modalModel.mid = this.datas[index].mid
        this.modalModel.username = this.datas[index].username
        this.modalModel.gid = this.datas[index].gid
        this.modalModel.remark = this.datas[index].remark
        this.modalShow = true
      },
      checkValidate (name) {
        return new Promise((resolve, reject) => {
          this.$refs[name].validate((valid) => {
            resolve(valid)
          })
        })
      },
      async doModal (name) {
        let valid = await this.checkValidate(name)
        if (!valid) {
          this.$Message.error(this.$t('errForm'))
          return
        }
        var rst = await api.replaceMember(this.modalAction, this.modalModel)
        if (rst.code === 0) {
          await this.doGetPlatforms()
          this.modalShow = false
        }
      }
    }
  }
</script>
