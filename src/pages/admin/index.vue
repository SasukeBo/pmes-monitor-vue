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
    <div class="admin-main">
      <div class="admin-main-header">
        <div class="header-btn">
          <svg
            t="1599112613219"
            class="icon"
            viewBox="0 0 1024 1024"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            p-id="4793"
            width="200"
            height="200"
          >
            <path
              d="M835.584 63.488q26.624 0 49.664 10.24t40.448 27.648 27.648 40.448 10.24 49.664l0 641.024q0 26.624-10.24 49.664t-27.648 40.448-40.448 27.648-49.664 10.24l-448.512 0q-26.624 0-49.664-10.24t-40.448-27.648-27.648-40.448-10.24-49.664l0-192.512 128 0 0 192.512 448.512 0 0-641.024-448.512 0 0 192.512-128 0 0-192.512q0-26.624 10.24-49.664t27.648-40.448 40.448-27.648 49.664-10.24l448.512 0zM513.024 614.4q0-19.456-9.728-28.672t-24.064-9.216l-378.88 0q-14.336 0-25.088-7.68t-10.752-26.112l0-52.224q0-29.696 9.216-37.376t35.84-7.68l31.744 0q24.576 0 58.368 0.512t73.728 1.024 77.312 1.024 69.12 0.512l51.2 0q22.528 0 32.256-16.384t9.728-35.84l0-49.152q0-20.48 8.704-25.6t26.112 9.216 47.104 32.768 61.952 37.888 62.976 38.4 49.152 34.304q14.336 11.264 14.336 30.72t-11.264 28.672q-16.384 14.336-44.544 32.256t-59.392 36.864-60.928 37.376-48.128 33.792q-23.552 19.456-34.816 19.968t-11.264-30.208l0-49.152z"
              p-id="4794"
            ></path>
          </svg>
          <span>进入前台</span>
        </div>
        <div class="header-btn">
          admin
        </div>
      </div>
      <div class="admin-main-body">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.admin {
  height: 100%;
  overflow: hidden;
  display: flex;

  .admin-main {
    flex: auto;
    background: #eeeeee;
    height: 100%;
    overflow: hidden;
    position: relative;

    .admin-main-body {
      margin-top: 64px;
      height: 100%;
      overflow: hidden;
    }

    .admin-main-header {
      display: flex;
      height: 64px;
      position: absolute;
      width: 100%;

      .header-btn {
        width: 125px;
        height: 64px;
        line-height: 64px;
        text-align: center;
        border-left: 1px solid #dedede;
        font-size: 16px;
        color: #343434;
        cursor: pointer;

        &:first-child {
          margin-left: auto;
        }

        .icon {
          width: 14px;
          height: 14px;
          margin-right: 8px;
        }
      }
    }
  }

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

  .admin-input {
    box-shadow: 1px 3px 10px 0px rgba(154, 154, 154, 0.22);
    border: none;
    border-radius: 4px;
  }

  .admin-table.el-table {
    box-shadow: 0px 0px 7px 0px rgba(0, 0, 0, 0.13);
    border-radius: 8px;
    margin-bottom: 24px;

    .el-table__header-wrapper {
      tr th {
        font-size: 14px;
        color: #343434;
        text-align: left;
        background: #eeeeee;
      }
    }
  }
}
</style>
