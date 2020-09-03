<template>
  <div class="admin-devices">
    <div class="admin-devices-tab">
      <div
        :class="[
          'admin-devices-tab__item',
          $route.name === 'AdminDeviceTypeManage' ? 'active' : ''
        ]"
        @click="$router.push({ name: 'AdminDeviceTypeManage' })"
      >
        机种管理
      </div>
      <div
        :class="[
          'admin-devices-tab__item',
          $route.name === 'AdminDeviceManage' ? 'active' : ''
        ]"
        @click="$router.push({ name: 'AdminDeviceManage' })"
      >
        设备管理
      </div>
    </div>

    <div class="admin-devices-body">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss">
.admin-devices {
  height: calc(100% - 64px);
  overflow: hidden;
  position: relative;

  .admin-devices-body {
    height: calc(100% - 56px);
    overflow: auto;
  }

  .admin-devices-tab {
    height: 56px;
    background: rgba(128, 128, 128, 0.1);
    line-height: 55px;
    display: flex;
  }

  .admin-devices-tab__item {
    width: 136px;
    text-align: center;
    transition: all 0.3s ease;
    cursor: pointer;
    color: #9a9a9a;
    font-size: 16px;

    &.active,
    &:hover {
      color: #026eff;
      font-weight: 500;
    }

    &.active {
      border-bottom: 2px solid #026eff;
    }
  }
}
</style>
