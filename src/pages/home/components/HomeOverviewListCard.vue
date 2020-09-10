<template>
  <div class="home-overview-list-card">
    <div class="cover">
      <div class="search-icon">
        <img src="../images/pi-sousuo@2x.png" />
      </div>
      <div class="label">查看详情</div>
    </div>

    <div class="card-content">
      <div class="card-header">{{ device.deviceType }}</div>
      <div class="status-icon">
        <img
          src="../images/pi-lixian@2x.png"
          v-if="device.status === 'offline'"
        />
        <img
          src="../images/pi-tingji@2x.png"
          v-if="device.status === 'stopped'"
        />
        <img
          src="../images/pi-yunxing@2x.png"
          v-if="device.status === 'running'"
        />
        <img
          src="../images/pi-guzhang@2x.png"
          v-if="device.status === 'error'"
        />
      </div>
      <div class="device-statistics">
        <div class="device-statistics__item">
          <span>产量</span>
          <span>{{ device.total }}</span>
        </div>
        <div class="device-statistics__item">
          <span>稼动率</span>
          <span>{{ activation }}</span>
        </div>
        <div class="device-statistics__item">
          <span>良率</span>
          <span>{{ yieldRatio }}</span>
        </div>
      </div>

      <div class="device-infomation">
        <div>{{ device.number }}</div>
        <div>{{ device.address }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'HomeOverviewListCard',
  props: {
    device: Object
  },
  computed: {
    activation() {
      if (this.device && this.device.durations) {
        var d = this.device.durations
        var total = d[0] + d[1] + d[2]
        if (total > 0) {
          return ((d[1] * 100) / total).toFixed(2) + '%'
        }
      }
      return '0%'
    },
    yieldRatio() {
      if (this.device && this.device.total > 0) {
        var d = this.device
        return (((d.total - d.ng) * 100) / d.total).toFixed(2) + '%'
      }
      return '0%'
    }
  }
}
</script>
<style lang="scss">
.home-overview-list-card {
  margin: 24px 12px 0 12px;
  min-width: 270px;
  background: #121a26;

  &:hover {
    .cover {
      display: block;
    }

    .card-content {
      display: none;
    }
  }

  .cover {
    display: none;
    height: 212px;
    cursor: pointer;
    border: 1px solid rgba(60, 198, 158, 0.98);

    .search-icon {
      padding-top: 55px;
      img {
        width: 52px;
      }
    }

    .label {
      color: #3ce4ed;
      font-size: 18px;
      padding-top: 16px;
    }
  }

  .card-content {
    display: block;
    color: #a0a4a8;
    font-size: 12px;

    .device-infomation {
      padding: 16px 0;
    }

    .device-statistics {
      display: flex;

      .device-statistics__item {
        flex: 1;

        span {
          display: block;
        }
      }
    }

    .status-icon {
      padding-bottom: 16px;
      padding-top: 18px;
      align-items: center;
      display: flex;

      img {
        height: 30px;
        width: 30px;
        margin: auto;
      }
    }

    .card-header {
      height: 48px;
      line-height: 48px;
      background: rgba(60, 227, 237, 0.3);
      color: #3ce4ed;
      font-size: 14px;
      font-weight: 500;
    }
  }
}
</style>
