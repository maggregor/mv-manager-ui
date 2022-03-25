<template>
  <a-row type="flex" justify="space-around" align="middle" class="container">
    <div>
      <h1>No BigQuery projects found</h1>
      <h2>on the Google account {{ user.email }}</h2>
    </div>
  </a-row>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  setup() {
    return {
      ...mapActions({ grantBigQueryAccess: 'GRANT_BIGQUERY_ACCESS' }),
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
