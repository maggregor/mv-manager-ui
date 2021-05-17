<template>
  <a-dropdown :trigger="['click']" placement="bottomLeft">
    <div :class="$style.dropdown">
       <div class="vb__utils__avatar vb__utils__avatar--size46 flex-shrink-0">
        <img :src="user.avatar" class="mb-5" alt="Achilio user" />
      </div>
    </div>
    <template #overlay>
      <a-menu>
        <a-menu-item>
          <div>
            <strong>{{ user.name }}</strong>
          </div>
        </a-menu-item>
        <a-menu-divider />
        <a-menu-item>
          <div>
            <strong class="mr-1">{{ $t('topBar.profileMenu.email') }}:</strong>
            {{ user.email || '—' }}
          </div>
        </a-menu-item>
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
import * as api from '@/services/axios/backendApi'

export default {
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
