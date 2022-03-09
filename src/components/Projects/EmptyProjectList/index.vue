<template>
  <div class="container">
    <h1>No BigQuery projects found</h1>
    <h2>on the Google account {{ user.email }}</h2>
    <h3 class="mt-5 mb-5">
      You either don't have activated BigQuery on any of your project, or you don't have sufficient
      permissions
    </h3>

    <a-row type="flex" justify="space-around">
      <a-col :span="6">
        <CTA secondary label="Retry to grant access" :trigger="grantBigQueryAccess" />
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CTA from '@/components/CTA'
import { mapActions, mapGetters } from 'vuex'
export default {
  components: {
    CTA,
  },
  setup() {
    const getImageUrl = pic => require(`@/assets/illustrations/${pic}.svg`)
    // Achilio have to perform theses actions
    const actions = [
      { desc: 'List your projects', image: 'list_project_action' },
      { desc: 'Get the SQL history', image: 'get_history_action' },
      { desc: 'Create Materialized Views', image: 'create_mv_action' },
    ]
    return {
      ...mapActions({ grantBigQueryAccess: 'GRANT_BIGQUERY_ACCESS' }),
      getImageUrl,
      actions,
    }
  },
  computed: {
    ...mapGetters(['user']),
  },
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
