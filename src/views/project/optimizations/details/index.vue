<template>
  <div class="container">{{ optimization }}</div>
</template>

<script>
import { onMounted } from '@vue/runtime-core'
import { getOptimizations } from '@/services/axios/backendApi'
import { useRoute, useRouter } from 'vue-router'
import { ref } from 'vue'

export default {
  name: 'Details',
  components: {},
  setup() {
    const route = useRoute()
    const projectId = route.params.projectId
    const optimizationId = route.params.optimizationId
    const optimization = ref()
    onMounted(async () => {
      optimization.value = await getOptimizations({ projectId, optimizationId })
    })
    return { optimization }
  },
  data() {
    return {}
  },
}
</script>

<style lang="scss">
@import './style.module.scss';
</style>
