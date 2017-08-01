<template>
  <Tabs :animated="false" v-model="tabs" @on-click="tabsClick">
    <Tab-pane :label="$t('zoneList')">
        <Row>
          <Col span="24" class="toolbar">
          <Form inline :model="formModel" :label-width="60">
            <Form-item :label="$t('platformName')" prop="pname">
              <Select v-model="formModel.pname" :placeholder="$t('plzSelect')" style="width: 162px;">
                <Option v-for="item in platformLists" :value="item.value" :key="item.item" >{{ item.label }}</Option>
              </Select>
            </Form-item>
            <Form-item :label="$t('platformZoneId')" prop="pid">
              <Input v-model="formModel.pid" :placeholder="$t('platformZoneId')"></Input>
            </Form-item>
            <Form-item :label="$t('gameZoneId')" prop="zid">
              <Input v-model="formModel.zid" :placeholder="$t('gameZoneId')"></Input>
            </Form-item>
            <Form-item :label="$t('zoneName')" prop="zname">
              <Input v-model="formModel.zname" :placeholder="$t('zoneName')"></Input>
            </Form-item>
            <Form-item style="margin-left: -60px;">
              <Button type="primary" @click="getPlatforms">{{$t('search')}}</Button>
            </Form-item>
          </Form>
          </Col>
        </Row>
        <Table border :columns="columns" :data="datas"></Table>
        <Page style="margin: 10px 0; float: right;" :total="total" :page-size-opts="pageSizeOpts" :page-size="pageSize" @on-change="changePage"
              @on-page-size-change="changePageSize" show-sizer></Page>
    </Tab-pane>
    <Tab-pane :label="tabsTwo">
        <Form ref="modalModel" :model="modalModel" :rules="modalRule" :label-width="100">
          <Form-item :label="$t('isOpen')" prop="deleted">
            <Select v-model="modalModel.deleted" :placeholder="$t('plzSelect')" style="width: 187px;">
              <Option v-for="item in openLists" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('zoneType')" prop="gtype">
            <Select v-model="modalModel.gtype" :placeholder="$t('plzSelect')" style="width: 187px;">
              <Option v-for="item in serverLists" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('platformName')" prop="pname">
            <Select v-model="modalModel.pname" :placeholder="$t('plzSelect')" style="width: 187px;">
              <Option v-for="item in platformLists" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('addressName')" prop="aid">
            <Select v-model="modalModel.aid" :placeholder="$t('plzSelect')" style="width: 187px;">
              <Option v-for="item in addressLists" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('zoneStatus')" prop="status">
            <Select v-model="modalModel.status" :placeholder="$t('plzSelect')" style="width: 187px;">
              <Option v-for="item in statusLists" :value="item.value" :key="item.value" >{{ item.label }}</Option>
            </Select>
          </Form-item>
          <Form-item :label="$t('startTime')" prop="start">
            <Date-picker type="datetime" v-model="modalModel.start" :placeholder="$t('startTime')"></Date-picker>
          </Form-item>
          <Form-item :label="$t('showTime')" prop="showtime">
            <Date-picker type="datetime" v-model="modalModel.showtime" :placeholder="$t('showTime')"></Date-picker>
          </Form-item>
          <Form-item :label="$t('platformZoneId')" prop="pid">
            <Input v-model="modalModel.pid" :placeholder="$t('platformZoneId')"></Input>
          </Form-item>
          <Form-item :label="$t('gameZoneId')" prop="zid">
            <Input v-model="modalModel.zid" :placeholder="$t('gameZoneId')"></Input>
          </Form-item>
          <Form-item :label="$t('zoneName')" prop="zname">
            <Input v-model="modalModel.zname" :placeholder="$t('zoneName')"></Input>
          </Form-item>
          <Form-item :label="$t('platformKey')" prop="pkey">
            <Input v-model="modalModel.pkey" :placeholder="$t('platformKey')"></Input>
          </Form-item>
          <Form-item :label="$t('gameKey')" prop="gkey">
            <Input v-model="modalModel.gkey" :placeholder="$t('gameKey')"></Input>
          </Form-item>
          <Form-item :label="$t('rechargeKey')" prop="ckey">
            <Input v-model="modalModel.ckey" :placeholder="$t('rechargeKey')"></Input>
          </Form-item>
          <Form-item :label="$t('GMAddress')" prop="chargeurl">
            <Input v-model="modalModel.chargeurl" :placeholder="$t('GMAddress')"></Input>
          </Form-item>
          <Form-item :label="$t('serverHost')" prop="loginip">
            <Input v-model="modalModel.loginip" :placeholder="$t('serverHost')"></Input>
          </Form-item>
          <Form-item :label="$t('serverPort')" prop="loginport">
            <Input v-model="modalModel.loginport" :placeholder="$t('serverPort')"></Input>
          </Form-item>
          <Form-item :label="$t('mServerHost')" prop="mloginip">
            <Input v-model="modalModel.mloginip" :placeholder="$t('mServerHost')"></Input>
          </Form-item>
          <Form-item :label="$t('mServerPort')" prop="mloginport">
            <Input v-model="modalModel.mloginport" :placeholder="$t('mServerPort')"></Input>
          </Form-item>
          <Form-item>
            <Button type="primary" @click="doModal('modalModel')">{{tabsTwo}}</Button>
          </Form-item>
        </Form>
    </Tab-pane>
    <Tab-pane label="标签三">标签三的内容</Tab-pane>
  </Tabs>

