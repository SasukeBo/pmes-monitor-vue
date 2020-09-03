<template>
  <div class="devices">
    <div class="device-list">
      <div class="device-list__header">
        <el-form inline class="device-list__header-search-form" size="mini">
          <el-form-item>
            <el-select
              clearable
              v-model="filterForm.status"
              class="status-select"
              popper-class="device-list__header-search-form-status-select-dropdown"
            >
              <el-option value="running" label="运行中"></el-option>
              <el-option value="stopped" label="已停机"></el-option>
              <el-option value="offline" label="已离线"></el-option>
              <el-option value="error" label="故障停机"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input v-model="filterForm.pattern" class="search-input">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="device-list__body">
        <el-table
          :data="tableData"
          header-row-class-name="device-list__body-table-header"
          stripe
        >
          <el-table-column
            label="序号"
            type="index"
            width="68"
            class-name="index-column"
          ></el-table-column>
          <el-table-column
            width="200"
            label="编号"
            prop="number"
          ></el-table-column>
          <el-table-column
            width="200"
            label="机种"
            prop="name"
          ></el-table-column>
          <el-table-column label="运行状态" prop="status"></el-table-column>
          <el-table-column label="稼动率" prop="activation"></el-table-column>
          <el-table-column label="良率" prop="yield"></el-table-column>
          <el-table-column
            label="物理地址"
            prop="address"
            width="200"
          ></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="viewDevice(scope.row.id)"
                style="color: #3BE3ED;font-size:12px"
                >查看详情</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </div>

      <div class="device-list__footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[100, 200, 300, 400]"
          :page-size="100"
          layout="total, prev, pager, next, sizes, jumper"
          :total="400"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { data } from './fakedata.js'
export default {
  name: 'Devices',
  data() {
    return {
      filterForm: {
        status: undefined,
        pattern: ''
      },
      tableData: data,
      currentPage: 1
    }
  },
  methods: {
    viewDevice(id) {
      this.$router.push({ name: 'DeviceOverview', params: { id } })
    },
    handleSizeChange(val) {
      console.log(val)
    },
    handleCurrentChange(val) {
      console.log(val)
    }
  }
}
</script>
<style lang="scss">
.el-select-dropdown.el-popper.device-list__header-search-form-status-select-dropdown {
  background: #080b10;
  border: 1px solid #358aff;

  .el-select-dropdown__list,
  .el-select-dropdown__item {
    background: transparent;
  }

  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: #358aff;
    color: #fff;
  }
}

.devices {
  max-width: 1200px;
  margin: auto;
  background: url('./images/beijing@2x.png');
  background-size: cover;

  .device-list__footer {
    height: 60px;
    background: url('~@/assets/images/3kuangxiabu@2x.png');
    background-size: cover;
    text-align: left;

    .el-pagination {
      margin-left: 40px;

      .el-pager li {
        background: transparent;
        color: #a0a3a8;

        &:hover,
        &.active {
          color: #358aff;
        }
      }

      .el-input__inner {
        background: #111925;
        border: none;
      }
    }

    .el-pagination .btn-next,
    .el-pagination .btn-prev {
      background: transparent;
      color: #fff;
    }

    .el-pagination button:disabled {
      background: transparent;
      color: #c0c4cc;
    }
  }

  .device-list__header {
    height: 92px;
    background: url('~@/assets/images/1kaungshangbu@2x.png');
    background-size: cover;
    border-bottom: 1px solid rgba(59, 227, 237, 0.3);

    .device-list__header-search-form {
      position: relative;
      top: 44px;

      .el-input__inner {
        color: #fff;
        background: transparent;
        border: 1px solid #358aff;
      }

      .status-select {
        width: 136px;
        color: #fff;
      }

      .search-input {
        width: 226px;

        .el-input-group__append {
          background: #358aff;
          border: none;
        }

        .el-button {
          background: #358aff;
          border-color: #358aff;
          color: #fff;
        }
      }
    }
  }

  .device-list {
    padding-top: 62px;

    .device-list__body {
      padding: 40px 24px 28px 24px;
      border-left: 1px solid rgba(53, 138, 255, 0.3);
      border-right: 1px solid rgba(53, 138, 255, 0.3);

      .el-table--enable-row-hover .el-table__body tr:hover > td {
        background: rgba(0, 0, 0, 0.5);
      }

      .el-table--striped .el-table__body tr.el-table__row--striped td {
        background: rgba(17, 25, 37, 0.5);
      }

      .el-table {
        background: transparent;
        &:before {
          display: none;
        }

        .index-column {
          padding-left: 14px !important;
        }

        .el-table__row {
          background: transparent !important;
          height: 32px;

          td {
            padding: 0;
            line-height: 32px;
            color: #a0a3a8;
          }
        }

        td,
        th {
          border: none;
        }
      }

      .el-table .el-table__header-wrapper {
        height: 32px;
      }

      .el-table .cell {
        text-align: left;
      }

      .device-list__body-table-header {
        background: rgba(59, 227, 237, 0.3);
        color: #3be3ed;
        font-size: 12px;

        th {
          background: transparent;
          padding: 4px 0;
        }
      }
    }
  }
}
</style>
