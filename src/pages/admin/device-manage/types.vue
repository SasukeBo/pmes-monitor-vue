<template>
  <div class="admin-device-types">
    <div class="operation">
      <el-input
        size="small"
        placeholder="搜索机种"
        v-model="search"
        class="admin-input search"
      >
        <el-button slot="append" icon="el-icon-search"></el-button>
      </el-input>
      <el-button
        size="small"
        type="primary"
        class="add-btn"
        @click="dialogFormVisible = true"
        >新增机种</el-button
      >
      <el-button size="small" type="danger" @click="deleteSelected"
        >批量删除</el-button
      >
    </div>

    <el-dialog title="创建机种" :visible.sync="dialogFormVisible" width="500px">
      <el-form :model="form">
        <el-form-item label="填写名称" label-width="80">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="save()">确 定</el-button>
      </div>
    </el-dialog>

    <div class="type-list">
      <el-table class="admin-table" stripe :data="tableData.types">
        <el-table-column type="selection"></el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="name" label="机种名称"></el-table-column>
        <el-table-column prop="user" label="创建人"></el-table-column>
        <el-table-column prop="createdAt" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="deleteType(scope.row.id)"
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
      :current-page="currentPage"
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
  name: 'AdminDeviceTypeManage',
  data() {
    return {
      search: '',
      limit: 100,
      currentPage: 1,
      loading: false,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      tableData: {
        total: 0,
        types: []
      }
    }
  },
  apollo: {
    tableData: {
      query: gql`
        query($limit: Int!, $page: Int!) {
          tableData: adminDeviceTypes(limit: $limit, page: $page) {
            total
            types {
              id
              name
              createdAt
              errorCode {
                id
                errors
              }
            }
          }
        }
      `,
      variables() {
        return {
          limit: this.limit,
          page: this.currentPage
        }
      }
    }
  },
  methods: {
    cancel() {
      this.form.name = ''
      this.dialogFormVisible = false
    },
    save() {
      this.loading = true
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($name: String!) {
              adminDeviceTypeCreate(name: $name)
            }
          `,
          variables: {
            name: this.form.name
          }
        })
        .then(() => {
          this.loading = false
          this.$message({ type: 'success', message: '创建成功' })
          this.form.name = ''
          this.dialogFormVisible = false
          this.$apollo.queries.tableData.refetch()
        })
        .catch((e) => {
          this.loading = false
          this.$GraphQLError(e)
        })
    },
    manageCode(id) {
      this.$router.push({ name: 'AdminDeviceTypeErrorCode', params: { id } })
    },
    handleSizeChange(val) {
      this.limit = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    deleteType(id) {
      alert('未实现')
      console.log(id)
    },
    deleteSelected() {
      alert('未实现')
    }
  }
}
</script>
<style lang="scss">
.admin-device-types {
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
