<template>
  <div class="dashboard-view-device-card">
    <div :class="['header', 'status-' + status]">
      当前状态：{{ statusMap[status] }}
    </div>
    <div class="status-icons">
      <svg
        t="1599447772317"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="2379"
        width="200"
        height="200"
      >
        <path
          d="M923.427 494.115c0 0-425.517-248.001-659.388-384.303-58.407-35.322-149.748-77.699-149.748 71.567 0 191.617 0 508.64 0 674.874 2.115 84.837 64.329 68.545 103.814 48.91 218.391-127.274 705.325-411.050 705.325-411.050z"
          p-id="2380"
          :fill="status === 'running' ? '#3cc69e' : '#8a8a8a'"
        ></path>
      </svg>

      <svg
        t="1599447819503"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3137"
        width="200"
        height="200"
      >
        <path
          d="M77.93008 0m32 0l192 0q32 0 32 32l0 960q0 32-32 32l-192 0q-32 0-32-32l0-960q0-32 32-32Z"
          p-id="3138"
          :fill="status === 'stopped' ? '#ffb864' : '#8a8a8a'"
        ></path>
        <path
          d="M589.93008 0m32 0l192 0q32 0 32 32l0 960q0 32-32 32l-192 0q-32 0-32-32l0-960q0-32 32-32Z"
          p-id="3139"
          :fill="status === 'stopped' ? '#ffb864' : '#8a8a8a'"
        ></path>
      </svg>

      <svg
        t="1599447840548"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="3748"
        width="200"
        height="200"
      >
        <path
          d="M505.6 659.2c-51.2 0-102.4 19.2-134.4 51.2-12.8 12.8-32 12.8-44.8 0-19.2-12.8-12.8-38.4 0-57.6 32-25.6 76.8-44.8 121.6-57.6l57.6 64zM288 448c-44.8 19.2-83.2 44.8-115.2 76.8-12.8 12.8-12.8 38.4 0 51.2 12.8 12.8 38.4 12.8 44.8 0 38.4-32 76.8-57.6 121.6-76.8L288 448zM128 288c-38.4 25.6-83.2 57.6-115.2 96-12.8 12.8-12.8 38.4 0 51.2 12.8 12.8 32 12.8 44.8 0 38.4-38.4 76.8-70.4 121.6-96L128 288z m864 96C864 256 691.2 179.2 505.6 179.2c-76.8 0-147.2 12.8-211.2 32l57.6 57.6c44.8-12.8 96-19.2 153.6-19.2 172.8 0 326.4 70.4 441.6 179.2 12.8 19.2 32 19.2 44.8 0 12.8-6.4 19.2-32 0-44.8z m-486.4 12.8H480l76.8 76.8c83.2 6.4 166.4 44.8 224 102.4 12.8 12.8 32 12.8 44.8 0 19.2-12.8 19.2-38.4 0-51.2-83.2-76.8-198.4-128-320-128z m0 409.6c-38.4 0-70.4 32-70.4 70.4 0 38.4 32 70.4 70.4 70.4s70.4-32 70.4-70.4c0-44.8-32-70.4-70.4-70.4z m192-121.6l-64-64L480 467.2l-64-64L300.8 288l-57.6-57.6-38.4-38.4c-19.2-12.8-38.4-12.8-51.2 0-12.8 12.8-12.8 38.4 0 51.2l19.2 19.2 51.2 51.2 140.8 140.8 25.6 25.6 288 288c12.8 12.8 38.4 12.8 51.2 0 12.8-12.8 12.8-38.4 0-51.2l-32-32z"
          p-id="3749"
          :fill="status === 'offline' ? '#766cc0' : '#8a8a8a'"
        ></path>
      </svg>

      <svg
        t="1599447860851"
        class="icon"
        viewBox="0 0 1024 1024"
        version="1.1"
        xmlns="http://www.w3.org/2000/svg"
        p-id="4548"
        width="200"
        height="200"
      >
        <path
          d="M512 0C229.376 0 0 229.376 0 512s229.376 512 512 512 512-229.376 512-512S794.624 0 512 0z m0 819.2c-29.184 0-52.224-23.552-52.224-52.224 0-29.184 23.552-52.224 52.224-52.224 29.184 0 52.224 23.552 52.224 52.224S541.184 819.2 512 819.2z m56.832-584.192l-10.752 372.736c-0.512 19.456-20.48 34.816-44.032 34.816h-8.192c-23.552 0-43.52-15.36-44.032-34.816L450.56 235.008c-1.024-29.696 23.04-54.784 53.76-54.784h10.752c30.72 0 54.784 25.088 53.76 54.784z"
          p-id="4549"
          :fill="status === 'error' ? '#fb7070' : '#8a8a8a'"
        ></path>
      </svg>
    </div>

    <div v-if="status === 'error'" class="card-body error-body">
      <div class="device-number">{{ device.number }}</div>
      <div
        class="message"
        v-loading="messageLoading"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.8)"
      >
        <div v-for="(m, i) in messages" :key="i">{{ `${i + 1}. ${m}` }}</div>
      </div>
    </div>

    <div class="card-body">
      <div class="status-percent">
        <div class="status-pie" ref="chart"></div>
        <div class="status-text">
          <div style="padding: 12px 0">
            <span style="color: #3CC69E; padding-right: 8px"
              >运行:{{ durationPercent(1) }}</span
            >
            <span style="color: #5A48E0">离线:{{ durationPercent(3) }}</span>
          </div>
          <div>
            <span style="color: #FFB864; padding-right: 8px"
              >停机:{{ durationPercent(0) }}</span
            >
            <span style="color: #FB7070">故障:{{ durationPercent(2) }}</span>
          </div>
        </div>
      </div>

      <div class="device-number">
        <span style="margin-right: 16px">{{ device.number }}</span>
        <span style="font-size: 14px; color: #aaa">{{
          device.deviceType || '1069'
        }}</span>
      </div>
      <div class="device-info">
        <div>产量：{{ total }}</div>
        <div>良率：{{ yieldRatio }}</div>
        <div>时间稼动率：{{ activation }}</div>
        <div>运行时长：{{ runningDuration }}</div>
      </div>

      <div class="link">
        查看更多 》
      </div>
    </div>
  </div>
