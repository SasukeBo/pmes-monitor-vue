<template>
  <div class="home">
    <div class="header">
      <img class="logo" src="./assets/images/logo@2x.png" />
      <img class="yetou" src="./assets/images/yetou@2x.png" />
      <div class="time">{{ time }}</div>
    </div>

    <div class="home-banner">
      <img src="./assets/images/tucen576@2x.png" />
      <img src="./assets/images/pi-genguo@2x.png" class="scroll-bottom-btn" />
    </div>

    <div class="home-body">
      <div class="device-status-summary">
        <div class="status-item">
          <div class="icon"><img src="./assets/images/yunxing@2x.png" /></div>
          <div class="amount">120,000</div>
          <div class="status-text">运行</div>
        </div>

        <div class="status-item">
          <div class="icon"><img src="./assets/images/tingji@2x.png" /></div>
          <div class="amount">1,000</div>
          <div class="status-text">停机</div>
        </div>

        <div class="status-item">
          <div class="icon"><img src="./assets/images/lixian@2x.png" /></div>
          <div class="amount">10,000</div>
          <div class="status-text">离线</div>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.home {
  text-align: center;

  .home-body {
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

  .header {
    padding-top: 8px;

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
    }
  }
}
</style>
<script>
export default {
  name: 'Home',
  data() {
    var t = new Date()
    return {
      time: t.toLocaleString()
    }
  },
  created() {
    setInterval(() => {
      var t = new Date()
      this.time = t.toLocaleString()
    }, 1000)
  },
  methods: {}
}
</script>
