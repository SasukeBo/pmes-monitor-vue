<template>
  <div class="admin-dashboard-create-form">
    <div class="form-title">添加看板</div>
    <el-form
      :model="form"
      ref="form"
      label-width="150px"
      style="width: 600px"
      :rules="rules"
    >
      <el-form-item label="看板名称" prop="name">
        <el-input v-model="form.name" placeholder="填写看板名称"></el-input>
      </el-form-item>

      <el-form-item label="向看板添加设备" prop="deviceIDs">
        <el-select
          v-model="selectDeviceID"
          filterable
          remote
          @change="handleSelectChange"
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option v-for="item in options" :key="item.id" :value="item.id">
            <span style="float: left">{{ item.number }}</span>
            <span style="float: right; color: #8492a6; font-size: 13px">{{
              item.deviceType.name
            }}</span>
          </el-option>
        </el-select>
      </el-form-item>
    </el-form>

    <div class="selected-devices">
      <div
        v-for="item in selectedDevices"
        :key="'selected_' + item.id"
        class="selected-device"
        @click="removeSelected(item.id)"
      >
        <span>{{ item.number }}</span>
        <span style="color: #8492a6; font-size: 13px; margin-left: auto">{{
          item.deviceType.name
        }}</span>
        <span style="margin: 0 16px"><i class="el-icon-error"></i></span>
      </div>
    </div>

    <div class="footer-btns">
      <el-button type="info" size="small" @click="$router.go(-1)"
        >取消</el-button
      >
      <el-button
        type="primary"
        size="small"
        @click="submit"
        :loading="submitting"
        >保存</el-button
      >
    </div>
  </div>
</template>
<script>
import gql from 'graphql-tag'
export default {
  name: 'AdminDashboardCreateForm',
  props: {
    id: [Number, String]
  },
  data() {
    return {
      selectDeviceID: undefined,
      submitting: false,
      loading: false,
      rules: {
        name: [{ required: true, message: '请填写看板名称', trigger: 'blur' }]
      },
      form: {
        name: '',
        deviceIDs: []
      },
      options: [],
      selectedDevices: []
    }
  },
  methods: {
    remoteMethod(val) {
      this.loading = true
      this.$apollo
        .query({
          query: gql`
            query($search: String) {
              response: adminDevices(search: $search, page: 1, limit: 20) {
                devices {
                  id
                  number
                  deviceType {
                    id
                    name
                  }
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
          this.loading = false
          if (response.devices) {
            this.options = response.devices
          }
        })
        .catch((e) => {
          this.loading = false
          this.$GraphQLError(e)
        })
    },
    handleSelectChange(val) {
      var index = this.form.deviceIDs.find((i) => i === val)
      if (index >= 0) {
        return
      }
      index = this.options.findIndex((i) => i.id === val)
      if (index < 0) {
        return
      }

      this.selectDeviceID = undefined
      this.form.deviceIDs.push(val)
      this.selectedDevices.push(this.options[index])
    },
    removeSelected(id) {
      var index = this.selectedDevices.findIndex((d) => d.id === id)
      if (index >= 0) {
        this.selectedDevices.splice(index, 1)
      }
      index = this.form.deviceIDs.findIndex((i) => i === id)
      if (index >= 0) {
        this.form.deviceIDs.splice(index, 1)
      }
    },
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.submitting = true
          this.$apollo
            .mutate({
              mutation: gql`
                mutation($name: String!, $deviceIDs: [Int!]!) {
                  adminCreateDashboard(name: $name, deviceIDs: $deviceIDs)
                }
              `,
              client: 'adminClient',
              variables: {
                ...this.form
              }
            })
            .then(() => {
              this.submitting = false
              this.$message({ type: 'success', message: '提交成功' })
              this.$router.push({ name: 'AdminDashboardList' })
            })
            .catch((e) => {
              this.submitting = false
              this.$GraphQLError(e)
            })
        }
      })
    }
  }
}
</script>
<style lang="scss">
.admin-dashboard-create-form {
  width: 900px;
  margin: auto;

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

  .selected-devices {
    margin-bottom: 64px;

    .selected-device {
      height: 46px;
      line-height: 46px;
      border: 1px solid #dedede;
      border-radius: 4px;
      padding: 0 16px;
      display: flex;
      width: 300px;
      margin-left: 150px;
      box-shadow: 1px 4px 3px rgba(0, 0, 0, 0.1);
      margin-bottom: 16px;

      i {
        cursor: pointer;
        transition: all 0.3s ease;

        &:hover {
          color: #666;
        }
      }
    }
  }
}
</style>
