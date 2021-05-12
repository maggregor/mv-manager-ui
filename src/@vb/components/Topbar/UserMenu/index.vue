<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <div :class="$style.dropdown">
      <a-avatar shape="square" size="large" :class="$style.avatar">
        <v-img :src="user.avatar">
</v-img>
      </a-avatar>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <div>
            <strong>{{ user.name || 'Anonymous' }}</strong>
          </div>
          <div>
            <strong class="mr-1">{{ $t('topBar.profileMenu.role') }}:</strong>
            {{ user.role || '—' }}
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <div>
            <strong class="mr-1">{{ $t('topBar.profileMenu.email') }}:</strong>
            {{ user.email || '—' }}
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-divider />
        <a-menu-item>
          <a href="javascript: void(0);" @click="logout">
            <i class="fe fe-log-out mr-2" />
            {{ $t('topBar.profileMenu.logout') }}
          </a>
        </a-menu-item>
      </a-menu>
    </template>
  </a-dropdown>
</template>

<script>
import { useStore } from 'vuex'
import { computed } from 'vue'

export default {
  components: {
  },
  setup() {
    const store = useStore()
    const user = computed(() => store.getters['user/user'])

    const logout = () => {
      store.dispatch('user/LOGOUT')
    }

    return {
      user,
      logout,
    }
  },
}
</script>

<style lang="scss" module>
@import './style.module.scss';
</style>
