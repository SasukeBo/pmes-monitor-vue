<template>
  <div class="devices monitor-list-page">
    <div class="list-content">
      <div class="list-content__header">
        <el-form inline class="list-content__header-search-form" size="mini">
          <el-form-item>
            <el-select
              clearable
              v-model="filterForm.status"
              class="status-select"
              popper-class="list-content__header-search-form-status-select-dropdown"
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

      <div class="list-content__body">
        <el-table
          :data="tableData"
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

      <div class="list-content__footer">
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
@import '@/assets/scss/monitor-list.scss';
</style>
