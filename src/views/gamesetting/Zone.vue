<template>
  <div>
    <Row>
      <Col span="24" class="toolbar">
      <Form inline :model="formModel">
        <Form-item prop="aname">
          <Input v-model="formModel.aname" :placeholder="$t('addressName')"></Input>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="getPlatforms">{{$t('search')}}</Button>
        </Form-item>
        <Form-item>
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
        <Form-item :label="$t('addressName')" prop="aname">
          <Input v-model="modalModel.aname" :placeholder="$t('addressName')"></Input>
        </Form-item>
        <Form-item :label="$t('addressType')" prop="atype">
          <Select v-model="modalModel.atype" :placeholder="$t('plzSelect')">
            <Option v-for="(v, k) in atypes" :value="k" :key="k" >{{ v }}</Option>
          </Select>
        </Form-item>
        <Form-item :label="$t('resurl')" prop="resurl">
          <Input v-model="modalModel.resurl" :placeholder="$t('resurl')"></Input>
        </Form-item>
        <Form-item :label="$t('releaseurl')" prop="releaseurl">
          <Input v-model="modalModel.releaseurl" :placeholder="$t('releaseurl')"></Input>
        </Form-item>
        <Form-item :label="$t('logurl')" prop="logurl">
          <Input v-model="modalModel.logurl" :placeholder="$t('logurl')"></Input>
        </Form-item>
        <Form-item :label="$t('apiurl')" prop="apiurl">
          <Input v-model="modalModel.apiurl" :placeholder="$t('apiurl')"></Input>
        </Form-item>
        <Form-item :label="$t('mresurl')" prop="mresurl">
          <Input v-model="modalModel.mresurl" :placeholder="$t('mresurl')"></Input>
        </Form-item>
        <Form-item :label="$t('mreleaseurl')" prop="mreleaseurl">
          <Input v-model="modalModel.mreleaseurl" :placeholder="$t('mreleaseurl')"></Input>
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
      let pageSizeOpts = [10, 20, 30]
      return {
        atypes: {
          1: this.$t('loginAddress'),
          2: this.$t('gameAddress')
        },
        pageSizeOpts: pageSizeOpts,
        pageSize: pageSizeOpts[0],
        total: 0,
        page: 1,
        formModel: {
          aname: ''
        },
        formRule: {},
        modalShow: false,
        modalTitle: '',
        modalModel: {
          aid: 0,
          aname: '',
          atype: '',
          resurl: '',
          releaseurl: '',
          logurl: '',
          apiurl: '',
          mresurl: '',
          mreleaseurl: ''
        },
        modalRule: {
          aname: [
            {required: true, message: this.$t('plzInputAddressName'), trigger: 'blur'}
          ],
          atype: [
            {required: true, message: this.$t('plzSelectAddressType'), trigger: 'change'}
          ]
        },
        modalAction: '',
        columns: [
          {
            title: this.$t('number'),
            key: 'aid'
          },
          {
            title: this.$t('addressType'),
            key: 'atype',
            render: (h, params) => {
              let atype = parseInt(this.datas[params.index].atype)
              return h('div', this.atypes[atype])
            }
          },
          {
            title: this.$t('addressName'),
            key: 'aname'
          },
          {
            title: this.$t('resurl'),
            key: 'resurl'
          },
          {
            title: this.$t('releaseurl'),
            key: 'releaseurl'
          },
          {
            title: this.$t('mresurl'),
            key: 'mresurl'
          },
          {
            title: this.$t('mreleaseurl'),
            key: 'mreleaseurl'
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
      async doGetAddress () {
        let params = {
          page: this.page,
          aname: this.formModel.aname,
          size: this.pageSize
        }
        var rst = await api.getAddress(params)
        if (rst.code !== 0) {
          return
        }
        this.total = rst.data.total
        this.datas = rst.data.address
      },
      getPlatforms () {
        this.doGetAddress()
      },
      changePage (page) {
        this.page = page
        this.doGetAddress()
      },
      changePageSize (size) {
        this.pageSize = size
        this.doGetAddress()
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
        this.modalModel.aid = this.datas[index].aid
        this.modalModel.aname = this.datas[index].aname
        this.modalModel.atype = this.datas[index].atype + ''
        this.modalModel.resurl = this.datas[index].resurl
        this.modalModel.releaseurl = this.datas[index].releaseurl
        this.modalModel.apiurl = this.datas[index].apiurl
        this.modalModel.logurl = this.datas[index].logurl
        this.modalModel.mresurl = this.datas[index].mresurl
        this.modalModel.mreleaseurl = this.datas[index].mreleaseurl
        this.modalShow = true
      },
      copy (index) {
        this.modalAction = 'add'
        this.modalTitle = this.$t('add')
        this.modalModel.aid = this.datas[index].aid
        this.modalModel.aname = this.datas[index].aname
        this.modalModel.atype = this.datas[index].atype + ''
        this.modalModel.resurl = this.datas[index].resurl
        this.modalModel.releaseurl = this.datas[index].releaseurl
        this.modalModel.apiurl = this.datas[index].apiurl
        this.modalModel.logurl = this.datas[index].logurl
        this.modalModel.mresurl = this.datas[index].mresurl
        this.modalModel.mreleaseurl = this.datas[index].mreleaseurl
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
        var rst = await api.replaceAddress(this.modalAction, this.modalModel)
        if (rst.code === 0) {
          await this.doGetAddress()
          this.modalShow = false
        }
      }
    }
  }
</script>
