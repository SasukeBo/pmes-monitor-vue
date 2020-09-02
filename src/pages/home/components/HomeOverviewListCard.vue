<template>
  <div class="home-overview-list-card">
    <div class="cover">
      <div class="search-icon">
        <img src="../images/pi-sousuo@2x.png" />
      </div>
      <div class="label">查看详情</div>
    </div>

    <div class="card-content">
      <div class="card-header">1609自动化监测设备</div>
      <div class="status-icon">
        <img src="../images/pi-lixian@2x.png" v-if="index % 4 === 0" />
        <img src="../images/pi-tingji@2x.png" v-if="index % 4 === 1" />
        <img src="../images/pi-yunxing@2x.png" v-if="index % 4 === 2" />
        <img src="../images/pi-guzhang@2x.png" v-if="index % 4 === 3" />
      </div>
      <div class="device-statistics">
        <div class="device-statistics__item">
          <span>OEE</span>
          <span>53.42%</span>
        </div>
        <div class="device-statistics__item">
          <span>稼动率</span>
          <span>20.38%</span>
        </div>
        <div class="device-statistics__item">
          <span>良率</span>
          <span>16.50%</span>
        </div>
      </div>

      <div class="device-infomation">
        <div>ZJ-1609-JCSB-01</div>
        <div>富诚达A1 4楼 普创智控</div>
      </div>
    </div>
  </div>
</template>
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
<script>
export default {
  name: 'HomeOverviewListCard',
  props: {
    index: Number
  }
}
</script>
