<template>
  <div class="container">
    <h1>Grant access to your BigQuery</h1>
    <a-row class="mt-5 mb-4" type="flex" justify="space-around">
      <a-col class="mb-2" :span="20">
        <h2>In order to work properly, Achilio has to perform these actions:</h2></a-col
      >
      <a-col class="illustration" v-for="(action, index) in actions" :key="index" span="6">
        <div>
          <img :src="getImageUrl(action.image)" />
          <h3 class="mt-2">{{ action.desc }}</h3>
        </div>
      </a-col>
    </a-row>
    <a-row type="flex" justify="space-around">
      <a-col :span="6">
        <CTA label="Grant access" :trigger="grantBigQueryAccess" />
      </a-col>
    </a-row>
    <a-row class="mt-2" type="flex" justify="space-around">
      <a-col :span="24">
        <p>
          By granting the access mentionned above, you agree to Achilio’s
          <a href="https://achilio.com/privacy-terms" target="_blank">
            <span class="text-dark">Privacy Policy</span>
          </a>
          .
        </p>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import CTA from '@/components/CTA'
import { mapActions } from 'vuex'
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
}
</script>

<style lang="scss" scoped>
@import './style.module.scss';
</style>
