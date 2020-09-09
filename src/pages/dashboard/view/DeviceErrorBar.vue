<template>
  <div class="block device-error-bar">
    <div class="block-header">
      <div class="block-header__title">今日设备故障统计</div>
    </div>
    <div class="block-body chart-body">
      <div class="block-body__inner chart-mount" ref="chart"></div>
    </div>
    <div class="block-footer absolute-footer"></div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
import echart from 'echarts'

export default {
  name: 'DeviceErrorBar',
  props: {
    id: [Number, String]
  },
  data() {
    return {
      chartData: undefined,
      chart: undefined
    }
  },
  apollo: {
    chartData: {
      query: gql`
        query($id: Int!) {
          chartData: dashboardDeviceErrors(id: $id) {
            category
            data
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
  mounted() {
    this.chart = echart.init(this.$refs.chart)
  },
  watch: {
    chartData(val) {
      if (val) {
        var option = {
          tooltip: this.assembleTooltip(),
          title: this.assembleTitle(),
          xAxis: this.assembleXAxis(val.category),
          grid: this.assembleGrid(),
          yAxis: this.assembleYAsix(),
          series: this.assembleSeries(val.data)
        }
        this.chart.clear()
        this.chart.setOption(option)
      }
    }
  },
  methods: {
    assembleTooltip() {
      return {
        formatter: function(params) {
          if (params.seriesIndex === 0) {
            return `
            <div style="text-align:left;padding:8px 16px">
          <div>${params.name}</div>
          <div>
          <span style="display:inline-block;width:12px;height:12px;background:#3BE3ED;border-radius:50%;margin-right:4px"></span>
          <span>${params.value}次</span>
          </div>
            </div>
          `
          }
        }
      }
    },
    assembleGrid() {
      return {
        left: 25,
        right: 20,
        bottom: 61,
        top: 40
      }
    },
    assembleTitle() {
      return {
        text: '故障发生次数',
        textStyle: {
          color: '#A0A3A8',
          fontSize: 12
        },
        left: 25,
        top: 16
      }
    },
    assembleXAxis(data) {
      return {
        data,
        type: 'category',
        axisLabel: {
          color: '#fff',
          fontSize: 12,
          rotate: 45
        },
        axisLine: {
          lineStyle: {
            color: '#3BE3ED'
          }
        }
      }
    },
    assembleYAsix() {
      return {
        type: 'value',
        axisLabel: {
          color: '#A0A3A8',
          inside: true,
          verticalAlign: 'top',
          padding: [8, 0, 8, 0]
        },
        axisLine: {
          show: false
        },
        splitLine: {
          show: true,
          lineStyle: {
            color: 'rgb(59, 227, 237, 0.1)'
          }
        },
        axisTick: {
          show: false
        }
      }
    },
    assembleSeries(data) {
      var border = data.map(() => 1)

      return [
        {
          data,
          stack: 'one',
          type: 'bar',
          itemStyle: {
            color: new echart.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 1,
                color: 'transparent'
              },
              {
                offset: 0,
                color: 'rgb(59, 227, 237, 0.4)'
              }
            ])
          },
          backgroundStyle: {
            color: '#111925'
          },
          barMaxWidth: 24,
          showBackground: true,
          emphasis: {
            itemStyle: {
              color: '3BE3ED'
            }
          }
        },
        {
          data: border,
          stack: 'one',
          type: 'bar',
          itemStyle: {
            color: '#3BE3ED'
          }
        }
      ]
    }
  }
}
</script>
<style lang="scss">
.dashboard-view .device-error-bar {
  position: relative;

  .chart-mount {
    height: 450px;
  }

  .absolute-footer {
    position: absolute;
    width: 100%;
    bottom: 0;
  }

  .chart-body {
    border: none;
    position: relative;

    &:before,
    &::after {
      content: '';
      position: absolute;
      background: rgba(54, 138, 255, 0.3);
      width: 1px;
      height: 390px;
      top: 0;
    }

    &:before {
      left: 0;
    }

    &:after {
      right: 0;
    }
  }
}
</style>
