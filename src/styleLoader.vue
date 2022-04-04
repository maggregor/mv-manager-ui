<template>
  <div />
</template>

<script>
// antd core & themes styles
import 'ant-design-vue/lib/style/index.less'
import '@/css/vendors/antd/themes/default.less'

// third-party plugins styles
import 'bootstrap/dist/css/bootstrap.min.css'
import 'he-tree-vue/dist/he-tree-vue.css'
import 'vue3-perfect-scrollbar/dist/vue3-perfect-scrollbar.css'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'

// vb vendors styles
import '@/css/vendors/antd/style.scss'
import '@/css/vendors/bootstrap/style.scss'
import '@/css/vendors/nprogress/style.scss'
import '@/css/vendors/he-tree-vue/style.scss'
import '@/css/vendors/perfect-scrollbar/style.scss'
import '@/css/vendors/quill/style.scss'

// vb styles
import '@/css/core.scss'
import '@/css/measurements.scss'
import '@/css/colors.scss'
import '@/css/utils.scss'
import '@/css/layout.scss'
import '@/css/router.scss'

// vb extra styles
import '@/css/extra/clean.scss' // clean styles
import '@/css/extra/air.scss' // air styles

export default {
  name: 'StyleLoader',
}
</script>
