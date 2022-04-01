<template>
  <a-row
    v-if="!isRegisteringProject"
    @click="setRegistering(true)"
    class="container"
    type="flex"
    justify="space-around"
    align="middle"
  >
    <div>
      <a v-if="allProjects.length">Register a new BigQuery project</a>
      <a v-else>Register your first BigQuery project</a>
    </div>
  </a-row>
  <CreateEditProjectCard v-else />
</template>
<script>
import CreateEditProjectCard from '@/components/Projects/CreateEditProjectCard'
import { ref } from '@vue/reactivity'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CreateEditProjectCard,
  },
  setup() {
    const creating = ref(false)
    return { creating, ...mapActions({ setRegistering: 'SET_PROJECT_REGISTERING' }) }
  },
  computed: {
    ...mapGetters(['isRegisteringProject', 'allProjects']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
