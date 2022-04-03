<template>
  <div class="menuSimply">
    <a-row type="flex" align="middle">
      <a-col :span="6">
        <a @click="$router.push('/')" class="d-none d-md-block">
          <Logo />
        </a>
      </a-col>
      <a-col :span="10"> </a-col>
      <a-col :span="8">
        <div :class="$style.logoutContainer">
          <div v-if="isAuthorized">
            <b class="text-gray-6">{{ user.name }} </b>
            <a class="pl-4 text-primary text-weight-600" @click="logout">Logout</a>
            <p style="height: 8px">{{ user.email }}</p>
            <a-tag v-if="trialDaysRemaining > 0" color="orange"
              >Trial period: {{ trialDaysRemaining }} days remaining</a-tag
            >
            <a-tag v-else-if="trialDaysRemaining === 0 && !hasActiveSubscription" color="red"
              >Trial period has expired</a-tag
            >
            <a-tag>Team {{ user.teamName }}</a-tag>
          </div>
        </div>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Logo from '@/components/Logo'
export default {
  components: { Logo },
  setup() {
    return {
      ...mapActions({ logout: 'LOGOUT' }),
    }
  },
  computed: {
    ...mapGetters(['user', 'isAuthorized', 'trialDaysRemaining', 'hasActiveSubscription']),
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
