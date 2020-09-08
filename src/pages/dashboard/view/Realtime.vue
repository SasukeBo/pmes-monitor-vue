<template>
  <div class="realtime block">
    <div class="block-header">
      <div class="block-header__title">设备状态实时监控</div>
    </div>
    <div class="block-body">
      <div class="block-body__inner realtime-device-card-flex">
        <DeviceCard
          v-for="d in devices"
          :key="'device_' + d.id"
          :device="d"
        ></DeviceCard>
      </div>
    </div>
    <div class="block-footer"></div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import DeviceCard from './DeviceCard'
export default {
  name: 'Realtime',
  props: {
    id: [String, Number]
  },
  components: {
    DeviceCard
  },
  data() {
    return {
      devices: []
    }
  },
  apollo: {
    devices: {
      query: gql`
        query($id: Int!) {
          devices: dashboardDevices(id: $id) {
            id
            number
            status
            total
            ng
            durations
            errors
          }
        }
      `,
      variables() {
        return {
          id: this.id
        }
      }
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
