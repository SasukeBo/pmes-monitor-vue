<template>
  <div class="admin-device-create">
    <div class="form-title">添加设备</div>
    <el-form :model="form" label-width="80px" :rules="rules">
      <el-form-item label="选择机种" prop="deviceTypeID">
        <el-select clearable v-model="form.deviceTypeID">
          <el-option :value="1" label="1069系列"></el-option>
          <el-option :value="2" label="1828系列"></el-option>
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
      <el-button type="primary" size="small">保存</el-button>
    </div>
  </div>
</template>
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
<script>
import AdminDeviceCreateForm from './components/device-form'
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
      }
    }
  }
}
</script>
