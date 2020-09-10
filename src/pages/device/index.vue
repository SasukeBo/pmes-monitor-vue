<template>
  <div class="devices monitor-list-page">
    <div class="list-content">
      <div class="list-content__header">
        <el-form inline class="list-content__header-search-form" size="mini">
          <el-form-item>
            <el-select
              clearable
              v-model="status"
              class="status-select"
              popper-class="list-content__header-search-form-status-select-dropdown"
            >
              <el-option value="Running" label="运行中"></el-option>
              <el-option value="Stopped" label="已停机"></el-option>
              <el-option value="Offline" label="已离线"></el-option>
              <el-option value="Error" label="故障停机"></el-option>
            </el-select>
          </el-form-item>

          <el-form-item>
            <el-input
              v-model="pattern"
              class="search-input"
              @keyup.enter.native="search = pattern"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="search = pattern"
              ></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="list-content__body">
        <el-table
          :data="tableData.devices"
          header-row-class-name="list-content__body-table-header"
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
            prop="deviceType"
          ></el-table-column>
          <el-table-column label="运行状态">
            <template slot-scope="scope">
              {{ statusMap[scope.row.status] }}
            </template>
          </el-table-column>
          <el-table-column label="稼动率">
            <template slot-scope="scope">
              {{ (scope.row.activation * 100).toFixed(2) + '%' }}
            </template>
          </el-table-column>
          <el-table-column label="良率">
            <template slot-scope="scope">
              {{ (scope.row.yield * 100).toFixed(2) + '%' }}
            </template>
          </el-table-column>
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

      <div class="list-content__footer">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[20, 100, 200, 300, 400]"
          :page-size="limit"
          layout="total, prev, pager, next, sizes, jumper"
          :total="tableData.total"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
export default {
  name: 'Devices',
  data() {
    return {
      pattern: '',
      tableData: {
        devices: [],
        total: 0
      },
      statusMap: {
        stopped: '停机',
        running: '运行中',
        offline: '离线',
        error: '故障'
      },
      currentPage: 1,
      limit: 20,
      search: '',
      status: ''
    }
  },
  apollo: {
    tableData: {
      query: gql`
        query(
          $search: String
          $status: DeviceStatus
          $page: Int!
          $limit: Int!
        ) {
          tableData: devices(
            search: $search
            status: $status
            page: $page
            limit: $limit
          ) {
            total
            devices {
              id
              number
              deviceType
              status
              activation
              yield
              address
            }
          }
        }
      `,
      variables() {
        return {
          search: this.search || undefined,
          status: this.status || undefined,
          page: this.currentPage,
          limit: this.limit
        }
      }
    }
  },
  methods: {
    viewDevice(id) {
      this.$router.push({ name: 'DeviceOverview', params: { id } })
    },
    handleSizeChange(val) {
      this.limit = val
    },
    handleCurrentChange(val) {
      this.currentPage = val
    }
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/monitor-list.scss';
</style>
