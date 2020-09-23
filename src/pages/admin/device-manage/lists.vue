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
    </div>

    <div class="type-list">
      <el-table
        class="admin-table"
        stripe
        :data="tableData.devices"
        v-loading="$apollo.queries.tableData.loading"
      >
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column label="机种">
          <template slot-scope="scope">
            {{ scope.row.deviceType.name }}
          </template>
        </el-table-column>
        <el-table-column prop="number" label="设备编号"></el-table-column>
        <el-table-column prop="mac" label="MAC地址"></el-table-column>
        <el-table-column prop="address" label="物理地址"></el-table-column>
        <el-table-column
          prop="createdAt"
          label="创建时间"
          :formatter="formatter"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              type="text"
              @click="deleteDevice(scope.row.id)"
              style="color: #fb6f70"
              >删除</el-button
            >
            <el-button type="text" @click="editDevice(scope.row)"
              >编辑</el-button
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

    <el-dialog title="编辑设备" :visible.sync="dialogFormVisible">
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="编号" prop="number">
          <el-input v-model="form.number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="MAC" prop="mac">
          <el-input v-model="form.mac" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="物理地址">
          <el-input v-model="form.address" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancelForm()">取 消</el-button>
        <el-button type="primary" @click="saveForm()" :loading="formLoading"
          >确 定</el-button
        >
      </div>
    </el-dialog>
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
      },
      rules: {
        mac: [{ required: true, message: '请填写设备编号', trigger: 'blur' }],
        number: [{ required: true, message: '请填写设备编号', trigger: 'blur' }]
      },
      form: {
        id: 0,
        mac: undefined,
        number: undefined,
        address: undefined
      },
      formLoading: false,
      dialogFormVisible: false
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
    formatter(row) {
      var t = new Date(row.createdAt)
      return t.toLocaleString()
    },
    handleSizeChange(val) {
      this.limit = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    editDevice(data) {
      this.form.id = data.id
      this.form.number = data.number
      this.form.mac = data.mac
      this.form.address = data.address
      this.dialogFormVisible = true
    },
    cancelForm() {
      this.dialogFormVisible = false
      this.form.id = 0
      this.form.number = undefined
      this.form.mac = undefined
      this.form.address = undefined
    },
    saveForm() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.formLoading = true
          this.$apollo
            .mutate({
              mutation: gql`
                mutation($id: Int!, $update: DeviceInput!) {
                  response: adminEditDevice(id: $id, update: $update)
                }
              `,
              client: 'adminClient',
              variables: {
                id: this.form.id,
                update: {
                  number: this.form.number,
                  mac: this.form.mac,
                  address: this.form.address
                }
              }
            })
            .then(() => {
              this.formLoading = false
              this.cancelForm()
              this.$apollo.queries.tableData.refetch()
            })
            .catch((e) => {
              this.formLoading = false
              this.cancelForm()
              this.$GraphQLError(e)
            })
        }
      })
    },
    deleteDevice(id) {
      this.$apollo
        .mutate({
          mutation: gql`
            mutation($id: Int!) {
              response: adminDeleteDevice(id: $id)
            }
          `,
          client: 'adminClient',
          variables: { id }
        })
        .then(() => {
          this.$apollo.queries.tableData.refetch()
        })
        .catch((e) => this.$GraphQLError(e))
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
