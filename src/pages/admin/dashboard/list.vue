<template>
  <div class="admin-dashboard-list">
    <div class="operation">
      <el-input
        size="small"
        placeholder="搜索看板"
        v-model="search"
        class="admin-input search"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button
        size="small"
        type="primary"
        class="add-btn"
        @click="$router.push({ name: 'AdminDashboardCreate' })"
        >新增看板</el-button
      >
    </div>

    <div class="type-list">
      <el-table
        class="admin-table"
        stripe
        :data="tableData.dashboards"
        v-loading="$apollo.queries.tableData.loading"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="看板名称"></el-table-column>
        <el-table-column label="设备数量">
          <template slot-scope="scope">
            {{ (scope.row.devices || []).length }}
          </template>
        </el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="deleteDashboard(scope.row.id)"
              style="color: #fb6f70"
              >删除</el-button
            >
            <el-button type="text" @click="edit(scope.row.id)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-pagination
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="page"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
    >
    </el-pagination>
  </div>
</template>
<script>
import gql from 'graphql-tag'
export default {
  name: 'AdminDashboardList',
  data() {
    return {
      page: 1,
      limit: 20,
      search: '',
      tableData: {
        total: 0,
        dahsboards: []
      }
    }
  },
  apollo: {
    tableData: {
      query: gql`
        query($search: String, $limit: Int!, $page: Int!) {
          tableData: adminDashboards(
            search: $search
            limit: $limit
            page: $page
          ) {
            total
            dashboards {
              id
              name
              createdAt
              devices {
                id
                number
              }
            }
          }
        }
      `,
      client: 'adminClient',
      fetchPolicy: 'network-only',
      variables() {
        return {
          search: this.search,
          limit: this.limit,
          page: this.page
        }
      }
    }
  },
  methods: {
    edit(id) {
      this.$router.push({ name: 'AdminDashboardEdit', params: { id } })
    },
    deleteDashboard(id) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($id: Int!) {
              adminDashboardDelete(id: $id)
            }
          `,
          client: 'adminClient',
          variables: { id }
        })
        .then(() => {
          this.$apollo.queries.tableData.refetch()
        })
        .catch((e) => this.$GraphQLError(e))
    },
    handleSizeChange(val) {
      this.limit = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    formatter(row) {
      var t = new Date(row.createdAt)
      return t.toLocaleString()
    }
  }
}
</script>
<style lang="scss">
.admin-dashboard-list {
  padding: 24px;

  .operation {
    display: flex;
    margin-bottom: 24px;

    .search {
      width: 200px;
    }

    .add-btn {
      margin-left: auto;
    }
  }
}
</style>
