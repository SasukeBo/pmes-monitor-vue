<template>
  <div class="admin-device-create">
    <div class="form-title">添加设备</div>
    <el-form :model="form" label-width="80px" :rules="rules">
      <el-form-item label="选择机种" prop="deviceTypeID">
        <el-select
          v-model="form.deviceTypeID"
          filterable
          remote
          placeholder="搜索机种"
          :remote-method="remoteMethod"
          :loading="searchLoading"
        >
          <el-option
            v-for="item in options"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="tip">支持批量创建</div>

    <div>
      <el-form label-width="80px">
        <el-form-item label="设备数量">
          <el-input-number v-model="num" :min="1"></el-input-number>
        </el-form-item>
      </el-form>
    </div>

    <div class="device-forms">
      <AdminDeviceCreateForm
        v-for="i in num"
        :key="'device_form_' + i"
        :ref="'device_form_' + i"
      ></AdminDeviceCreateForm>
    </div>

    <div class="footer-btns">
      <el-button type="info" size="small" @click="$router.go(-1)"
        >取消</el-button
      >
      <el-button type="primary" size="small" @click="submit">保存</el-button>
    </div>
  </div>
</template>
<script>
import AdminDeviceCreateForm from './components/device-form'
import gql from 'graphql-tag'
export default {
  name: 'AdminDeviceCreate',
  components: { AdminDeviceCreateForm },
  data() {
    return {
      num: 1,
      rules: {
        deviceTypeID: [
          { required: true, message: '请选择机种', trigger: 'blur' }
        ]
      },
      form: {
        deviceTypeID: undefined
      },
      searchLoading: false,
      loading: false,
      options: []
    }
  },
  methods: {
    submit() {
      this.loading = true
      var valid = true
      var deviceInputs = []
      for (var i = 1; i <= this.num; i++) {
        var el = this.$refs['device_form_' + i][0]
        /*eslint-disable no-debugger*/
        // debugger
        el.$refs.form.validate((_valid) => {
          valid = _valid
        })
        if (!valid) {
          return
        }
        deviceInputs.push(el.form)
      }

      this.$apollo
        .mutate({
          mutation: gql`
            mutation($input: CreateDeviceInput!) {
              adminCreateDevices(input: $input)
            }
          `,
          client: 'adminClient',
          variables: {
            input: {
              deviceTypeID: this.form.deviceTypeID,
              deviceInputs
            }
          }
        })
        .then(() => {
          this.loading = false
          this.$message({ type: 'success', message: '提交成功' })
          this.$router.push({ name: 'AdminDeviceManage' })
        })
        .catch((e) => {
          this.loading = false
          this.$GraphQLError(e)
        })
    },
    remoteMethod(val) {
      console.log(val)
      this.searchLoading = true
      this.$apollo
        .query({
          query: gql`
            query($search: String) {
              response: adminDeviceTypes(search: $search, limit: 20, page: 1) {
                types {
                  id
                  name
                }
              }
            }
          `,
          client: 'adminClient',
          variables: {
            search: val
          }
        })
        .then(({ data: { response } }) => {
          this.searchLoading = false
          if (response.types) {
            this.options = response.types
          }
        })
        .catch((e) => {
          this.searchLoading = false
          this.$GraphQLError(e)
        })
    }
  }
}
</script>
<style lang="scss">
.admin-device-create {
  width: 900px;
  margin: auto;

  .device-forms {
    margin-bottom: 64px;
  }

  .footer-btns {
    text-align: center;
    margin-bottom: 64px;

    .el-button {
      width: 100px;
    }
  }

  .form-title {
    padding-top: 24px;
    font-size: 28px;
    padding-bottom: 24px;
  }

  .tip {
    padding-bottom: 16px;
  }
}
</style>
