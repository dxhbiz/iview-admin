<template>
  <div>
    <Row>
      <Col span="24" class="toolbar">
      <Form inline :model="formModel">
        <Form-item prop="pname">
          <Input v-model="formModel.pname" :placeholder="$t('platformName')"></Input>
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
        <Form-item :label="$t('platformName')" prop="pname">
          <Input v-model="modalModel.pname" :placeholder="$t('platformName')"></Input>
        </Form-item>
        <Form-item :label="$t('platformDesc')" prop="desc">
          <Input v-model="modalModel.desc" :placeholder="$t('platformDesc')"></Input>
        </Form-item>
        <Form-item :label="$t('status')" prop="deleted">
          <Radio-group v-model="modalModel.deleted">
            <Radio label="0">
              <span>{{$t('noraml')}}</span>
            </Radio>
            <Radio label="1">
              <span>{{$t('close')}}</span>
            </Radio>
          </Radio-group>
        </Form-item>
        <Form-item>
          <Button type="primary" @click="doModal('modalValidate')">{{modalTitle}}</Button>
        </Form-item>
      </Form>
    </Modal>
  </div>
</template>

<script>
  import api from '../../api/index'

  export default {
    data() {
      let pageSizeOpts = [15, 20, 30, 40]
      return {
        pageSizeOpts: pageSizeOpts,
        pageSize: pageSizeOpts[0],
        total: 0,
        page: 1,
        formModel: {
          pname: ''
        },
        formRule: {},
        modalShow: false,
        modalTitle: '',
        modalModel: {
          id: 0,
          pname: '',
          desc: '',
          deleted: 0
        },
        modalRule: {
          platformName: [
            {required: true, message: this.$t('plzInputPlatformName'), trigger: 'blur'}
          ]
        },
        columns: [
          {
            title: this.$t('number'),
            key: 'id'
          },
          {
            title: this.$t('platformName'),
            key: 'pname'
          },
          {
            title: this.$t('platformDesc'),
            key: 'desc'
          },
          {
            title: this.$t('status'),
            key: 'status',
            render: (h, params) => {
              let deleted = this.datas[params.index].deleted
              let status = deleted ? this.$t('close') : this.$t('noraml')
              return h('div', status)
            }
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
        var rst = await api.getPlatforms(params)
        if (rst.code !== 0) {
          return
        }
        this.total = rst.data.total
        this.datas = rst.data.platforms
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
        this.modalTitle = this.$t('add')
        this.modalShow = true
      },
      edit (index) {
        this.modalTitle = this.$t('edit')
        this.modalShow = true
      },
      doModal (name) {
      }
    }
  }
</script>
