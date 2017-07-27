<template>
  <div>
    <Row>
      <Col span="24" class="toolbar">
      <Form inline :model="formModel" :label-width="60">
        <Form-item prop="gname" :label="$t('groupName')">
          <Input v-model="formModel.gname" :placeholder="$t('groupName')"></Input>
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
        <Form-item :label="$t('groupName')" prop="gname">
          <Input v-model="modalModel.gname" :placeholder="$t('groupName')"></Input>
        </Form-item>
        <Form-item :label="$t('remark')" prop="remark">
          <Input v-model="modalModel.remark" :placeholder="$t('remark')"></Input>
        </Form-item>
        <Form-item :label="$t('menuList')" prop="permissions">
          <div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
            <Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">{{$t('checkAll')}}</Checkbox>
          </div>
          <Checkbox-group v-model="modalModel.permissions">
            <div style="border-bottom: 1px solid #e9e9e9; padding-bottom: 6px; margin-bottom: 6px;"  v-for="(item, index) in $router.options.routes" v-if="!item.hidden">
              <div v-if="!item.leaf"><Checkbox :label="item.pid" @click.prevent.native="checkChange(item.pid)">{{item.name}}</Checkbox></div>
              <div>
                <Checkbox v-for="(child, idx) in item.children" :key="child.pid" :label="child.pid" @click.prevent.native="checkChange(child.pid)">{{child.name}}</Checkbox>
              </div>
            </div>
          </Checkbox-group>
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
  import CheckboxGroup from '../../../node_modules/iview/src/components/checkbox/checkbox-group'
  import Checkbox from '../../../node_modules/iview/src/components/checkbox/checkbox'

  export default {
    components: {
      Checkbox,
      CheckboxGroup},
    data() {
      let pageSizeOpts = [10, 20, 30]
      return {
        pageSizeOpts: pageSizeOpts,
        pageSize: pageSizeOpts[0],
        total: 0,
        page: 1,
        formModel: {
          gname: ''
        },
        formRule: {},
        modalShow: false,
        modalTitle: '',
        modalModel: {
          id: 0,
          gname: '',
          remark: '',
          permissions: []
        },
        checkAll: false,
        modalRule: {
          gname: [
            {required: true, message: this.$t('plzInputGroupName'), trigger: 'blur'}
          ],
          remark: [
            {required: true, message: this.$t('plzInputRemark'), trigger: 'blur'}
          ]
        },
        modalAction: '',
        columns: [
          {
            title: this.$t('number'),
            key: 'gid'
          },
          {
            title: this.$t('groupName'),
            key: 'gname'
          },
          {
            title: this.$t('remark'),
            key: 'remark'
          },
          {
            title: this.$t('operator'),
            key: 'status',
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
    methods: {
      async doGetPlatforms () {
        let params = {
          page: this.page,
          pname: this.formModel.pname,
          size: this.pageSize
        }
        var rst = await api.getGroup(params)
        if (rst.code !== 0) {
          return
        }
        this.total = rst.data.total
        this.datas = rst.data.group
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
        this.modalModel.gid = this.datas[index].gid
        this.modalModel.gname = this.datas[index].gname
        this.modalModel.remark = this.datas[index].remark
        this.modalModel.permissions = this.datas[index].permissions
        this.modalShow = true
      },
      copy (index) {
        this.modalAction = 'add'
        this.modalTitle = this.$t('add')
        this.modalModel.gid = this.datas[index].gid
        this.modalModel.gname = this.datas[index].gname
        this.modalModel.remark = this.datas[index].remark
        this.modalModel.permissions = this.datas[index].permissions
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
        var rst = await api.replaceGroup(this.modalAction, this.modalModel)
        if (rst.code === 0) {
          await this.doGetPlatforms()
          this.modalShow = false
        }
      },
      handleCheckAll () {
        this.checkAll = !this.checkAll
        let routes = this.$router.options.routes
        this.modalModel.permissions = []
        if (!this.checkAll) {
          return
        }
        for (let k in routes) {
          let item = routes[k]
          if (item.hidden) {
            continue
          }
          if (item.children.length > 0) {
            this.modalModel.permissions.push(item.pid)
          }
          for (let i in item.children) {
            let child = item.children[i]
            if (!child.hidden) {
              this.modalModel.permissions.push(child.pid)
            }
          }
        }
      },
      checkChange (pid) {
        let checkAll = true
        let isAdd = false
        if (this.modalModel.permissions.indexOf(pid) < 0) {
          isAdd = true
        }
        let routes = this.$router.options.routes
        for (let k in routes) {
          let item = routes[k]
          if (item.hidden) {
            continue
          }
          let itemAll = false
          if (item.pid === pid) {
            itemAll = true
            if (this.modalModel.permissions.indexOf(item.pid) < 0) {
              this.modalModel.permissions.push(item.pid)
            }
            if (!isAdd) {
              let index = this.modalModel.permissions.indexOf(item.pid)
              this.modalModel.permissions.splice(index, 1)
            }
          }
          let parent = false
          for (let i in item.children) {
            let child = item.children[i]
            if (child.hidden) {
              continue
            }
            let childCheck = false
            if (itemAll) {
              childCheck = true
            }
            if (child.pid === pid) {
              childCheck = true
            }
            if (childCheck) {
              if (this.modalModel.permissions.indexOf(child.pid) < 0) {
                this.modalModel.permissions.push(child.pid)
              }
              if (!isAdd) {
                let index = this.modalModel.permissions.indexOf(child.pid)
                this.modalModel.permissions.splice(index, 1)
              }
            }
            if (this.modalModel.permissions.indexOf(child.pid) >= 0) {
              parent = true
            } else {
              checkAll = false
            }
          }
          if (parent) {
            if (this.modalModel.permissions.indexOf(item.pid) < 0) {
              this.modalModel.permissions.push(item.pid)
            }
          } else {
            if (this.modalModel.permissions.indexOf(item.pid) >= 0) {
              let index = this.modalModel.permissions.indexOf(item.pid)
              this.modalModel.permissions.splice(index, 1)
            }
          }

          if (this.modalModel.permissions.indexOf(item.pid) < 0) {
            checkAll = false
          }
        }
        this.checkAll = checkAll
      }
    }
  }
</script>
