<template>
  <div class="realtime block">
    <div class="block-header">
      <div class="block-header__title">设备状态实时监控</div>
    </div>
    <div class="block-body">
      <div class="block-body__inner realtime-device-card-flex">
        <DeviceCard
          v-for="i in 8"
          :key="'device_' + i"
          :status="status[i % 4]"
        ></DeviceCard>
      </div>
    </div>
    <div class="block-footer"></div>
  </div>
</template>
<script>
import DeviceCard from './DeviceCard'
export default {
  name: 'Realtime',
  components: {
    DeviceCard
  },
  data() {
    return {
      status: ['running', 'stopped', 'offline', 'error']
    }
  }
}
</script>

<style lang="scss">
.dashboard-view .realtime {
  .realtime-device-card-flex {
    display: flex;
    flex-wrap: wrap;
    padding: 12px;
    margin-bottom: -40px;
  }
}
</style>
