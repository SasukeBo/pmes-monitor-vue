<template>
  <div class="device-view">
    <div class="nav-tabs">
      <div
        :class="['nav-tab', $route.name === 'DeviceOverview' ? 'active' : '']"
        @click="$router.push({ name: 'DeviceOverview', params: { id } })"
      >
        设备概况
      </div>
      <div
        :class="['nav-tab', $route.name === 'DeviceAnalyze' ? 'active' : '']"
        @click="$router.push({ name: 'DeviceAnalyze', params: { id } })"
      >
        数据分析
      </div>
      <div
        :class="['nav-tab', $route.name === 'DeviceErrorlog' ? 'active' : '']"
        @click="$router.push({ name: 'DeviceErrorlog', params: { id } })"
      >
        停机日志
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<script>
export default {
  name: 'DeviceView',
  props: {
    id: [String, Number]
  }
}
</script>
<style lang="scss">
.device-view {
  color: #fff;
  max-width: 1200px;
  margin: auto;
  display: flex;
  margin-top: 62px;

  .nav-tabs {
    width: 150px;
    margin-right: 53px;

    .nav-tab {
      background: url('./images/nav_tab@2x.png');
      background-size: cover;
      height: 40px;
      margin-bottom: 80px;
      line-height: 40px;
      cursor: pointer;
      transition: all 0.3s ease;

      &.active,
      &:hover {
        background: url('./images/nav_tab_active@2x.png');
        background-size: cover;
        color: #3cc69e;
      }
    }
  }
}
</style>
