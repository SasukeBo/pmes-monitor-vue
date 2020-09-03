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
      <el-button size="small" type="danger">批量删除</el-button>
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
      <el-table class="admin-table" stripe :data="tableData">
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
      :page-size="100"
      layout="total, sizes, prev, pager, next, jumper"
      :total="400"
    >
    </el-pagination>
  </div>
</template>
<script>
export default {
  name: 'AdminDeviceTypeManage',
  data() {
    return {
      currentPage: 1,
      dialogFormVisible: false,
      form: {
        name: ''
      },
      tableData: [
        {
          id: 1,
          name: '1609检测设备',
          user: '小明',
          createdAt: '2020-01-01'
        },
        {
          id: 2,
          name: '1609检测设备',
          user: '小明',
          createdAt: '2020-01-01'
        }
      ]
    }
  },
  methods: {
    cancel() {},
    save() {},
    manageCode(id) {
      this.$router.push({ name: 'AdminDeviceTypeErrorCode', params: { id } })
    },
    handleSizeChange() {},
    handleCurrentChange() {}
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
