<template>
  <div>
    <h3 class="mb-4">Projects</h3>
    <ProjectList />
  </div>
</template>

<script>
import ProjectList from '@/components/Projects/ProjectList'
import { useStore } from 'vuex'
import { onMounted } from '@vue/runtime-core'

export default {
  components: {
    ProjectList,
  },
  setup() {
    const store = useStore()
    onMounted(() => store.dispatch('SET_PROJECT_REGISTERING', false))
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
