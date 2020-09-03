<template>
  <div class="admin">
    <div class="nav-tabs">
      <div class="nav-tabs-title">
        普创智控
      </div>

      <div class="nav-tab">
        设备管理
      </div>

      <div class="nav-tab">
        看板管理
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>
<style lang="scss">
.admin {
  height: 100%;
  overflow: hidden;
  display: flex;

  .nav-tabs {
    width: 160px;
    background: #1e2630;
    color: #e0e1e3;

    .nav-tabs-title {
      height: 64px;
      line-height: 64px;
      padding-left: 16px;
      font-size: 24px;
      font-family: Source Han Sans CN;
      border-bottom: 1px solid rgba(255, 255, 255, 0.23);
    }

    .nav-tab {
      height: 48px;
      line-height: 48px;
      font-size: 14px;
      font-family: Source Han Sans CN;
      font-weight: 400;
      color: #e0e1e4;
      padding-left: 16px;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover,
      &.active {
        background: rgba(255, 255, 255, 0.12);
      }
    }
  }
}
</style>
