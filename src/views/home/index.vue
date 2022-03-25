<template>
  <div :class="$style.container">
    <h1 class="text-black text-weight-700 font-size-50">Hello {{ firstName }},</h1>
    <InsufficientPermissions v-if="hasInsufficientPermissions" />
    <ProjectList v-else />
  </div>
</template>

<script>
import InsufficientPermissions from '@/components/InsufficientPermissions'
import ProjectList from '@/components/Projects/ProjectList'

import { mapGetters } from 'vuex'

export default {
  name: 'Home',
  components: {
    InsufficientPermissions,
    ProjectList,
  },
  computed: {
    ...mapGetters(['firstName', 'allProjects', 'allOrganizations', 'hasInsufficientPermissions']),
  },
}
</script>
<style lang="scss" module>
@import './style.module.scss';
</style>
