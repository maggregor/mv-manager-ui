<template>
  <ProjectList />
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
