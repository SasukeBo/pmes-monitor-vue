<template>
  <div class="device-monitor">
    <div class="header">
      <img class="logo" src="./images/logo@2x.png" />
      <img class="yetou" src="./images/yetou@2x.png" />
      <div class="time">{{ time }}</div>
    </div>

    <div class="page-link">
      <div
        :class="['page-link__btn', $route.name === 'Home' ? 'active' : '']"
        @click.prevent="$router.push({ name: 'Home' })"
      >
        <a href="/monitor/home">
          <img src="./images/pi-shouye@2x.png" class="icon" />
          首页</a
        >
      </div>

      <div
        :class="['page-link__btn', $route.name === 'Device' ? 'active' : '']"
        @click.prevent="$router.push({ name: 'Device' })"
      >
        <a href="/monitor/devices">
          <img src="./images/pi-shouye@2x.png" class="icon" />
          设备</a
        >
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
.device-monitor {
  text-align: center;

  .page-link {
    display: flex;
    max-width: 600px;
    margin: auto;
    position: relative;
    top: -14px;

    .page-link__btn {
      max-width: 140px;
      line-height: 40px;
      flex: 1;
      margin: auto;
      height: 40px;
      background: url('./images/changtai-weidianji@2x.png');
      background-size: cover;
      cursor: pointer;

      a {
        color: #a0a3a8;
        text-decoration: none;
      }

      .icon {
        display: none;
      }

      &.active {
        background: url('./images/xuanzhong-weidianji@2x.png');
        background-size: cover;

        a {
          color: #3be3ed;
        }

        .icon {
          width: 22px;
          display: inline-block;
          position: relative;
          top: 4px;
        }
      }
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
  name: 'Monitor',
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
  }
}
</script>
