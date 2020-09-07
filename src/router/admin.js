import Admin from '@/pages/admin'
import AdminDevice from '@/pages/admin/device-manage/index.vue'
import AdminDeviceManage from '@/pages/admin/device-manage/lists.vue'
import AdminDeviceTypeManage from '@/pages/admin/device-manage/types.vue'
import AdminDeviceTypeErrorCode from '@/pages/admin/device-manage/error-codes.vue'
import AdminDeviceCreate from '@/pages/admin/device-manage/create.vue'
import AdminDashboard from '@/pages/admin/dashboard'
import AdminDashboardList from '@/pages/admin/dashboard/list.vue'
import AdminDashboardCreate from '@/pages/admin/dashboard/create.vue'

export default {
  path: '/monitor/admin',
  name: 'Admin',
  redirect: { name: 'AdminDevice' },
  component: Admin,
  children: [
    {
      path: 'dashboards',
      name: 'AdminDashboard',
      component: AdminDashboard,
      redirect: { name: 'AdminDashboardList' },
      children: [
        {
          path: 'list',
          name: 'AdminDashboardList',
          component: AdminDashboardList
        },
        {
          path: 'create',
          name: 'AdminDashboardCreate',
          component: AdminDashboardCreate
        },
        {
          path: ':id/editl',
          name: 'AdminDashboardEdit',
          props: true,
          component: AdminDashboardCreate
        }
      ]
    },
    {
      path: 'devices',
      name: 'AdminDevice',
      component: AdminDevice,
      redirect: { name: 'AdminDeviceTypeManage' },
      children: [
        {
          path: 'types',
          name: 'AdminDeviceTypeManage',
          component: AdminDeviceTypeManage
        },
        {
          path: 'lists',
          name: 'AdminDeviceManage',
          component: AdminDeviceManage
        },
        {
          // 对一个机种的故障代码配置
          path: 'types/:id/error-codes',
          name: 'AdminDeviceTypeErrorCode',
          props: true,
          component: AdminDeviceTypeErrorCode
        },
        {
          // 对单个设备的故障代码配置
          path: ':id/error-codes',
          name: 'AdminDeviceErrorCode',
          props: true,
          component: AdminDeviceTypeErrorCode
        },
        {
          path: 'create',
          name: 'AdminDeviceCreate',
          component: AdminDeviceCreate
        }
      ]
    }
  ]
}