</template>
<script>
import echarts from 'echarts'
import gql from 'graphql-tag'
export default {
  name: 'DeviceCard',
  props: {
    device: Object
  },
  data() {
    return {
      messages: [],
      total: 0,
      ng: 0,
      durations: [0, 0, 0, 0],
      statusMap: {
        running: '运行中',
        stopped: '停机',
        offline: '离线',
        error: '故障'
      },
      options: ['stopped', 'running', 'error', 'offline'],
      pid: 0,
      sid: 0,
      status: '',
      chart: undefined,
      runningDuration: '',
      yieldRatio: '',
      activation: '',
      totalDuration: 0,
      messageLoading: false
    }
  },
  mounted() {
    this.chart = echarts.init(this.$refs.chart)
    this.renderChart()
  },
  created() {
    var d = this.device
    this.status = d.status
    this.messages = d.errors
    this.total = d.total
    this.ng = d.ng
    this.durations = d.durations
    this.calculateDurations()

    this.$ws.subscribe(this.device.id, (data) => {
      var n = this.options[data.Status]
      if (this.status != n) {
        this.$emit('status-change', { old: this.status, n })
        this.status = n
      }
      this.total = data.Total
      this.ng = data.Ng
      this.durations[data.Status]++
      this.calculateDurations()
      if (this.chart) this.renderChart()
      if (this.status === 'error') this.handleError(data.ErrorIndex)
    })
  },
  watch: {
    status() {
      if (this.chart) this.renderChart()
    }
  },
  beforeDestroy() {
    this.$ws.unsubscribe(this.device.id)
  },
  methods: {
    handleError(idxs) {
      this.messageLoading = true
      this.$apollo
        .query({
          query: gql`
            query($deviceID: Int!, $errorIdxs: [Int!]!) {
              response: deviceErrors(id: $deviceID, idxs: $errorIdxs)
            }
          `,
          variables: {
            deviceID: this.device.id,
            errorIdxs: idxs || []
          }
        })
        .then(({ data: { response } }) => {
          this.messages = response
          this.messageLoading = false
          this.$emit('message-propt', {
            id: this.device.id,
            messages: response,
            number: this.device.number
          })
        })
        .catch((e) => {
          console.log(e)
          this.messageLoading = false
        })
    },
    calculateDurations() {
      this.runningDuration = (this.durations[1] / (60 * 60)).toFixed(1) + '小时'
      if (this.total > 0) {
        this.yieldRatio =
          (((this.total - this.ng) * 100) / this.total).toFixed(2) + '%'
      } else {
        this.yieldRatio = '0%'
      }
      var power = this.durations[0] + this.durations[1] + this.durations[2]
      if (power > 0) {
        this.activation = ((this.durations[1] * 100) / power).toFixed(2) + '%'
      } else {
        this.activation = '0%'
      }
      this.totalDuration = power + this.durations[3]
    },
    durationPercent(i) {
      if (this.totalDuration > 0) {
        return ((this.durations[i] * 100) / this.totalDuration).toFixed(1) + '%'
      }
      return '0%'
    },
    renderChart() {
      var option = {
        color: this.assembleColor(),
        series: this.assembleSeries(this.durations)
      }
      this.chart.setOption(option)
    },
    assembleColor() {
      // 停机 运行 故障 离线
      return ['#ffb864', '#3cc69e', '#fb7070', '#766cc0']
    },
    assembleSeries(durations) {
      return [
        {
          name: '状态时间比',
          type: 'pie',
          radius: ['50%', '70%'],
          hoverAnimation: false,
          label: {
            show: false
          },
          labelLine: {
            show: false
          },
          data: durations
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.dashboard-view-device-card {
  max-width: 270px;
  min-width: 270px;
  flex: auto;
  margin-right: auto;
  background: #121a26;
  margin-bottom: 28px;
  text-align: left;
  position: relative;

  .card-body {
    padding: 18px 24px;

    .status-percent {
      display: flex;
      padding-bottom: 23px;

      .status-pie {
        width: 70px;
        height: 70px;
        margin-right: 8px;
      }

      .status-text {
        font-size: 12px;
      }
    }

    .device-number {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 500;
      color: #e0e1e4;
      line-height: 24px;
      margin-bottom: 16px;
      height: 36px;
    }

    .device-info {
      font-size: 12px;
      line-height: 18px;
      color: #a0a4a8;
      height: 100px;
    }

    .link {
      font-size: 16px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #3ce3ed;
      cursor: pointer;
    }
  }

  .error-body {
    color: #fb7070;
    position: absolute;
    width: 100%;
    z-index: 100;
    background: #131b26;
    opacity: 0.9;

    .device-number {
      font-size: 16px;
      color: #fb7070;
      font-weight: 500;
      padding-bottom: 14px;
    }

    .message {
      height: 215px;
      text-overflow: ellipsis;
      overflow: hidden;
      font-size: 12px;
    }
  }

  .status-icons {
    display: flex;
    height: 57px;
    border-bottom: 1px solid #000;

    .icon {
      width: 40px;
      height: 40px;
      margin: auto;
    }
  }

  .header {
    height: 40px;
    line-height: 40px;
    font-size: 16px;
    font-weight: bold;
    color: #fff;
    text-align: center;

    &.status-running {
      background: #3cc69e;
    }
    &.status-stopped {
      background: #ffb864;
    }
    &.status-offline {
      background: #766cc0;
    }
    &.status-error {
      background: #fb7070;
    }
  }
}
</style>