</template>

<script>
  import expandZone from './expand-zone.vue'
  import api from '../../api/index'
  import utils from '../../utils/index'

  export default {
    components: {expandZone},
    data() {
      let pageSizeOpts = [10, 20, 30]
      return {
        openLists: [
          {
            value: 1,
            label: this.$t('open')
          },
          {
            value: 2,
            label: this.$t('close')
          }
        ],
        serverLists: [
          {
            value: 1,
            label: this.$t('proServer')
          },
          {
            value: 2,
            label: this.$t('testServer')
          }
        ],
        platformLists: [],
        addressLists: [],
        statusLists: [
          {
            value: 1,
            label: this.$t('newServer')
          },
          {
            value: 2,
            label: this.$t('fullServer')
          }
        ],
        tabs: 0,
        tabsTwo: this.$t('addZone'),
        pageSizeOpts: pageSizeOpts,
        pageSize: pageSizeOpts[0],
        total: 0,
        page: 1,
        formModel: {
          pname: '',
          pid: '',
          zid: '',
          zname: ''
        },
        formRule: {},
        modalShow: false,
        modalTitle: '',
        modalModel: {
          gid: 0,
          deleted: 1,
          gtype: 1,
          pname: '',
          aid: '',
          status: 1,
          start: '',
          showtime: '',
          pid: '',
          zid: '',
          zname: '',
          pkey: '',
          gkey: '',
          ckey: '',
          chargeurl: '',
          loginip: '',
          loginport: '',
          mloginip: '',
          mloginport: ''
        },
        modalRule: {
          deleted: [
            {type: 'number', required: true, message: this.$t('plzSelectIsOpen'), trigger: 'change'}
          ],
          gtype: [
            {type: 'number', required: true, message: this.$t('plzSelectZoneType'), trigger: 'change'}
          ],
          pname: [
            {required: true, message: this.$t('plzSelectPlatformName'), trigger: 'change'}
          ],
          aid: [
            {type: 'number', required: true, message: this.$t('plzSelectAddressName'), trigger: 'change'}
          ],
          status: [
            {type: 'number', required: true, message: this.$t('plzSelectZoneStatus'), trigger: 'change'}
          ],
          pid: [
            {required: true, message: this.$t('plzInputPlatformZoneId'), trigger: 'blur'}
          ],
          zid: [
            {required: true, message: this.$t('plzInputGameZoneId'), trigger: 'blur'}
          ],
          zname: [
            {required: true, message: this.$t('plzInputZoneName'), trigger: 'blur'}
          ],
          ckey: [
            {required: true, message: this.$t('plzInputRechargeKey'), trigger: 'blur'}
          ],
          chargeurl: [
            {required: true, message: this.$t('plzInputGMAdress'), trigger: 'blur'}
          ],
          loginip: [
            {required: true, message: this.$t('plzInputServerHost'), trigger: 'blur'}
          ],
          loginport: [
            {required: true, message: this.$t('plzInputServerPort'), trigger: 'blur'}
          ]
        },
        modalAction: 'add',
        columns: [
          {
            type: 'expand',
            width: 50,
            render: (h, params) => {
              let status = params.row.status
              let statusStr = ''
              for (let k in this.statusLists) {
                let item = this.statusLists[k]
                if (item.value === status) {
                  statusStr = item.label
                }
              }
              let aid = params.row.aid
              let addressName = ''
              for (let k in this.addressLists) {
                let item = this.addressLists[k]
                if (item.value === aid) {
                  addressName = item.label
                }
              }
              let row = Object.assign(params.row, {
                statusStr: statusStr,
                addressName: addressName
              })
              return h(expandZone, {
                props: {
                  row: row
                }
              })
            }
          },
          {
            title: this.$t('number'),
            key: 'gid'
          },
          {
            title: this.$t('zoneType'),
            render: (h, params) => {
              let gtype = params.row.gtype
              let gstr = '';
              for (let k in this.serverLists) {
                let item = this.serverLists[k]
                if (item.value === gtype) {
                  gstr = item.label
                }
              }
              return h('span', gstr)
            }
          },
          {
            title: this.$t('platformName'),
            render: (h, params) => {
              let pname = params.row.pname
              let renderStr = ''
              for (let k in this.platformLists) {
                let item = this.platformLists[k]
                if (item.value === pname) {
                  renderStr = item.label
                }
              }
              return h('span', renderStr)
            }
          },
          {
            title: this.$t('platformZoneId'),
            key: 'pid'
          },
          {
            title: this.$t('gameZoneId'),
            key: 'zid'
          },
          {
            title: this.$t('startTime'),
            render: (h, params) => {
              let start = params.row.start
              let renderStr = utils.date.format(new Date(start * 1000), 'yyyy-MM-dd hh:mm:ss')
              return h('span', renderStr)
            }
          },
          {
            title: this.$t('showTime'),
            render: (h, params) => {
              let showtime = params.row.showtime
              let renderStr = utils.date.format(new Date(showtime * 1000), 'yyyy-MM-dd hh:mm:ss')
              return h('span', renderStr)
            }
          },
          {
            title: this.$t('zoneName'),
            key: 'zname'
          },
          {
            title: this.$t('isOpen'),
            render: (h, params) => {
              let deleted = params.row.deleted
              let renderStr = ''
              for (let k in this.openLists) {
                let item = this.openLists[k]
                if (item.value === deleted) {
                  renderStr = item.label
                }
              }
              return h('span', renderStr)
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
                      this.copy(params.row)
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
                      this.edit(params.row)
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
      let rst = await api.getAllPlatform()
      if (rst.code === 0) {
        this.platformLists = rst.datas
      }
      rst = await api.getAllAddress()
      if (rst.code === 0) {
        this.addressLists = rst.datas
      }
    },
    methods: {
      tabsClick (name) {
        if (name === 1) {
          this.modalAction = 'add'
          this.$refs['modalModel'].resetFields()
        } else {
          this.tabsTwo = this.$t('addZone')
        }
      },
      async doGetZone () {
        let params = {
          page: this.page,
          size: this.pageSize,
          pname: this.formModel.pname,
          pid: this.formModel.pid,
          zid: this.formModel.zid,
          zname: this.formModel.zname
        }
        var rst = await api.getZone(params)
        if (rst.code !== 0) {
          return
        }
        this.total = rst.data.total
        this.datas = rst.data.zone
      },
      getPlatforms () {
        this.doGetZone()
      },
      changePage (page) {
        this.page = page
        this.doGetZone()
      },
      changePageSize (size) {
        this.pageSize = size
        this.doGetZone()
      },
      edit (row) {
        this.modalAction = 'edit'
        this.tabsTwo = this.$t('editZone')
        this.modalModel.gid = row.gid
        this.modalModel.deleted = row.deleted
        this.modalModel.gtype = row.gtype
        this.modalModel.pname = row.pname
        this.modalModel.aid = row.aid
        this.modalModel.status = row.status
        this.modalModel.start = row.start
        this.modalModel.showtime = row.showtime
        this.modalModel.pid = row.pid
        this.modalModel.zid = row.zid
        this.modalModel.zname = row.zname
        this.modalModel.pkey = row.pkey
        this.modalModel.gkey = row.gkey
        this.modalModel.ckey = row.ckey
        this.modalModel.chargeurl = row.chargeurl
        this.modalModel.loginip = row.loginip
        this.modalModel.loginport = row.loginport
        this.modalModel.mloginip = row.mloginip
        this.modalModel.mloginport = row.mloginport
        this.tabs = 1
      },
      copy (index) {
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
        var rst = await api.replaceZone(this.modalAction, this.modalModel)
        if (rst.code === 0) {
          this.doGetZone()
          this.tabs = 0
        }
      }
    }
  }
</script>
