<template>
  <div class="dashboard monitor-list-page">
    <div class="list-content">
      <div class="list-content__header">
        <el-form inline class="list-content__header-search-form" size="mini">
          <el-form-item>
            <el-input v-model="pattern" class="search-input">
              <el-button slot="append" icon="el-icon-search"></el-button>
            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="list-content__body">
        <el-table
          :data="tableData.dashboards"
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
            label="名称"
            prop="name"
          ></el-table-column>
          <el-table-column
            width="200"
            label="设备总数"
            prop="deviceTotal"
          ></el-table-column>
          <el-table-column label="运行中" prop="runningTotal"></el-table-column>
          <el-table-column label="故障停机" prop="errorTotal"></el-table-column>
          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="viewDashboard(scope.row.id)"
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
  name: 'Dashboard',
  data() {
    return {
      pattern: '',
      limit: 20,
      tableData: {
        total: 0,
        dashboards: []
      },
      currentPage: 1
    }
  },
  apollo: {
    tableData: {
      query: gql`
        query($search: String, $page: Int!, $limit: Int!) {
          tableData: dashboards(search: $search, page: $page, limit: $limit) {
            total
            dashboards {
              id
              name
              deviceTotal
              runningTotal
              errorTotal
            }
          }
        }
      `,
      variables() {
        return {
          search: this.pattern,
          limit: this.limit,
          page: this.currentPage
        }
      }
    }
  },
  methods: {
    viewDashboard(id) {
      this.$router.push({ name: 'DashboardView', params: { id } })
    },
    handleSizeChange() {},
    handleCurrentChange() {}
  }
}
</script>
<style lang="scss">
@import '@/assets/scss/monitor-list.scss';
</style>
