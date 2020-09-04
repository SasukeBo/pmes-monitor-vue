<template>
  <div class="admin-device-manage">
    <div class="operation">
      <el-input
        size="small"
        placeholder="搜索设备"
        v-model="search"
        class="admin-input search"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button
        size="small"
        type="primary"
        class="add-btn"
        @click="$router.push({ name: 'AdminDeviceCreate' })"
        >新增设备</el-button
      >
      <el-button size="small" type="danger">批量删除</el-button>
    </div>

    <div class="type-list">
      <el-table class="admin-table" stripe :data="tableData.devices">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="机种">
          <template slot-scope="scope">
            {{ scope.row.deviceType.name }}
          </template>
        </el-table-column>
        <el-table-column prop="number" label="设备编号"></el-table-column>
        <el-table-column prop="mac" label="MAC地址"></el-table-column>
        <el-table-column prop="address" label="物理地址"></el-table-column>
        <el-table-column prop="user" label="创建人"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="deleteDevice(scope.row.id)"
              style="color: #fb6f70"
              >删除</el-button
            >
            <el-button type="text" @click="manageCode(scope.row.id)"
              >故障代码</el-button
            >
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
      :page-size="limit"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.total"
    >
    </el-pagination>
  </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
  name: 'AdminDeviceManage',
  data() {
    return {
      limit: 20,
      search: '',
      page: 1,
      tableData: {
        total: 0,
        devices: []
      }
    }
  },
  apollo: {
    tableData: {
      query: gql`
        query($search: String, $limit: Int!, $page: Int!) {
          tableData: adminDevices(search: $search, limit: $limit, page: $page) {
            total
            devices {
              id
              createdAt
              number
              deviceType {
                id
                name
              }
              mac
              address
              status
            }
          }
        }
      `,
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
    handleSizeChange(val) {
      this.limit = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    manageCode() {
      alert('未实现')
    },
    deleteDevice() {
      alert('未实现')
    }
  }
}
</script>
<style lang="scss">
.admin-device-manage {
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
