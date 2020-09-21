<template>
  <div class="dashboard">
    <div class="page-header">
      <img class="logo" src="@/pages/monitor/images/logo@2x.png" />
      <img class="yetou" src="@/pages/monitor/images/yetou@2x.png" />
      <div class="time">{{ time }}</div>
      <div
        class="return-btn"
        @click="$router.push({ name: 'DashboardView', params: { id } })"
      >
        返回网页模式
      </div>
    </div>

    <div class="body">
      <div class="left">
        <div class="left-block-header">
          <div class="block-header__content">当班设备状态监控</div>
        </div>
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
            @message-propt="handleMessage"
            :key="'device_' + d.id"
            :device="d"
          ></DeviceCard>
        </div>
        <div class="left-block-footer"></div>
      </div>
      <div class="right">
        <div class="overview">
          <div class="overview-header">
            <div class="block-header__content">总览</div>
          </div>
          <div class="overview-body">
            <div class="block-body__inner icon-flex">
              <div class="flex-item">
                <img
                  class="icon"
                  src="~@/pages/dashboard/images/yunxing@2x.png"
                />
                <div class="numerical">{{ status.running }}</div>
                <div class="label">运行</div>
              </div>

              <div class="flex-item">
                <img
                  class="icon"
                  src="~@/pages/dashboard/images/tingji@2x.png"
                />
                <div class="numerical">{{ status.stopped }}</div>
                <div class="label">停机</div>
              </div>

              <div class="flex-item">
                <img
                  class="icon"
                  src="~@/pages/dashboard/images/lixian@2x.png"
                />
                <div class="numerical">{{ status.offline }}</div>
                <div class="label">离线</div>
              </div>

              <div class="flex-item">
                <img
                  class="icon"
                  src="~@/pages/dashboard/images/guzhang@2x.png"
                />
                <div class="numerical">{{ status.error }}</div>
                <div class="label">故障</div>
              </div>

              <div class="flex-item">
                <img
                  class="icon"
                  src="~@/pages/dashboard/images/zongchanliang@2x.png"
                />
                <div class="numerical">{{ total }}</div>
                <div class="label">总产量</div>
              </div>
              <div class="flex-item">
                <img
                  class="icon"
                  src="~@/pages/dashboard/images/zonglianglv@2x.png"
                />
                <div class="numerical">
                  {{ (yieldRatio * 100).toFixed(2) }}%
                </div>
                <div class="label">总良率</div>
              </div>
              <div class="flex-item">
                <img
                  class="icon"
                  src="~@/pages/dashboard/images/pingjunjiadonglv@2x.png"
                />
                <div class="numerical">
                  {{ (activation * 100).toFixed(2) }}%
                </div>
                <div class="label">平均稼动率</div>
              </div>
            </div>
          </div>
          <div class="overview-footer"></div>
        </div>
        <div class="errors">
          <div class="errors-header">
            <div class="block-header__content">故障报警</div>
          </div>
          <div class="errors-body">
            <div class="block-body__inner">
              <div
                class="message-item"
                v-for="(i, m) in messages"
                :key="'message' + i"
              >
                <div class="device-number">
                  <span class="item-dot"></span>{{ m.number }}
                </div>
                <div class="messages">{{ m.message }}</div>
              </div>
            </div>
          </div>
          <div class="errors-footer"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import DeviceCard from '../view/DeviceCard'
