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
      <div v-if="allProjects.length > 0">
        <a>Synchronize a new BigQuery project</a>
      </div>
      <div v-else>
        <img
          style="height: 30px; margin-bottom: 10px"
          src="@/assets/illustrations/bigquery_and_achilio.svg"
        />
        <br />
        <a>Synchronize your first BigQuery project</a>
      </div>
    </div>
  </a-row>
  <CreateEditProjectCard v-else />
</template>
<script>
import CreateEditProjectCard from '@/components/Projects/CreateEditProjectCard'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CreateEditProjectCard,
  },
  setup() {
    return { ...mapActions({ setRegistering: 'SET_PROJECT_REGISTERING' }) }
  },
  computed: {
    ...mapGetters(['isRegisteringProject', 'allProjects']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
