<template>
  <div class="admin-device-create-form">
    <el-form :model="form" :rules="rules" inline>
      <el-form-item label="设备编号" prop="number" style="margin-left: 0">
        <el-input v-model="form.number"></el-input>
      </el-form-item>

      <el-form-item label="MAC地址" prop="mac">
        <el-input v-model="form.mac"></el-input>
      </el-form-item>

      <el-form-item label="物理地址" prop="address">
        <el-input v-model="form.address"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
export default {
  name: 'AdminDeviceCreateForm',
  data() {
    return {
      form: {
        number: '',
        mac: '',
        address: ''
      },
      rules: {
        number: [{ required: true, message: '请输入设备编号', trigger: 'blur' }]
      }
    }
  }
}
</script>
