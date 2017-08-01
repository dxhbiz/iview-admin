<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
      <Col span="6">
      <span class="expand-key">{{$t('zoneStatus')}}：</span>
      <span class="expand-value">{{ row.statusStr }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">{{$t('rechargeKey')}}：</span>
      <span class="expand-value">{{ row.ckey }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">{{$t('GMAddress')}}：</span>
      <span class="expand-value">{{ row.chargeurl }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">{{$t('addressName')}}：</span>
      <span class="expand-value">{{ row.addressName }}</span>
      </Col>
    </Row>
    <Row>
      <Col span="6">
      <span class="expand-key">{{$t('serverHost')}}：</span>
      <span class="expand-value">{{ row.loginip }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">{{$t('serverPort')}}：</span>
      <span class="expand-value">{{ row.loginport }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">{{$t('mServerHost')}}：</span>
      <span class="expand-value">{{ row.mloginip }}</span>
      </Col>
      <Col span="6">
      <span class="expand-key">{{$t('mServerPort')}}：</span>
      <span class="expand-value">{{ row.mloginport }}</span>
      </Col>
    </Row>
  </div>
</template>
<script>
  export default {
    props: {
      row: Object
    }
  };
</script>
