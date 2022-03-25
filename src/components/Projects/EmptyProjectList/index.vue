<template>
  <a-row type="flex" justify="space-around" align="middle" class="container">
    <div>
      <h1>No BigQuery projects found</h1>
      <h2>on the Google account {{ user.email }}</h2>
    </div>
    <!-- <h3 class="mt-5 mb-5">
      You either don't have activated BigQuery on any of your project, or you don't have sufficient
      permissions
    </h3>

    <a-row type="flex" justify="space-around">
      <a-col :span="6">
        <CTA secondary label="Retry to grant access" :trigger="grantBigQueryAccess" />
      </a-col>
    </a-row> -->
  </a-row>
</template>
<script>
// import CTA from '@/components/CTA'
import { mapActions, mapGetters } from 'vuex'
export default {
  // components: {
  //   CTA,
  // },
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
