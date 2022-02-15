import PerfectScrollbar from 'vue3-perfect-scrollbar'
import { createApp } from 'vue'
import Antd from 'ant-design-vue'

import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { i18n } from './localization'
import 'charts.css/dist/charts.min.css'

const app = createApp(App)
  .use(store)
  .use(router)
  .use(i18n)
  .use(Antd)
  .use(PerfectScrollbar)

app.mount('#app')
