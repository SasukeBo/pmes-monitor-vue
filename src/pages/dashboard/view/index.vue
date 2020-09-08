<template>
  <div class="dashboard-view">
    <Overview></Overview>
    <DeviceErrorBar></DeviceErrorBar>
    <Realtime :id="id"></Realtime>
  </div>
</template>
<script>
import Overview from './Overview'
import DeviceErrorBar from './DeviceErrorBar'
import Realtime from './Realtime'
export default {
  name: 'DashboardView',
  props: {
    id: [String, Number]
  },
  components: {
    Overview,
    Realtime,
    DeviceErrorBar
  }
}
</script>
<style lang="scss">
.dashboard-view {
  max-width: 1200px;
  margin: auto;
  padding-top: 62px;

  .icon-flex {
    display: flex;
    max-width: 890px;
    margin: auto;
    padding-top: 60px;

    .flex-item {
      flex: auto;
    }

    .icon {
      width: 60px;
    }

    .numerical {
      font-size: 24px;
      font-family: Arial;
      font-weight: bold;
      color: #e0e1e4;
      padding-top: 20px;
    }

    .label {
      font-size: 15px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #a0a4a8;
      padding-top: 16px;
    }
  }

  .block {
    margin-bottom: 31px;
  }

  .block-header {
    background: url('~@/assets/images/1kaungshangbu@2x.png');
    background-size: cover;
    height: 50px;
    border-bottom: 1px solid rgba(60, 227, 237, 0.3);

    .block-header__title {
      border-left: 4px solid #3cc69e;
      background: linear-gradient(45deg, rgba(60, 198, 158, 0.3), transparent);
      width: 160px;
      color: #3ce4ed;
      font-size: 18px;
      text-align: left;
      padding-left: 8px;
      position: relative;
      top: 22px;
      left: 22px;
    }
  }

  .block-body {
    border-left: 1px solid rgba(54, 138, 255, 0.3);
    border-right: 1px solid rgba(54, 138, 255, 0.3);
  }

  .block-footer {
    background: url('~@/assets/images/3kuangxiabu@2x.png');
    background-size: cover;
    height: 60px;
  }
}
</style>
