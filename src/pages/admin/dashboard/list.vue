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
      <el-button size="small" type="danger">批量删除</el-button>
    </div>

    <div class="type-list">
      <el-table class="admin-table" stripe :data="tableData">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="看板名称"></el-table-column>
        <el-table-column prop="count" label="设备数量"></el-table-column>
        <el-table-column prop="user" label="创建人"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
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
      :current-page="currentPage"
      :page-sizes="[100, 200, 300, 400]"
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'AdminDashboardList',
  data() {
    return {
      search: '',
      tableData: [
        {
          id: 1,
          count: 5,
          name: '测试看板',
          user: '小白',
          createdAt: '2020-09-05'
        }
      ],
      currentPage: 1
    }
  },
  methods: {
    edit(id) {
      this.$router.push({ name: 'AdminDashboardEdit', params: { id } })
    },
    deleteDashboard(id) {
      console.log(id)
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
