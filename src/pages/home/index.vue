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
          <div class="amount">120,000</div>
          <div class="status-text">运行</div>
        </div>

        <div class="status-item">
          <div class="icon"><img src="./images/tingji@2x.png" /></div>
          <div class="amount">1,000</div>
          <div class="status-text">停机</div>
        </div>

        <div class="status-item">
          <div class="icon"><img src="./images/lixian@2x.png" /></div>
          <div class="amount">10,000</div>
          <div class="status-text">离线</div>
        </div>

        <div class="status-item">
          <div class="icon"><img src="./images/guzhang@2x.png" /></div>
          <div class="amount">10,000</div>
          <div class="status-text">故障</div>
        </div>
      </div>

      <div class="overview-list">
        <div class="overview-list__header">
          <div class="overview-list__header-text">概况预览</div>
        </div>
        <div class="overview-list__body">
          <HomeOverviewListCard
            v-for="i in 8"
            :index="i"
            :key="i"
          ></HomeOverviewListCard>
        </div>
        <div class="overview-list__footer">
          <span>查看更多</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.home {
  text-align: center;

  .home-body {
    max-width: 1200px;
    margin: auto;
    margin-bottom: 200px;

    .overview-list {
      margin-top: 100px;
      background: rgba(0, 0, 0, 0.5);

      .overview-list__footer {
        height: 60px;
        background: url('./images/3kuangxiabu@2x.png');
        background-size: cover;
        color: #3ce4ed;
        line-height: 60px;
        font-size: 12px;
        font-family: Source Han Sans CN;
      }

      .overview-list__body {
        border-left: 1px solid rgba(54, 138, 255, 0.3);
        border-right: 1px solid rgba(54, 138, 255, 0.3);
        display: flex;
        flex-flow: wrap;
        padding: 0px 10px;
        box-sizing: border-box;
      }

      .overview-list__header {
        height: 92px;
        background: url('./images/1kaungshangbu@2x.png');
        background-size: cover;
      }

      .overview-list__header-text {
        height: 40px;
        position: relative;
        bottom: -39px;
        color: #3ce4ed;
        background: linear-gradient(
          90deg,
          transparent 0%,
          #080b10 25%,
          rgba(60, 228, 237, 0.1) 50%,
          #080b10 75%,
          transparent 100%
        );
        max-width: 728px;
        margin: auto;
        line-height: 40px;
        font-size: 18px;
        font-family: Source Han Sans CN;
        font-weight: 400;
      }
    }

    .device-status-summary {
      display: flex;
      max-width: 1200px;
      margin: auto;

      .status-item {
        flex: 1;
        text-align: center;

        .icon img {
          width: 80px;
          height: 80px;
        }

        .amount {
          padding-top: 30px;
          font-size: 36px;
          font-family: Arial;
          font-weight: 400;
          color: #e0e1e3;
          line-height: 1;
        }

        .status-text {
          font-size: 24px;
          font-family: Source Han Sans CN;
          font-weight: 400;
          color: #a0a3a8;
          padding-top: 22px;
          line-height: 1;
        }
      }
    }
  }

  .home-banner {
    img.scroll-bottom-btn {
      height: 20px;
      width: 32px;
      position: relative;
      top: -240px;
      cursor: pointer;
    }

    img {
      width: 100%;
      position: relative;
    }
  }
}
</style>
<script>
import HomeOverviewListCard from './components/HomeOverviewListCard'
export default {
  name: 'Home',
  components: {
    HomeOverviewListCard
  },
  methods: {}
}
</script>