export default {
  name: 'DashboardBoard',
  props: {
    id: [Number, String]
  },
  components: { DeviceCard },
  data() {
    var t = new Date()
    return {
      time: t.toLocaleString(),
      devices: [],
      status: {
        running: 0,
        stopped: 0,
        offline: 0,
        error: 0
      },
      messages: [],
      total: 0,
      yieldRatio: 0,
      activation: 0,
      summaryFresher: undefined
    }
  },
  apollo: {
    status: {
      query: gql`
        query($id: Int!) {
          status: dashboardDeviceStatus(id: $id) {
            stopped
            running
            offline
            error
          }
        }
      `,
      fetchPolicy: 'network-only',
      variables() {
        return {
          id: this.id
        }
      }
    },
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
            deviceType
            errors
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
  created() {
    setInterval(() => {
      var t = new Date()
      this.time = t.toLocaleString()
    }, 1000)
    this.startSummary()
  },
  beforeDestroy() {
    clearInterval(this.summaryFresher)
  },
  methods: {
    handleMessage({ messages, number }) {
      this.messages.unshift({ messages, number })
    },
    handleStatusChange({ old, n }) {
      this.status[old]--
      this.status[n]++
    },
    startSummary() {
      this.fetchSummary()
      this.summaryFresher = setInterval(() => {
        this.fetchSummary()
      }, 5 * 60 * 1000) // 5分钟刷新
    },
    fetchSummary() {
      if (this.summaryLock) return
      this.summaryLock = true
      this.$apollo
        .query({
          query: gql`
            query($id: Int!) {
              response: dashboardOverviewAnalyze(id: $id) {
                total
                ng
                activation
              }
            }
          `,
          fetchPolicy: 'network-only',
          variables: {
            id: this.id
          }
        })
        .then(({ data: { response } }) => {
          this.total = response.total
          if (this.total > 0) {
            this.yieldRatio = (this.total - response.ng) / this.total
          }
          this.activation = response.activation
          this.summaryLock = false
        })
        .catch((e) => {
          console.log(e)
          this.summaryLock = false
        })
    }
  }
}
</script>
<style lang="scss">
.dashboard {
  height: 100%;
  overflow: hidden;
  background: #080b10;

  .body {
    display: flex;
    height: calc(100% - 100px);
    padding: 0 20px;
    padding-bottom: 60px;
    color: #fff;

    .right {
      padding: 0 20px;
      flex: auto;

      .errors {
        .errors-body .block-body__inner {
          height: 424px;
          padding: 0 24px;
          padding-top: 40px;
          overflow: hidden;
        }

        .errors-footer {
          background: url('./images/overview-footer.png');
          background-size: cover;
          height: 65px;
        }

        .errors-header {
          background: url('./images/overview-header.png');
          background-size: cover;
          height: 50px;
        }

        .message-item {
          margin-bottom: 24px;
          font-size: 14px;
          color: #a0a3a8;
        }

        .device-number {
          font-weight: bold;
          color: #fff;
          font-size: 16px;
          padding-bottom: 8px;

          span {
            width: 8px;
            height: 8px;
            background: #fff;
            display: inline-block;
            vertical-align: middle;
            margin-right: 8px;
            border-radius: 50%;
          }
        }
      }

      .overview {
        height: 351px;
        margin-bottom: 31px;
        text-align: center;

        .overview-body .block-body__inner {
          height: 235px;
        }

        .overview-footer {
          background: url('./images/overview-footer.png');
          background-size: cover;
          height: 65px;
        }

        .overview-header {
          background: url('./images/overview-header.png');
          background-size: cover;
          height: 50px;
        }

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
      }

      .errors {
        height: 531px;
      }
    }

    .block-body__inner {
      border-right: 1px solid rgba(53, 138, 255, 0.3);
      border-left: 1px solid rgba(53, 138, 255, 0.3);
    }

    .left {
      height: 100%;
      min-width: 1200px;
      max-width: 1200px;
      padding: 0 20px;

      .realtime-device-card-flex {
        width: 100%;
        padding-right: 0;
        height: 850px;
        display: flex;
        flex-wrap: wrap;
        padding: 12px;
        margin-bottom: -40px;
        margin-right: -12px;

        .dashboard-view-device-card {
          height: 382px;
          .card-body {
            height: 284px;
          }

          .device-info {
            height: 80px;
          }
        }
      }

      .left-block-footer {
        background: url('~@/pages/dashboard/board/images/block-footer-bg.png');
        background-size: contain;
        height: 62px;
      }

      .left-block-header {
        background: url('~@/pages/dashboard/board/images/block-header-bg.png');
        background-size: contain;
        height: 51px;
      }
    }
    .block-header__content {
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

  .page-header {
    padding-top: 8px;
    text-align: center;
    height: 100px;

    .return-btn {
      color: #358aff;
      font-size: 12px;
      position: absolute;
      top: 28px;
      right: 300px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover {
        color: #fff;
      }
    }

    .time {
      color: #396fb9;
      font-size: 12px;
      position: relative;
      max-width: 1652px;
      margin: auto;
      text-align: left;
      top: -80px;
      padding-left: 100px;
    }

    .logo {
      width: 176px;
      height: 48px;
      position: relative;
      z-index: 100;
    }

    .yetou {
      max-width: 1652px;
      display: block;
      height: 48px;
      margin: auto;
      position: relative;
      top: -30px;
      width: 90%;
    }
  }
}
</style>
