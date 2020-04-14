import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/views/Dashboard.vue'
import ExcelView from './components/views/Excel.vue'
import ChartView from './components/views/Chart.vue'
import TasksView from './components/views/Tasks.vue'
import SettingView from './components/views/Setting.vue'
import AccessView from './components/views/Access.vue'
import ServerView from './components/views/Server.vue'
import ReposView from './components/views/Repos.vue'

import DataDasarView from './components/views/DataDasarView.vue'
import UnitView from './components/views/UnitView.vue'
import KategoriUnitView from './components/views/KategoriUnitVIew.vue'
import CapaianUnitVIew from './components/views/CapaianUnitVIew.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  },
  {
    path: '/',
    component: DashView,
    children: [
      {
        path: 'dashboard',
        alias: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      }, {
        path: 'excel',
        component: ExcelView,
        name: 'Excel',
        meta: {description: 'Excel in CoPilot'}
      }, {
        path: 'chart',
        component: ChartView,
        name: 'Chart',
        meta: {description: 'Chart in CoPilot'}
      }, {
        path: 'kategori-unit',
        component: KategoriUnitView,
        name: 'Kategori Unit',
        meta: {description: 'Kategori Unit in CoPilot'}
      }, {
        path: 'data-dasar',
        component: DataDasarView,
        name: 'Data Dasar',
        meta: {description: 'Data Dasar in CoPilot'}
      }, {
        path: 'unit',
        component: UnitView,
        name: 'Unit',
        meta: {description: 'Unit in CoPilot'}
      }, {
        path: 'capaian-unit',
        component: CapaianUnitVIew,
        name: 'Capaian Unit',
        meta: {description: 'Capaian Unit in CoPilot'}
      }, {
        path: 'tasks',
        component: TasksView,
        name: 'Tasks',
        meta: {description: 'Tasks page in the form of a timeline'}
      }, {
        path: 'setting',
        component: SettingView,
        name: 'Settings',
        meta: {description: 'User settings page'}
      }, {
        path: 'access',
        component: AccessView,
        name: 'Access',
        meta: {description: 'Example of using maps'}
      }, {
        path: 'server',
        component: ServerView,
        name: 'Servers',
        meta: {description: 'List of our servers', requiresAuth: true}
      }, {
        path: 'repos',
        component: ReposView,
        name: 'Repository',
        meta: {description: 'List of popular javascript repos'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
