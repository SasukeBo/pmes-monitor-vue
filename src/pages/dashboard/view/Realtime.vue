<template>
  <div class="realtime block">
    <div class="block-header">
      <div class="block-header__title">设备状态实时监控</div>
    </div>
    <div class="block-body">
      <div
        class="block-body__inner realtime-device-card-flex"
        v-loading="$apollo.queries.devices.loading"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <DeviceCard
          v-for="d in devices"
          @status-change="handleStatusChange"
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
            lastProduceLogID
            lastStatusLogID
            lastStatusTime
          }
        }
      `,
      fetchPolicy: 'network-only',
      variables() {
        return {
          id: this.id
        }
      }
    }
  },
  methods: {
    handleStatusChange({ old, n }) {
      this.$emit('status-change', { old, n })
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
    margin-right: -12px;
  }
}
</style>
