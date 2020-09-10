<template>
  <div class="overview block">
    <div class="block-header">
      <div class="block-header__title">总览</div>
    </div>
    <div class="block-body">
      <div class="block-body__inner icon-flex">
        <div class="flex-item">
          <img class="icon" src="~@/pages/dashboard/images/yunxing@2x.png" />
          <div class="numerical">{{ running }}</div>
          <div class="label">运行</div>
        </div>

        <div class="flex-item">
          <img class="icon" src="~@/pages/dashboard/images/tingji@2x.png" />
          <div class="numerical">{{ stopped }}</div>
          <div class="label">停机</div>
        </div>

        <div class="flex-item">
          <img class="icon" src="~@/pages/dashboard/images/lixian@2x.png" />
          <div class="numerical">{{ offline }}</div>
          <div class="label">离线</div>
        </div>

        <div class="flex-item">
          <img class="icon" src="~@/pages/dashboard/images/guzhang@2x.png" />
          <div class="numerical">{{ error }}</div>
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
          <div class="numerical">{{ (yieldRatio * 100).toFixed(2) }}%</div>
          <div class="label">总良率</div>
        </div>
        <div class="flex-item">
          <img
            class="icon"
            src="~@/pages/dashboard/images/pingjunjiadonglv@2x.png"
          />
          <div class="numerical">{{ (activation * 100).toFixed(2) }}%</div>
          <div class="label">平均稼动率</div>
        </div>
      </div>
    </div>
    <div class="block-footer"></div>
  </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
  name: 'Overview',
  props: {
    id: [Number, String]
  },
  data() {
    return {
      total: 0,
      yieldRatio: 0,
      activation: 0,
      running: 0,
      stopped: 0,
      offline: 0,
      error: 0,
      statusFresher: undefined,
      statusLock: false,
      summaryFresher: undefined,
      summaryLock: false
    }
  },
  created() {
    this.startStatus()
    this.startSummary()
  },
  beforeDestroy() {
    clearInterval(this.statusFresher)
    clearInterval(this.summaryFresher)
  },
  methods: {
    startStatus() {
      console.log('startStatus')
      this.statusFresher = setInterval(() => {
        if (this.statusLock) return
        this.statusLock = true
        this.$apollo
          .query({
            query: gql`
              query($id: Int!) {
                response: dashboardDeviceStatus(id: $id) {
                  stopped
                  running
                  offline
                  error
                }
              }
            `,
            fetchPolicy: 'network-only',
            variables: {
              id: this.id
            }
          })
          .then(({ data: { response } }) => {
            this.running = response.running
            this.stopped = response.stopped
            this.offline = response.offline
            this.error = response.error
            this.statusLock = false
          })
          .catch((e) => {
            console.log(e)
            this.statusLock = false
          })
      }, 1000)
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
          console.loe(e)
          this.summaryLock = false
        })
    }
  }
}
</script>
