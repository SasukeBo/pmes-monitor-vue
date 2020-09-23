<template>
  <div class="home">
    <div class="home-banner">
      <img src="./images/tucen576@2x.png" />
      <img src="./images/pi-genguo@2x.png" class="scroll-bottom-btn" />
    </div>

    <div class="home-body">
      <div class="device-status-summary">
        <div class="status-item">
          <div class="icon"><img src="./images/yunxing@2x.png" /></div>
          <div class="amount">{{ statusCount.running }}</div>
          <div class="status-text">运行</div>
        </div>

        <div class="status-item">
          <div class="icon"><img src="./images/tingji@2x.png" /></div>
          <div class="amount">{{ statusCount.stopped }}</div>
          <div class="status-text">停机</div>
        </div>

        <div class="status-item">
          <div class="icon"><img src="./images/lixian@2x.png" /></div>
          <div class="amount">{{ statusCount.offline }}</div>
          <div class="status-text">离线</div>
        </div>

        <div class="status-item">
          <div class="icon"><img src="./images/guzhang@2x.png" /></div>
          <div class="amount">{{ statusCount.error }}</div>
          <div class="status-text">故障</div>
        </div>
      </div>

      <div class="overview-list">
        <div class="overview-list__header">
          <div class="overview-list__header-text">概况预览</div>
        </div>
        <div class="overview-list__body">
          <HomeOverviewListCard
            v-for="d in devices"
            :key="d.id"
            :device="d"
          ></HomeOverviewListCard>
        </div>
        <div class="overview-list__footer"></div>
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import { GetDeviceIDs } from '@/utils/local_storage.js'
import HomeOverviewListCard from './components/HomeOverviewListCard'
export default {
  name: 'Home',
  components: {
    HomeOverviewListCard
  },
  data() {
    return {
      statusCount: {
        stopped: 0,
        running: 0,
        offline: 0,
        error: 0
      },
      recentView: [],
      devices: []
    }
  },
  apollo: {
    statusCount: {
      query: gql`
        query {
          statusCount: homeDeviceStatusCount {
            stopped
            running
            offline
            error
          }
        }
      `
    },
    devices: {
      query: gql`
        query($ids: [Int!]!, $limit: Int!) {
          devices: homeRecentDevices(ids: $ids, limit: $limit) {
            id
            number
            status
            total
            ng
            durations
            address
            deviceType
          }
        }
      `,
      variables() {
        return {
          ids: this.recentView,
          limit: 8
        }
      }
    }
  },
  created() {
    this.recentView = GetDeviceIDs()
  }
}
</script>
<style lang="scss">
@import './index.scss';
</style>
