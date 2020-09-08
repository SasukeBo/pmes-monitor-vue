<template>
  <div class="admin-device-type-error-code">
    <div class="operation">
      <el-button size="small" type="primary">导入配置</el-button>
      <el-button size="small" type="danger">清除配置</el-button>
    </div>

    <div class="config-table">
      <table>
        <tr>
          <th>
            <div class="first-cell">
              <div class="line"></div>
              <span class="zijie">字节</span>
              <span class="bit">bit位</span>
            </div>
          </th>
          <th v-for="i in 16" :key="'th_' + i">
            <div>{{ i }}</div>
          </th>
        </tr>

        <tr v-for="i in tableRow" :key="'data_row_' + i">
          <td class="data-row-label">字节{{ i }}</td>
          <td
            v-for="j in 16"
            :key="'data_row_' + i + '_cell_' + j"
            :class="[(i + j) % 2 ? '' : 'white-cell']"
          >
            <div class="data-row-cell" @click="editCell(i, j)">
              {{ tableData[(i - 1) * 16 + j - 1] }}
            </div>
          </td>
        </tr>
      </table>

      <div class="add-row">
        <div class="add-row-btn" @click="addRow()">
          <i class="el-icon-plus"></i>
        </div>
      </div>

      <div class="footer-btns">
        <el-button type="info" size="small" @click="$router.go(-1)"
          >返回</el-button
        >
        <el-button
          type="primary"
          size="small"
          @click="submit()"
          :loading="loading"
          >保存</el-button
        >
      </div>
    </div>

    <el-dialog
      title="编辑故障原因"
      :visible.sync="dialogFormVisible"
      width="500px"
    >
      <el-input
        v-model="editContent"
        type="textarea"
        autocomplete="off"
      ></el-input>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveCell()">保 存</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import gql from 'graphql-tag'

export default {
  name: 'AdminDeviceTypeErrorCode',
  props: {
    id: [Number, String]
  },
  data() {
    return {
      dialogFormVisible: false,
      editContent: '',
      currentIndex: undefined,
      deviceType: undefined,
      tableData: [],
      loading: false
    }
  },
  apollo: {
    deviceType: {
      query: gql`
        query($id: Int!) {
          deviceType: adminDeviceType(id: $id) {
            id
            name
            errorCode {
              id
              errors
            }
          }
        }
      `,
      client: 'adminClient',
      variables() {
        return {
          id: this.id
        }
      }
    }
  },
  computed: {
    tableRow() {
      return Math.floor(this.tableData.length / 16) + 1
    }
  },
  watch: {
    deviceType(val) {
      if (val) {
        if (val.errorCode && val.errorCode.errors) {
          this.tableData = val.errorCode.errors
        }
      }
    }
  },
  methods: {
    submit() {
      if (this.deviceType.errorCode && this.deviceType.errorCode.id) {
        this.loading = true
        this.$apollo
          .mutate({
            mutation: gql`
              mutation($id: Int!, $errors: [String!]!) {
                adminSaveErrorCode(id: $id, errors: $errors)
              }
            `,
            client: 'adminClient',
            variables: {
              id: this.deviceType.errorCode.id,
              errors: this.tableData
            }
          })
          .then(() => {
            this.$message({ type: 'success', message: '保存成功' })
            this.loading = false
          })
          .catch((e) => {
            this.loading = false
            this.$GraphQLError(e)
          })
      } else {
        this.loading = true
        this.$apollo
          .mutate({
            mutation: gql`
              mutation($id: Int!, $errors: [String!]!) {
                adminDeviceTypeAddErrorCode(deviceTypeID: $id, errors: $errors)
              }
            `,
            client: 'adminClient',
            variables: {
              id: this.id,
              errors: this.tableData
            }
          })
          .then(() => {
            this.$message({ type: 'success', message: '保存成功' })
            this.loading = false
          })
          .catch((e) => {
            this.loading = false
            this.$GraphQLError(e)
          })
      }
    },
    addRow() {
      for (var i = 0; i < 16; i++) {
        this.tableData.push('')
      }
    },
    editCell(i, j) {
      this.dialogFormVisible = true
      this.currentIndex = (i - 1) * 16 + j - 1
      this.editContent = this.tableData[this.currentIndex]
    },
    saveCell() {
      this.dialogFormVisible = false
      this.tableData[this.currentIndex] = this.editContent
      this.currentIndex = undefined
      this.editContent = ''
    }
  }
}
</script>
<style lang="scss">
.admin-device-type-error-code {
  padding: 24px;
  margin-bottom: 64px;

  .operation {
    display: flex;
    margin-bottom: 24px;

    .el-button:first-child {
      margin-left: auto;
    }
  }

  .config-table {
    .footer-btns {
      text-align: center;
      .el-button {
        width: 100px;
      }
    }

    .add-row {
      height: 146px;
      background: #fff;
      border-bottom-left-radius: 8px;
      border-bottom-right-radius: 8px;
      box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.23);
      border: 1px solid #ccc;
      border-top: 0;
      padding: 24px 31px;
      margin-bottom: 24px;

      .add-row-btn {
        text-align: center;
        display: flex;
        align-items: center;
        height: 100%;
        font-size: 24px;
        color: #666;
        font-weight: 500;
        background: #eee;
        border: 1px dashed #cccccc;
        cursor: pointer;

        i {
          margin: auto;
        }
      }
    }

    table {
      width: 100%;
      box-shadow: 0px 0px 19px 3px rgba(0, 0, 0, 0.23);
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      border-spacing: 0;
      background: #eee;
      border-left: 1px solid #ccc;

      tr td {
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;

        &.white-cell {
          background: #fff;

          .data-row-cell {
            border: 1px solid #fff;
          }
        }
      }

      tr td.data-row-label {
        height: 96px;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #343434;
        text-align: center;

        &:last-child {
          border-right: 1px solid #ccc;
        }
      }

      tr td .data-row-cell {
        height: 96px;
        padding: 8px;
        font-size: 12px;
        color: #666;
        cursor: pointer;
        overflow: hidden;
        transition: all 0.3s ease;
        border: 1px solid #eee;

        &:hover {
          border: 1px solid #358aff;
        }
      }

      tr th {
        height: 77px;
        padding: 0;
        border-bottom: 1px solid #ccc;
        font-size: 14px;
        font-family: Source Han Sans CN;
        font-weight: 500;
        color: #343434;

        &:last-child {
          border-right: 1px solid #ccc;
        }

        &:first-child {
          width: 96px;
        }

        .first-cell {
          height: 100%;
          position: relative;
          border-right: 1px solid #ccc;
          font-size: 12px;
          color: #343434;

          .zijie,
          .bit {
            position: relative;
          }

          .zijie {
            top: 45px;
          }

          .bit {
            bottom: -14px;
          }

          &:after {
            content: '';
            display: block;
            width: 117px;
            height: 1px;
            background: #ccc;
            position: absolute;
            transform: rotate(39deg);
            top: 38px;
            left: -11px;
          }
        }
      }
    }
  }
}
</style>
